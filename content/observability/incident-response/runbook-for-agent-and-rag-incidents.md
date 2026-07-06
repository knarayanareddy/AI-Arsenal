---
id: "runbook-for-agent-and-rag-incidents"
title: "Triage, Kill-Switch, and Postmortem Runbook for Agent Loops, RAG Regressions, and Cost Blowouts"
entry_type: observability
category: incident-response
scope: production
signal_types:
  - reliability
  - safety
  - cost
  - quality
verification_status: community-reported
data_sensitivity:
  - internal
last_reviewed: "2026-07-06"

instrumentation_contract:
  sampling: "100% of incidents (every declared incident gets a full record); the underlying trace/metric data an incident investigation draws on is captured per the sampling rules of instrumentation/, tracing/, and monitoring-alerting/ entries, not re-specified here"
  retention: "Incident records and postmortems retained indefinitely (like the eval golden dataset, these are a small, high-value corpus used for pattern-matching against future incidents, not a raw-volume data stream needing expiry)"
  correlation:
    - incident_id
    - trace_id
    - triggering_alert_id
    - feature_name
  redaction: "Postmortem documents must not include raw prompt/response content or other pii-risk data inline -- link to the (separately access-controlled) trace ID instead of pasting content into a document that may be shared more broadly than the trace store itself"
  events:
    - name: "incident_declared"
      when_emitted: "The moment an on-call engineer declares an incident, whether triggered by an automated alert or a manual report"
      required_fields:
        - incident_id
        - triggering_alert_id
        - feature_name
        - severity
      optional_fields:
        - trace_id
        - kill_switch_activated
      pii_risk: internal

related_tools: []
related_projects: []
related_build_examples:
  - starter-simple-react-agent
related_tips:
  - keep-a-kill-switch-for-agent-actions
  - require-human-approval-for-irreversible-actions
  - add-a-max-step-budget-to-every-agent
dashboards: []
alert_rules:
  - "This entry is the response layer triggered BY alerts from monitoring-alerting/, not a new detection alert itself -- the incident_declared event above should fire automatically whenever a page-severity alert from that category is acknowledged, to ensure every paged incident gets a tracked record"
common_failure_modes:
  - "Having a kill-switch mechanism that exists in code but has never been exercised in a drill, so the first time it's actually needed during a real incident is also the first time anyone discovers it doesn't work as expected"
  - "Writing a postmortem that identifies the proximate cause (a specific prompt change, a retrieval regression) but not the process gap that let it ship without being caught earlier (e.g. no eval gate covered that code path) -- fixing only the symptom leaves the same class of incident able to recur"
added_date: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: draft
enrichment_notes: "verification_status is honestly community-reported: the runbook structure and kill-switch/severity conventions below follow widely documented incident-response/SRE practice adapted to AI-specific failure modes, but this adaptation has not been independently confirmed against one named production AI incident by an Arsenal maintainer."
---

## Overview

Detection (monitoring-alerting/) tells you something is wrong; this entry is what happens next. AI systems have failure modes that don't map cleanly onto traditional software incident response — a runaway agent tool-calling loop, a silent retrieval-quality regression, or a cost blowout from a routing bug all need a specific triage path, a way to stop the bleeding immediately (a kill-switch), and a postmortem structure that captures not just what broke but what let it ship undetected.

## What to Capture

- An `incident_id` the moment an incident is declared, correlated to the `triggering_alert_id` from monitoring-alerting/ so every paged alert has a traceable outcome
- `severity`, assigned using a fixed rubric (e.g. user-facing outage vs. degraded quality vs. cost anomaly with no user impact), not an ad hoc judgment call made differently each time
- Whether a kill-switch was activated, and which one — this data is what lets you audit whether kill-switches are actually being used when available, or whether engineers are reaching for a slower manual fix under pressure because the kill-switch isn't trusted or discoverable
- A link to the relevant `trace_id`(s), not pasted trace content, keeping the incident record itself free of `pii`-risk data

## Instrumentation Contract

Example `incident_declared` event:

```json
{
  "event_name": "incident_declared",
  "timestamp": "2026-07-06T18:15:00.000Z",
  "incident_id": "inc_2026_0142",
  "triggering_alert_id": "alert_7f2a",
  "feature_name": "support-triage-agent",
  "severity": "sev2_degraded_quality",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "kill_switch_activated": "agent_tool_execution_disabled"
}
```

## Implementation

