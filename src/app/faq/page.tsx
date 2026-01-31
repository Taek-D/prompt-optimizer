import React from 'react';

export default function FAQ() {
    return (
        <main className="min-h-screen bg-white text-gray-900 font-sans p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">FAQ</h1>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Is my data safe?</h3>
                        <p className="text-gray-600">Yes. This tool runs entirely in your browser (Client-side). Your prompts are never sent to any server.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">How does it optimize?</h3>
                        <p className="text-gray-600">It uses pre-defined templates and rules based on best practices for each model (OpenAI, Claude, Gemini) to structure your prompt effectively.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">Can I customize rules?</h3>
                        <p className="text-gray-600">In this MVP version, rules are fixed. Future versions may allow custom rule sets.</p>
                    </div>
                </div>

                <div className="mt-8">
                    <a href="/" className="text-blue-600 hover:underline">Back to Optimizer</a>
                </div>
            </div>
        </main>
    );
}
