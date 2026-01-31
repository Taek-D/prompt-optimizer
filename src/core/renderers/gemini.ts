import { OptimizeInput, Ruleset } from '../types';

export const renderGemini = (
    input: OptimizeInput,
    processedContent: string,
    ruleset: Ruleset
): string => {
    // Gemini: Safety Prefix preference.
    const { modelRenderers } = ruleset;
    const config = modelRenderers.gemini;

    const components = [];

    if (config.safetyPrefix) {
        components.push(config.safetyPrefix);
    }

    components.push(processedContent);

    return components.join('\n\n').trim();
};
