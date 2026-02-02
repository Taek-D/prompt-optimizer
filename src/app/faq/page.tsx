import React from 'react';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '자주 묻는 질문 (FAQ)',
    description: 'PromptOptimizer 사용법, 보안, 비용 등에 대한 자주 묻는 질문입니다.',
    openGraph: {
        title: '자주 묻는 질문 (FAQ) | PromptOptimizer',
        description: 'PromptOptimizer 사용법, 보안, 비용 등에 대한 자주 묻는 질문입니다.',
        url: 'https://prompt-optimizer.vercel.app/faq',
    },
};

export default function FAQ() {
    return (
        <main className="min-h-screen bg-white text-gray-900 font-sans p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">FAQ</h1>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">🔒 제 데이터는 안전한가요?</h3>
                        <p className="text-gray-600">네, 100% 안전합니다. PromptOptimizer는 모든 연산을 사용자의 브라우저(PC/모바일) 내부에서만 처리합니다. 입력하신 프롬프트는 그 어디로도 전송되거나 저장되지 않습니다.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">🤔 어떻게 프롬프트를 최적화하나요?</h3>
                        <p className="text-gray-600">수만 건의 테스트를 통해 검증된 &apos;모델별 모범 답안&apos; 구조를 적용합니다. 예를 들어 Claude에게는 XML 태그를 사용하여 명확성을 높이고, GPT에게는 구체적인 지시사항을 우선 배치하는 식입니다.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">💰 비용은 무료인가요?</h3>
                        <p className="text-gray-600">네, 현재 모든 기능은 완전히 무료입니다. 회원가입도 필요 없습니다. 편하게 사용하시고 업무 효율을 높여보세요!</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">⚙️ 규칙을 수정할 수 있나요?</h3>
                        <p className="text-gray-600">현재 버전(MVP)에서는 전문가가 튜닝한 규칙셋을 자동으로 적용합니다. 추후 사용자 정의 룰셋 기능을 준비 중이니 기대해 주세요.</p>
                    </div>
                </div>

                <div className="mt-8">
                    <Link href="/" className="text-blue-600 hover:underline">Back to Optimizer</Link>
                </div>
            </div>
        </main>
    );
}
