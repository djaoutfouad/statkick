import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_LIST } from '../../data/toolsList';
import { ToolMeta } from '../../types';

interface RelatedToolsProps {
  currentToolSlug: string;
  suggestedSlugs?: string[];
  maxCount?: number;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  currentToolSlug,
  suggestedSlugs,
  maxCount = 3,
}) => {
  const currentTool = TOOLS_LIST.find((t) => t.slug === currentToolSlug);

  let related: ToolMeta[] = [];

  if (suggestedSlugs && suggestedSlugs.length > 0) {
    related = suggestedSlugs
      .map((slug) => TOOLS_LIST.find((t) => t.slug === slug))
      .filter((t): t is ToolMeta => Boolean(t));
  }

  // Fallback: Pick from same category or others
  if (related.length < maxCount && currentTool) {
    const sameCategory = TOOLS_LIST.filter(
      (t) => t.category === currentTool.category && t.slug !== currentToolSlug && !related.some((r) => r.slug === t.slug)
    );
    const others = TOOLS_LIST.filter(
      (t) => t.slug !== currentToolSlug && !related.some((r) => r.slug === t.slug) && !sameCategory.some((s) => s.slug === t.slug)
    );
    related = [...related, ...sameCategory, ...others].slice(0, maxCount);
  }

  return (
    <section className="my-10 rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-green-600" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
          Related Football Analytics Tools
        </h3>
      </div>
      <p className="text-xs text-gray-600 mb-5">
        Expand your tactical and statistical research with these complementary calculators:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            to={`/tools/${tool.slug}`}
            className="group flex flex-col justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-green-500 hover:shadow-md transition-all"
          >
            <div>
              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-green-700 bg-green-50 rounded-md mb-2">
                {tool.category}
              </span>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {tool.name}
              </h4>
              <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
                {tool.tagline}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-green-600">
              <span>Calculate</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
