import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const ensureSlash = (path: string) => {
    if (!path || path === '/') return '/';
    if (path.includes('#')) return '/';
    return path.endsWith('/') ? path : `${path}/`;
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs">
      <ol className="flex items-center flex-wrap gap-1.5 text-gray-600">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-green-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-gray-600" />
              {isLast || !item.path ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={ensureSlash(item.path)}
                  className="hover:text-green-700 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
