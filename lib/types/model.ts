export interface Model {
  id: string;
  name: string;
  version: string;
  type: string;
  description?: string;
  endpoint_url?: string;
  owner?: string;
  config?: {
    temperature?: number;
    max_tokens?: number;
    [key: string]: any;
  };
  metrics?: {
    accuracy?: number;
    latency_ms?: number;
    [key: string]: any;
  };
  tags?: string[];
  status: 'active' | 'deprecated' | 'inactive';
  created_at?: string;
  updated_at?: string;
  file_url?: string;
}

export interface ModelsResponse {
  data: Model[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    [key: string]: any;
  };
}
