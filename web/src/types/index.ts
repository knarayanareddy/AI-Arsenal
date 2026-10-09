export type VerticalId = 
  | 'projects' 
  | 'tools' 
  | 'papers' 
  | 'architectures' 
  | 'tips' 
  | 'guides' 
  | 'benchmarks' 
  | 'people';

export interface Approach {
  name: string;
  description: string;
  when_to_use?: string[];
  when_not_to_use?: string[];
  tradeoffs?: {
    complexity?: string;
    flexibility?: string;
    reliability?: string;
    latency?: string;
    cost?: string;
  };
}

export interface EntryItem {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  summary?: string;
  category?: string;
  subcategory?: string;
  phase?: string;
  domain?: string[];
  tags?: string[];
  artifact_type?: string;
  github_url?: string;
  github_stars?: number;
  docs_url?: string;
  demo_url?: string;
  source_url?: string;
  paper_url?: string;
  license?: string;
  primary_language?: string;
  maturity?: string;
  cost_model?: string;
  last_commit?: string;
  health_signals?: string[];
  relation_to_stack?: string[];
  ecosystem_role?: string[];
  alternatives?: string[];
  integrates_with?: string[];
  stack?: string[];
  job?: string[];
  pricing_detail?: string;
  best_for?: string[];
  avoid_if?: string[];
  // Architecture specific
  decision_type?: string;
  decision_summary?: string;
  approaches?: Approach[];
  // Paper specific
  authors?: string[];
  venue?: string;
  year?: number;
  practical_applicability?: 'high' | 'medium' | 'low' | 'theoretical';
  // Tip specific
  problem?: string;
  solution?: string;
  // Person specific
  affiliation?: string;
  role?: string;
  topics?: string[];
  // Benchmark specific
  metrics?: string[];
}

export interface SearchDoc {
  id: string;
  title: string;
  description: string;
  vertical: VerticalId;
  tags?: string[];
  category?: string;
  phase?: string;
  stars?: number;
}
