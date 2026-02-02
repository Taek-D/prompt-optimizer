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
    const content = config.separator
        ? processedContent.split(/\n\s*\n/).join(config.separator)
        : processedContent;

    if (config.safetyPrefix) {
        components.push(config.safetyPrefix);
    }

    components.push(content);

    return components.join('\n\n').trim();
};