A minimal kill-switch implementation — a feature flag checked at the point of highest leverage (before tool execution, before an expensive retrieval call, before an agent loop's next iteration), not buried deep in application logic where it's easy to miss during an incident:

```python
import os

class KillSwitch:
    """Checked at the highest-leverage point before a risky action.
    Backed by a fast-to-flip external flag store (e.g. a feature-flag
    service or even a simple key-value store), NOT a code deploy --
    a kill-switch that requires a deploy to activate is too slow."""

    def __init__(self, flag_store):
        self.flag_store = flag_store

    def is_active(self, switch_name: str) -> bool:
        return self.flag_store.get(f"kill_switch:{switch_name}", default=False)


kill_switch = KillSwitch(flag_store=get_flag_store())


def execute_tool(tool_name: str, args: dict):
    if kill_switch.is_active("agent_tool_execution_disabled"):
        raise RuntimeError("Tool execution is disabled by kill switch -- see incident channel")
    return _execute_tool_impl(tool_name, args)


def run_agent_step(state):
    if kill_switch.is_active(f"agent_disabled:{state.agent_name}"):
        return fallback_response("This assistant is temporarily unavailable.")
    return _run_agent_step_impl(state)
```

## Dashboards & Alerts

This entry is the response layer, not an additional detection layer — see [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md) for the detection alerts that trigger an incident here.

- Dashboard: incident timeline (declared → kill-switch activated if applicable → mitigated → resolved) with time-to-mitigate as the headline metric
- Dashboard: kill-switch activation history, to audit whether available kill-switches are actually being exercised during incidents or bypassed in favor of slower manual fixes

## Common Failure Modes

- **A kill-switch that exists in code but has never been exercised in a drill.** The first real use during an actual incident is also the first time anyone discovers whether it works as expected — schedule periodic drills specifically to avoid this.
- **A postmortem that identifies the proximate cause but not the process gap that let it ship.** Fixing only the specific prompt/config that caused an incident, without also asking "what check would have caught this before it reached production," leaves the same class of incident able to recur under a different specific trigger.

## Privacy & Governance

Postmortem documents must not include raw prompt/response content or other `pii`-risk data inline — link to the relevant `trace_id` (itself governed by [Redact and Govern Trace Data](../privacy-governance/redact-and-govern-trace-data.md)'s access controls) rather than pasting content into a postmortem document, which is typically shared more broadly across an organization than the trace store itself and would otherwise become an uncontrolled second copy of sensitive data. Incident records and postmortems are retained indefinitely, since they are a small, high-value corpus for pattern-matching against future incidents, not a raw-volume stream requiring expiry — this is a deliberate exception to the shorter retention windows used for raw trace data.

## Validation Checklist

- [ ] Every page-severity alert from monitoring-alerting/ results in a tracked `incident_declared` event, not an informal, undocumented response
- [ ] Severity is assigned using a fixed, documented rubric, not an ad hoc judgment call
- [ ] At least one kill-switch exists for the highest-risk action in each agent/RAG system (tool execution, autonomous write actions) and has been exercised in a drill within the last quarter
- [ ] Kill-switches are backed by a fast-to-flip flag store, not a code deploy
- [ ] Postmortems link to trace IDs rather than pasting trace content inline
- [ ] Every postmortem identifies both the proximate cause and the process gap that let it ship undetected
- [ ] A postmortem's identified process gap results in a tracked follow-up action (e.g. a new eval-gate case, a new alert rule), not just a written observation with no owner

## Relation to the Arsenal

This is the response layer for incidents surfaced by [Alert on Quality and Cost Regressions](../monitoring-alerting/alert-on-quality-and-cost-regressions.md), and draws on trace data governed by [Redact and Govern Trace Data](../privacy-governance/redact-and-govern-trace-data.md). Kill-switch and step-budget concepts here are direct operational implementations of [Keep a Kill Switch for Agent Actions](../../tips-and-tricks/agents-and-orchestration/keep-a-kill-switch-for-agent-actions.md), [Require Human Approval for Irreversible Actions](../../tips-and-tricks/agents-and-orchestration/require-human-approval-for-irreversible-actions.md), and [Add a Max Step Budget to Every Agent](../../tips-and-tricks/agents-and-orchestration/add-a-max-step-budget-to-every-agent.md) — this entry operationalizes those single interventions into a full incident-response playbook. [Simple ReAct Agent](../../build-examples/agent-systems/starter-simple-react-agent.md) demonstrates the step-budget mechanism this runbook's kill-switch pattern complements.

## Resources

- [Keep a Kill Switch for Agent Actions](../../tips-and-tricks/agents-and-orchestration/keep-a-kill-switch-for-agent-actions.md)
- [Require Human Approval for Irreversible Actions](../../tips-and-tricks/agents-and-orchestration/require-human-approval-for-irreversible-actions.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
