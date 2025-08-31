// Fetch real prices from CoinGecko public API
export async function fetchTokenPrices() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd'
    );
    const data = await response.json();
    return {
      ETH: data.ethereum?.usd || 4447.5,
      USDC: data['usd-coin']?.usd || 1,
    };
  } catch {
    // Fallback prices if API fails
    return { ETH: 4447.5, USDC: 1 };
  }
}
