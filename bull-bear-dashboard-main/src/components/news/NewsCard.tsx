
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NewsItem } from '@/lib/stockData';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base font-semibold line-clamp-2">
            {news.title}
          </CardTitle>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <span>{news.source}</span>
          <span className="mx-1">•</span>
          <span>{news.time}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {news.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {news.relatedSymbols.map(symbol => (
            <Badge key={symbol} variant="outline">{symbol}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
