
import { supabase } from '@/integrations/supabase/client';

export interface Watchlist {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface WatchlistStock {
  id: string;
  watchlist_id: string;
  stock_symbol: string;
  added_at: string;
}

export const getWatchlists = async (): Promise<Watchlist[]> => {
  const { data, error } = await supabase
    .from('watchlists')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Watchlist[];
};

export const createWatchlist = async (name: string): Promise<Watchlist | null> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  
  if (!userId) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('watchlists')
    .insert({ name, user_id: userId })
    .select()
    .single();
  
  if (error) throw error;
  return data as Watchlist;
};

export const deleteWatchlist = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('watchlists')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const addStockToWatchlist = async (watchlistId: string, stockSymbol: string): Promise<WatchlistStock> => {
  const { data, error } = await supabase
    .from('watchlist_stocks')
    .insert({ watchlist_id: watchlistId, stock_symbol: stockSymbol })
    .select()
    .single();
  
  if (error) throw error;
  return data as WatchlistStock;
};

export const removeStockFromWatchlist = async (watchlistId: string, stockSymbol: string): Promise<void> => {
  const { error } = await supabase
    .from('watchlist_stocks')
    .delete()
    .match({ watchlist_id: watchlistId, stock_symbol: stockSymbol });
  
  if (error) throw error;
};

export const getWatchlistStocks = async (watchlistId: string): Promise<WatchlistStock[]> => {
  const { data, error } = await supabase
    .from('watchlist_stocks')
    .select('*')
    .eq('watchlist_id', watchlistId)
    .order('added_at', { ascending: false });
  
  if (error) throw error;
  return data as WatchlistStock[];
};
