import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Home, ArrowRight, Search } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/ui/Button';
import { TOOLS_LIST } from '../data/toolsList';

export const NotFoundPage: React.FC = () => {
  const seoData = {
    title: '404 Page Not Found | StatKick',
    description: 'The requested football statistics page could not be located. Explore our 21 analytics calculators from the StatKick homepage.',
    noindex: true,
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 text-center">
      <SEOHead {...seoData} />
      <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 shadow-sm">
        <Trophy className="w-8 h-8" />
      </div>

      <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-700 bg-green-100 rounded-full mb-3">
        Error 404
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
        Offside! Page Not Found
      </h1>

      <p className="text-sm text-gray-600 max-w-md mb-8 leading-relaxed">
        The tool or tactical route you requested could not be located. It may have been relocated or you might have mistyped the URL.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <Link to="/">
          <Button variant="primary" icon={<Home className="w-4 h-4" />}>
            Return to Homepage
          </Button>
        </Link>
        <Link to="/#performance">
          <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
            Browse All 21 Tools
          </Button>
        </Link>
      </div>

      {/* Popular Calculators Direct Navigation */}
      <div className="max-w-lg w-full text-left rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5" />
          Popular Calculators
        </h2>
        <div className="space-y-2">
          {TOOLS_LIST.slice(0, 4).map((tool) => (
            <Link
              key={tool.slug}
              to={`/tools/${tool.slug}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-800 transition-colors"
            >
              <span>{tool.name}</span>
              <span className="text-[10px] text-green-600 font-semibold">
                {tool.category} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
