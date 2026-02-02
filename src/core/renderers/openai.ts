import { OptimizeInput, Ruleset } from '../types';

export const renderOpenAI = (
    input: OptimizeInput,
    processedContent: string,
    ruleset: Ruleset
): string => {
    // OpenAI: Instruction first.
    // Our processedContent already contains the full template (Instruction + Context + Constraints).
    // The goal of the renderer is to apply any Model-Specific wrapping.

    // For OpenAI, we often just want standard text separation.
    // processedContent is assumed to be fully formed by the template engine.

    // We might just append the Output Format if not present, but our template handles it.

    // If we want to strictly follow "Instruction First", our ruleset template already puts instruction first.
    // So we just return it, maybe ensuring markdown format tag if missing.

    const config = ruleset.modelRenderers.openai;
    if (!config.separator) {
        return processedContent;
    }

    return processedContent.split(/\n\s*\n/).join(config.separator);
};
