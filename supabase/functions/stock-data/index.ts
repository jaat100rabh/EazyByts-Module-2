// @ts-nocheck

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const ALPHA_VANTAGE_API_KEY = Deno.env.get('ALPHA_VANTAGE_API_KEY');
// Use non-reserved env var names for Supabase CLI secrets
const SUPABASE_URL = Deno.env.get('SB_URL') || '';
const SUPABASE_ANON_KEY = Deno.env.get('SB_ANON_KEY') || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols } = await req.json();
    
    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide an array of stock symbols" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Limit to 5 stocks at a time to prevent API rate limiting issues
    const limitedSymbols = symbols.slice(0, 5);
    const results: any[] = [];

    // Fetch data for each stock symbol
    for (const symbol of limitedSymbols) {
      try {
        console.log(`Fetching data for ${symbol}`);
        
        // Use Alpha Vantage's Global Quote endpoint for current price data
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        
        const data = await response.json();
        
        if (data["Global Quote"] && Object.keys(data["Global Quote"]).length > 0) {
          const quote = data["Global Quote"];
          
          results.push({
            symbol: symbol,
            price: parseFloat(quote["05. price"]),
            change: parseFloat(quote["09. change"]),
            changePercent: parseFloat(quote["10. change percent"].replace('%', '')),
            volume: parseInt(quote["06. volume"]),
            latestTradingDay: quote["07. latest trading day"],
            previousClose: parseFloat(quote["08. previous close"])
          });
        } else {
          console.log(`No data returned for ${symbol}:`, data);
          // If Alpha Vantage doesn't have data, add a placeholder
          results.push({
            symbol: symbol,
            error: "No data available",
            message: data.Note || data.Information || "API limit reached or symbol not found"
          });
        }
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        results.push({
          symbol: symbol,
          error: "Failed to fetch data",
          message: error instanceof Error ? error.message : "Unknown error"
        });
      }
      
      // Add a small delay between requests to avoid hitting rate limits
      if (symbol !== limitedSymbols[limitedSymbols.length - 1]) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in stock-data function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
