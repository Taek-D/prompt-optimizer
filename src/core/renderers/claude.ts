import { OptimizeInput } from '../types';

export const renderClaude = (
    input: OptimizeInput,
    processedContent: string
): string => {
    // Claude: XML tags preference.
    // The 'processedContent' comes from the template, which might be generic text.
    // We can wrap it in a <task> block or similar if we want to be very "Claude-like".

    // But wait, the USER wants "ruleset.v1.json 기반".
    // If ruleset template produces: "Please summarize...\nContext:..."
    // Claude renderer might wrap Context in <context> IF we could separate it.
    // But we have a flat string.

    // Strategy: Wrap the whole thing in <user_input> or just return as is?
    // Let's wrap the whole thing in <task> to be safe and structural.


    const components = [];

    components.push("<task>");
    components.push(processedContent);
    components.push("</task>");

    // Explicit Output Format if JSON (XML is redundant if we assume text)
    if (input.format === 'json') {
        components.push("\n<output_format>\nJSON\n</output_format>");
    }

    return components.join("");
};
