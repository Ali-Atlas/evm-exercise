'use client';

import { useState, useEffect } from 'react';

interface PriceData {
  ETH: number;
  USDC: number;
}

export function usePrices() {
  const [prices, setPrices] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd'
        );
        
        if (!response.ok) throw new Error('Failed to fetch prices');
        
        const data = await response.json();
        
        if (!cancelled) {
          setPrices({
            ETH: data.ethereum?.usd || 4447.5,
            USDC: data['usd-coin']?.usd || 1,
          });
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch prices');
          // Fallback prices on error
          setPrices({ ETH: 4447.5, USDC: 1 });
          setLoading(false);
        }
      }
    };
    
    fetchPrices();
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);
  
  return { prices, loading, error };
}
