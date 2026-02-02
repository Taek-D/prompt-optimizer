import { PromptOptimizer } from "@/components/PromptOptimizer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-gray-900 font-sans">
            <div className="max-w-4xl mx-auto p-6">
                <PromptOptimizer />
            </div>

            <footer className="max-w-4xl mx-auto p-6 mt-8 text-center text-gray-400 text-xs">
                <p>🔒 Privacy Notice: Your inputs are processed locally in your browser and are never sent to any server. We do not collect analytics.</p>
                <p className="mt-1">© 2026 Antigravity Project</p>
            </footer>
        </main>
    );
}
