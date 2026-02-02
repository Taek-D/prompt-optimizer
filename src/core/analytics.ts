import { sendGAEvent } from '@next/third-parties/google';

type EventName = 'model_selected' | 'optimize_clicked' | 'copy_after_clicked' | 'download_clicked';

interface EventParams {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (eventName: EventName, params: EventParams = {}) => {
    // Ensure no PII is sent
    const safeParams = { ...params };

    // Explicitly strip raw prompts if accidentally passed (though we guide against it)
    if ('rawPrompt' in safeParams) delete safeParams.rawPrompt;
    if ('optimizedPrompt' in safeParams) delete safeParams.optimizedPrompt;

    sendGAEvent('event', eventName, safeParams);
};
