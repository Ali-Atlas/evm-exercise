// DeFi position types

export interface DeFiPosition {
  id: string;
  protocol: 'UNISWAP_V3' | 'JEDISWAP' | 'SYNTHETIX';
  chainType: 'EVM' | 'STARKNET';
  chainId: string | number;
  owner: string;
  tokenA: Token;
  tokenB: Token;
  liquidity: string;
  feeRate?: number;
  tickLower?: number;
  tickUpper?: number;
  valueUSD?: number;
}

export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name?: string;
  logoURI?: string;
}
