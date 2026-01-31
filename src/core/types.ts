export type ModelType = 'openai' | 'claude' | 'gemini';
export type OutputType = 'summary' | 'marketing_copy' | 'email_reply';
export type OptimizeMode = 'lite' | 'pro';
export type ToneType = 'formal' | 'neutral' | 'friendly' | 'persuasive';
export type LengthType = 'very_short' | 'short' | 'medium';
export type OutputFormat = 'plain' | 'markdown' | 'json';

export interface OptimizeInput {
  rawPrompt: string;
  model: ModelType;
  outputType: OutputType;
  mode: OptimizeMode;
  tone: ToneType;
  length: LengthType;
  format: OutputFormat;
  safetyExit: boolean;
  selfCheck: boolean;
  userFields?: Record<string, string>;
}

export interface AddedBlock {
  start: number; // char index
  end: number;
}

export interface OptimizeDiff {
  before: string;
  after: string;
  addedBlocks: AddedBlock[];
}

export interface OptimizeWarning {
  type: string;
  message: string;
}

export interface OptimizeResult {
  optimizedPrompt: string;
  appliedTags: string[];
  warnings: OptimizeWarning[];
  diff?: OptimizeDiff;
}

export interface Ruleset {
  version: string;
  commonRules: string[];
  outputTemplates: Record<OutputType, string>;
  modelRenderers: Record<ModelType, ModelRendererConfig>;
  modes: Record<OptimizeMode, any>;
}

export interface ModelRendererConfig {
  structure: string[];
  separator?: string;
  useXml?: boolean;
  safetyPrefix?: string;
}
