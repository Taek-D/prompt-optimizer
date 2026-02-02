import { OptimizeInput, OptimizeResult, Ruleset } from './types';
import { renderOpenAI } from './renderers/openai';
import { renderClaude } from './renderers/claude';
import { renderGemini } from './renderers/gemini';
import { estimateTokens, getContextLimit } from './tokenEstimate';
import { detectSensitiveData } from './sensitive';



const processTemplate = (template: string, input: OptimizeInput): string => {
    let result = template;

    // 1. Standard Replacements
    result = result.replace(/{{RAW_PROMPT}}/g, input.rawPrompt);
    result = result.replace(/{{LENGTH}}/g, input.length);
    result = result.replace(/{{TONE}}/g, input.tone);
    result = result.replace(/{{FORMAT}}/g, input.format);

    // 2. Conditional Replacements
    const safetyExitText = input.safetyExit
        ? "If you do not have enough information to answer this request, explicitly state 'I do not have enough information'."
        : "";
    result = result.replace(/{{SAFETY_EXIT}}/g, safetyExitText);

    // NO_FLUFF - typically always on in our ruleset or mode dependant, but for now strict substitution
    // We can make it standard.
    const noFluffText = "Do not use conversational filler (e.g., 'Sure', 'Here is'). Go straight to the output.";
    result = result.replace(/{{NO_FLUFF}}/g, noFluffText);

    // 3. Field Parsing {{FIELD:key|default}}
    // Regex to find all {{FIELD:...}} tags
    const fieldRegex = /{{FIELD:([^}|]+)(?:\|([^}]+))?}}/g;
    result = result.replace(fieldRegex, (match, key, defaultValue) => {
        const k = key.trim();
        const d = defaultValue ? defaultValue.trim() : '';
        return (input.userFields && input.userFields[k]) || d || '';
    });

    return result;
};

export const optimize = (input: OptimizeInput, ruleset: Ruleset): OptimizeResult => {
    const warnings: { type: string; message: string }[] = [];

    // 1. Validation
    if (!input.rawPrompt || input.rawPrompt.trim() === '') {
        return {
            optimizedPrompt: '',
            appliedTags: [],
            warnings: [{ type: 'error', message: 'Input prompt is empty' }]
        };
    }

    // 2. Sensitive Data Check
    const sensitiveMatches = detectSensitiveData(input.rawPrompt);
    if (sensitiveMatches.length > 0) {
        warnings.push({
            type: 'sensitive',
            message: `Detected ${sensitiveMatches.length} sensitive items (${sensitiveMatches.map(m => m.type).join(', ')})`
        });
    }

    // 3. Template Selection & Filling
    let template = ruleset.outputTemplates[input.outputType];
    if (!template) {
        template = "{{RAW_PROMPT}}"; // Fallback
        warnings.push({ type: 'warn', message: 'Template not found for output type, using raw.' });
    }

    // Process Template
    const processedContent = processTemplate(template, input);

    // 4. Model Rendering
    let optimizedPrompt = '';
    switch (input.model) {
        case 'openai':
            optimizedPrompt = renderOpenAI(input, processedContent);
            break;
        case 'claude':
            optimizedPrompt = renderClaude(input, processedContent);
            break;
        case 'gemini':
            optimizedPrompt = renderGemini(input, processedContent, ruleset);
            break;
        default:
            optimizedPrompt = processedContent;
    }

    // 5. Token Estimation
    const tokenCount = estimateTokens(optimizedPrompt);
    const limit = getContextLimit(input.model);
    if (tokenCount > limit * 0.8) {
        warnings.push({
            type: 'length',
            message: `Estimated tokens (${tokenCount}) exceed 80% of model limit (${limit})`
        });
    }

    // 6. Tags
    const appliedTags: string[] = [
        input.model,
        input.outputType,
        input.tone,
        input.mode
    ];
    if (input.safetyExit) appliedTags.push('safety-exit');

    return {
        optimizedPrompt,
        appliedTags,
        warnings
    };
};
