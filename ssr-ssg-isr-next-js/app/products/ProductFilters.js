// app/products/ProductFilters.js - Client Component
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: searchParams.get('priceRange') || 'all',
    sortBy: searchParams.get('sortBy') || 'newest',
  });
  
  // Update URL when filters change (client-side navigation)
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.priceRange !== 'all') params.set('priceRange', filters.priceRange);
    if (filters.sortBy !== 'newest') params.set('sortBy', filters.sortBy);
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [filters, router]);
  
  // Client-side event handlers
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    
    // Analytics (browser-only)
    if (window.gtag) {
      window.gtag('event', 'filter_change', {
        filter_name: name,
        filter_value: value,
      });
    }
  };
  
  // Reset filters
  const handleReset = () => {
    setFilters({ category: '', priceRange: 'all', sortBy: 'newest' });
    router.push('/products'); // Client-side navigation
  };
  
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        {/* Category filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        
        {/* Price range - interactive slider */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Range: ${filters.priceRange === 'all' ? 'All' : filters.priceRange}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={filters.priceRange === 'all' ? 500 : parseInt(filters.priceRange)}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>$0</span>
            <span>$500</span>
            <span>$1000+</span>
          </div>
        </div>
        
        {/* Sort options */}
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <div className="flex gap-4">
            {['newest', 'price-low', 'price-high', 'popular'].map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange('sortBy', option)}
                className={`px-4 py-2 rounded ${
                  filters.sortBy === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {option.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reset button */}
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}