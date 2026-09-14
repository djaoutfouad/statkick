import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../../types';

interface ToolFAQProps {
  faqs: FAQItem[];
  title?: string;
}

export const ToolFAQ: React.FC<ToolFAQProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="my-8" aria-labelledby="faq-heading">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-green-600" />
        <h3 id="faq-heading" className="text-lg font-bold text-gray-900">
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-gray-900 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-green-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
