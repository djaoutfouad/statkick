import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { TOOLS_LIST } from '../data/toolsList';
import { BlogCategory } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { SEOHead } from '../components/common/SEOHead';
import { Search, Calendar, Clock, BookOpen, ArrowRight, Sparkles, Tag, ChevronRight } from 'lucide-react';
import { AdSlot } from '../components/common/AdSlot';

const CATEGORIES: ('All' | BlogCategory)[] = [
  'All',
  'Performance Analysis',
  'Football Statistics',
  'Tactics & Strategy',
  'Player Analysis',
  'Team Analysis',
  'Fantasy Football',
  'Football Data',
  'Transfer Analysis',
];

export const Blog: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const seoData = {
    title: 'Football Analytics & Tactical Insights Blog | StatKick',
    description: 'In-depth articles exploring Expected Goals (xG), PPDA pressing intensity, player rating formulas, transfer valuations, and tactical systems.',
    canonicalPath: '/blog',
  };

  return (
    <div className="space-y-10">
      <SEOHead {...seoData} />
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.blog.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {t.blog.title}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          {t.blog.subtitle}
        </p>
      </div>

      {/* Featured Article Banner */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <div className="bg-gradient-to-br from-green-900 to-green-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold border border-green-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.blog.featuredArticle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
              <Link to={`/blog/${featuredPost.slug}`} className="hover:text-green-300 transition-colors">
                {featuredPost.title}
              </Link>
            </h2>
            <p className="text-sm sm:text-base text-green-100/90 leading-relaxed line-clamp-3">
              {featuredPost.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-green-200/80 pt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {featuredPost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {featuredPost.readTime}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-medium">
                {featuredPost.category}
              </span>
            </div>
            <div className="pt-3">
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 active:bg-green-600 text-gray-950 font-bold text-xs transition-all shadow-md"
              >
                <span>{t.common.readArticle}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.blog.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat === 'All' ? t.common.all : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* In-Content Ad Slot */}
      <AdSlot position="slot2-mid-content" slotNumber={2} variant="rectangle" />

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <BookOpen className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-700">{t.common.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-green-50 text-green-700 font-semibold text-[11px] border border-green-100">
                    {post.category}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-green-600 group-hover:text-green-700 transition-colors"
                >
                  <span>{t.common.learnMore}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Bottom Ad Slot */}
      <AdSlot position="slot4-footer" slotNumber={4} variant="leaderboard" />
    </div>
  );
};
