
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchStocks, StockData } from '@/lib/stockData';

interface SearchBarProps {
  onSelect?: (stock: StockData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Close the dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.length >= 2) {
        setLoading(true);
        searchStocks(query)
          .then(data => {
            setResults(data);
            setIsOpen(true);
            setLoading(false);
          })
          .catch(err => {
            console.error('Error searching stocks:', err);
            setLoading(false);
          });
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);
    
    return () => clearTimeout(searchTimeout);
  }, [query]);
  
  const handleSelect = (stock: StockData) => {
    if (onSelect) {
      onSelect(stock);
    }
    setQuery('');
    setIsOpen(false);
  };
  
  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search stocks..."
          className="w-full pl-9 pr-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        {loading && (
          <div className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white p-2 shadow-md">
          {results.map(stock => (
            <div
              key={stock.id}
              className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => handleSelect(stock)}
            >
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-sm">₹{stock.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-white p-4 shadow-md text-center">
          No stocks found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
