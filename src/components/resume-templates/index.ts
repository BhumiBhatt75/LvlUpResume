export const TEMPLATES = {
  MODERN: 'modern',
  PROFESSIONAL: 'professional',
  MINIMAL: 'minimal',
} as const;

export type TemplateType = typeof TEMPLATES[keyof typeof TEMPLATES]; 