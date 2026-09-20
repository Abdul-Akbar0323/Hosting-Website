import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '@/data/products';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="section-padding py-12 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-nova-900">Frequently Asked Questions</h1>
          <p className="text-nova-500 mt-2">Find answers to common questions</p>
        </div>

        <div className="space-y-8">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-lg font-semibold text-nova-900 mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((q, idx) => {
                  const key = `${category.category}-${idx}`;
                  const isOpen = openQuestion === key;
                  return (
                    <div key={key} className="border border-nova-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setOpenQuestion(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-nova-50 transition-colors"
                      >
                        <span className="font-medium text-nova-900 pr-4">{q.q}</span>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-nova-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-nova-500 flex-shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-nova-600 leading-relaxed">
                          {q.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
