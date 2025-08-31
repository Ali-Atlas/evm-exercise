import { getAddress, isAddress } from 'viem';

/**
 * Safely formats addresses with checksum validation
 */
export function safeAddress(address: string): string | null {
  try {
    if (!isAddress(address)) return null;
    return getAddress(address); // Returns checksummed address
  } catch {
    return null;
  }
}

/**
 * Truncates address for display (maintains checksum)
 */
export function truncateAddress(address: string): string {
  const safe = safeAddress(address);
  if (!safe) return 'Invalid Address';
  return `${safe.slice(0, 6)}...${safe.slice(-4)}`;
}

/**
 * Formats token amounts using bigint for precision
 */
export function formatTokenAmount(
  amount: bigint,
  decimals: number,
  displayDecimals: number = 6
): string {
  const divisor = 10n ** BigInt(decimals);
  const quotient = amount / divisor;
  const remainder = amount % divisor;
  
  if (remainder === 0n) {
    return quotient.toString();
  }
  
  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmed = remainderStr.slice(0, displayDecimals).replace(/0+$/, '');
  
  return trimmed ? `${quotient}.${trimmed}` : quotient.toString();
}

/**
 * Parses user input to bigint safely
 */
export function parseTokenAmount(
  input: string,
  decimals: number
): bigint | null {
  try {
    // Remove any non-numeric chars except decimal
    const cleaned = input.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    
    if (parts.length > 2) return null; // Multiple decimals
    
    const whole = parts[0] || '0';
    const fractional = (parts[1] || '').padEnd(decimals, '0').slice(0, decimals);
    
    return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(fractional);
  } catch {
    return null;
  }
}
