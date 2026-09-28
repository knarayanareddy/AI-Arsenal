---
id: wu-2026-proactive-memory-agent
title: "Remember When It Matters: Proactive Memory Agent for Long-Horizon Agents"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2026
authors:
  - Yifan Wu
  - Lizhu Zhang
  - Yuhang Zhou
  - Mingyi Wang
  - Bo Peng
  - Serena Li
  - Xiangjun Fan
  - Zhuokai Zhao
arxiv_id: "2607.08716"
arxiv_url: "https://arxiv.org/abs/2607.08716"
pdf_url: "https://arxiv.org/pdf/2607.08716"
code_url: null
venue_url: null
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
tldr: "A separate memory agent decides when to inject a reminder into an unchanged action agent, lifting terminal-task pass rates."
key_contribution: "The silence option is the design, since the ablations show that not injecting beats both always-on injection and passive bank exposure."
tags:
  - memory
  - rlhf
  - agents
  - tool-use
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
enrichment_status: draft
---

## Overview

The paper names the failure mode it targets as behavioural state decay: in long-horizon tasks, decision-relevant state is scattered across an expanding trajectory, and requirements, environment facts, prior attempts, diagnoses and open subgoals end up buried in the context window or pushed beyond it, so they stop influencing decisions. Its proposal is to treat memory as an active intervention rather than a passive store. A separate memory agent runs alongside an unmodified action agent, updating a structured memory bank from the recent trajectory and, critically, deciding whether to inject a memory-grounded reminder or to stay silent. The module is described as plug-and-play with frontier action agents and existing agent harnesses. Reported gains are pass@1 improvements for both weaker and stronger action agents, of +8.3 percentage points on Terminal-Bench 2.0 and +6.8 points on tau-squared-Bench. Ablations report that selective intervention beats passive bank exposure, always-on injection, advisor-only guidance and generic retrieval, which is the evidence for the silence option mattering. As a step toward open-weight memory policies, the authors train Qwen3.5-27B on SETA with SFT and GRPO, improving validation reward with only partial transfer to Terminal-Bench. The authors are Yifan Wu, Lizhu Zhang, Yuhang Zhou, Mingyi Wang, Bo Peng, Serena Li, Xiangjun Fan and Zhuokai Zhao.

## Why it's in the Arsenal

Memory work has largely assumed that if you give a model access to its own history it will use what matters, and the ablations here say that is false: simply exposing a memory bank is worse than an active policy, and always injecting is worse still. Constant injection has a specific failure mode, since a reminder that is not relevant right now displaces what the model was about to do, and over a long trajectory the model spends its attention on reminders it did not need. Treating the decision as an intervention, with silence as a first-class option, is what produces the reported gains and what makes the ablations interpretable. The recurring decision it resolves is whether to store more or to intervene less, and it answers that the second is the lever worth engineering on.

## Core Contribution

- The silence option is the design, since the ablations show that not injecting beats both always-on injection and passive bank exposure.
- The action agent is left unmodified, so the module drops into existing harnesses without a fork or a retrain.
- Gains reported for both weaker and stronger action agents, which argues the improvement is architectural rather than a frontier-model artefact.
- Trajectory-level evaluation on two distinct long-horizon benchmarks rather than a single proxy task.

## Key Results

1. Long-horizon tool use: raise pass@1 on terminal and retail-style agent tasks where requirements and prior diagnoses get buried in the trajectory.
2. Memory-policy design: choose between a passive store, always-on injection and selective intervention using the reported ablation ordering.
3. Vendor-agnostic memory: add memory to a frontier action agent you cannot or should not fine-tune, by running a second agent beside it.

## Methodology

The system has two agents and one shared artefact. The action agent is deliberately unmodified, which is what makes the module plug-and-play against frontier agents and existing harnesses rather than requiring a fork or a fine-tune. The memory agent reads the recent slice of the trajectory and updates a structured memory bank, meaning organised state rather than an append-only transcript, so requirements, environment facts, diagnoses and open subgoals have defined slots. The decision step is the contribution: the memory agent emits either a memory-grounded reminder that gets injected into the action agent's next turn, or nothing at all. Because the bank is structured and the injection is selective, the intervention is a function of what the action is currently doing rather than a periodic digest. Evaluation is trajectory-level pass@1 on Terminal-Bench 2.0 and tau-squared-Bench, with ablations substituting passive bank exposure, always-on injection, advisor-only guidance and generic retrieval for the selective policy. The open-weight extension trains Qwen3.5-27B on SETA with SFT and GRPO to stand in as the memory policy, which improves validation reward but transfers only partially.

## Practical Applicability

The module is described as plug-and-play with existing harnesses, so the practical path is to wrap an agent loop you already run and add a second call that decides whether to speak.

```bash
curl -L -o proactive-memory.pdf https://arxiv.org/pdf/2607.08716
```

```python
def step(observation, action_agent, memory_agent, bank):
    bank = memory_agent.update(bank, recent=observation.trajectory_tail)
    if memory_agent.should_speak(bank, observation):
        observation = observation.with_reminder(bank.grounded_in(bank))
    return action_agent.act(observation)   # action agent itself is unchanged
```

The first thing to test is the ablation, not the headline number: run passive bank exposure and always-on injection alongside the selective policy on your own tasks. If selective injection does not beat both on your trajectory distribution, the paper's central claim does not transfer to your workload.

## Limitations & Critiques

This is a preprint verified through arXiv metadata only, with content taken from the abstract: the memory bank schema, the should-speak decision rule, the SETA dataset and the ablations were not read, and no pass rate was reproduced. Running a second agent on every turn roughly doubles inference cost and adds a latency step to a loop that is often latency-bound, and the paper as described does not quantify that overhead against the pass-rate gain. The open-weight extension is explicitly partial: Qwen3.5-27B trained on SETA improved validation reward but transferred only partially to Terminal-Bench, so the trained-policy path is a direction rather than a result. Two benchmarks and one memory design is a narrow evidence base for a claim about long-horizon agents generally, and terminal-style tasks with discrete success criteria may not represent the open-ended work where behavioural state decay is hardest. Whether the memory agent's own trajectory reading grows with session length is not addressed in the abstract, which is precisely where a memory solution could reintroduce the problem it is solving.

## Reproductions & Follow-up Work

The catalog records no third-party reproduction of Remember When It Matters: Proactive Memory Agent for Long-Horizon Agents (arXiv:2607.08716). The reported numbers are author-reported: they have not been rerun on an independent implementation, so treat the effect sizes as a claim awaiting confirmation rather than an established result. A replication would need the same task set, the same scoring script, and a model family comparable to the one the authors evaluated.


## Relation to the Arsenal

This is an agents-and-reasoning research entry and the counterpart to the bounded-memory architecture in this same batch: one intervenes selectively, the other evicts deterministically, and together they mark a clear shift away from passive retrieval. Its placement in content/research/agents-and-reasoning is deliberate, since the object of study is an agent's decision policy rather than a store. It depends on the harnesses in content/projects/agent-systems and the frameworks in content/projects/frameworks, and it is a natural target for the benchmark tooling in content/projects/benchmarks-and-evals because its own evaluation is pass@1 on public agent benchmarks. The memory-design conversation it belongs to continues in content/research/retrieval-and-memory, while the trained-policy angle connects to the training entries in content/projects/training-and-alignment through the SFT and GRPO recipe.

## Resources

- [arXiv abstract page](https://arxiv.org/abs/2607.08716)
- [PDF](https://arxiv.org/pdf/2607.08716)
