import { describe, it, expect } from 'vitest';
import { optimize } from './optimizer';
import ruleset from '../data/ruleset.v1.json';
import { OptimizeInput, Ruleset } from './types';

// Cast ruleset to Ruleset type
const currentRuleset = ruleset as unknown as Ruleset;

const baseInput: OptimizeInput = {
    rawPrompt: "This is a test prompt context.",
    model: 'openai',
    outputType: 'summary',
    mode: 'lite',
    tone: 'neutral',
    length: 'medium',
    format: 'plain',
    safetyExit: true,
    selfCheck: true,
};

describe('Optimizer Core Logic', () => {

    describe('Model & Output Type Combinations', () => {
        const models = ['openai', 'claude', 'gemini'] as const;
        const types = ['summary', 'marketing_copy', 'email_reply'] as const;

        models.forEach(model => {
            types.forEach(type => {
                it(`should generate correct output for ${model} - ${type}`, () => {
                    const input = { ...baseInput, model, outputType: type };
                    const result = optimize(input, currentRuleset);
                    expect(result.optimizedPrompt).toMatchSnapshot();
                    expect(result.appliedTags).toContain(model);
                    expect(result.appliedTags).toContain(type);
                });
            });
        });
    });

    describe('Feature Tests', () => {
        it('should detect sensitive data', () => {
            const input = { ...baseInput, rawPrompt: "Contact me at test@example.com or 010-1234-5678" };
            const result = optimize(input, currentRuleset);
            expect(result.warnings).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ type: 'sensitive' })
                ])
            );
        });

        it('should warn on high token count', () => {
            const longText = "A".repeat(10000); // Should exceed 4096 * 0.8
            const input = { ...baseInput, rawPrompt: longText };
            const result = optimize(input, currentRuleset);
            expect(result.warnings).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ type: 'length' })
                ])
            );
        });

        it('should parse template fields', () => {
            const input: OptimizeInput = {
                ...baseInput,
                outputType: 'marketing_copy',
                userFields: { target_audience: 'Developers' }
            };
            const result = optimize(input, currentRuleset);
            expect(result.optimizedPrompt).toContain('Developers');
        });

        it('should use default value for missing fields', () => {
            const mockRuleset: Ruleset = {
                ...currentRuleset,
                outputTemplates: {
                    ...currentRuleset.outputTemplates,
                    'marketing_copy': 'Target Audience: {{FIELD:target_audience|General}}' // Mock template
                }
            };

            const input: OptimizeInput = {
                ...baseInput,
                outputType: 'marketing_copy',
                userFields: {} // Empty fields
            };
            const result = optimize(input, mockRuleset);
            expect(result.optimizedPrompt).toContain('General');
        });
    });
});
