import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { TOOLS_LIST } from '../data/toolsList';
import { useLanguage } from '../hooks/useLanguage';
import { SEOHead } from '../components/common/SEOHead';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Wrench,
  ChevronRight,
} from 'lucide-react';
import { AdSlot } from '../components/common/AdSlot';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, getToolTranslation } = useLanguage();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Related tools
  const relatedTools = TOOLS_LIST.filter((tool) =>
    post.relatedToolSlugs.includes(tool.slug)
  );

  // Related articles
  const relatedArticles = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (post.relatedPostSlugs.includes(p.slug) || p.category === post.category)
  ).slice(0, 2);

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'StatKick',
      url: 'https://statkick.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://statkick.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title={`${post.title} | StatKick`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        structuredData={articleStructuredData}
      />
      {/* Breadcrumb / Back link */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.common.backToBlog}</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-gray-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold border border-green-200">
            {post.category}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published: {post.date}</span>
          </span>
          {post.lastReviewed && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium text-[11px]">
                Reviewed: {post.lastReviewed}
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 pt-2 text-xs text-gray-500">
          <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            SK
          </div>
          <div>
            <p className="font-semibold text-gray-900">{post.author}</p>
            <p className="text-gray-500 text-[11px]">StatKick Football Analytics Editorial</p>
          </div>
        </div>
      </header>

      {/* Key Takeaways Box */}
      <div className="bg-green-50/80 border border-green-200 rounded-2xl p-5 sm:p-6 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 text-green-800 font-bold text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{t.common.keyTakeaways}</span>
        </div>
        <ul className="space-y-2">
          {post.content.keyTakeawaysList.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-green-950/90 leading-relaxed">
              <span className="text-green-600 font-bold shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* In-Content Ad */}
      <AdSlot position="slot2-mid-content" slotNumber={2} variant="rectangle" />

      {/* Article Content */}
      <article className="space-y-8 text-gray-800 leading-relaxed text-sm sm:text-base">
        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-base font-normal">
          {post.content.intro}
        </p>

        {/* Sections */}
        {post.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight pt-2">
              {section.heading}
            </h2>
            {section.subheading && (
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {section.subheading}
              </h3>
            )}
            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {section.example && (
              <div className="bg-gray-50 border-l-4 border-green-600 p-4 rounded-r-xl space-y-1">
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  {section.example.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {section.example.details}
                </p>
              </div>
            )}

            {section.keyTakeaway && (
              <div className="bg-green-50/50 border border-green-100 p-3.5 rounded-xl text-xs sm:text-sm text-green-900 font-medium">
                <strong>Analytical Insight:</strong> {section.keyTakeaway}
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <div className="border-t border-gray-200 pt-6 space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Summary & Tactical Verdict</h2>
          <p className="text-gray-700 leading-relaxed">{post.content.conclusion}</p>
        </div>

        {/* References & Academic Sources */}
        {post.references && post.references.length > 0 && (
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Methodology Sources & Citations
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {post.references.map((ref, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-800">{ref.title}</span>
                    <span className="text-gray-500"> — {ref.source}</span>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-green-600 underline hover:text-green-700"
                      >
                        [Source]
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Editorial Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <p className="font-bold text-slate-800">Editorial & Analytical Transparency</p>
          <p className="leading-relaxed">
            StatKick articles are authored by football analytics researchers for educational and tactical analysis. Metrics mentioned (such as xG, xA, and PPDA) are quantitative models and should not be used as financial or betting advice.
          </p>
        </div>
      </article>

      {/* Directly Related Tools */}
      {relatedTools.length > 0 && (
        <div className="border-t border-gray-200 pt-8 space-y-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-green-600" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {t.common.relatedTools}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => {
              const tr = getToolTranslation(tool.slug);
              return (
                <Link
                  key={tool.slug}
                  to={`/tools/${tool.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-400 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors mt-0.5">
                      {tr.name || tool.name}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {tr.tagline || tool.tagline}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-green-600">
                    <span>{t.common.calculate}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-gray-200 pt-8 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-600" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {t.common.relatedArticles}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/blog/${rel.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all group"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {rel.category}
                </span>
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 mt-0.5">
                  {rel.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer Ad */}
      <AdSlot position="slot4-footer" slotNumber={4} variant="leaderboard" />
    </div>
  );
};
