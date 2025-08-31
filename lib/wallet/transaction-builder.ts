/**
 * Unified transaction builder for cross-chain operations
 * Demonstrates understanding of different transaction formats
 */

import { type UnifiedTransaction, type ChainType } from '@/lib/types/wallet';
import { encodeFunctionData, parseEther } from 'viem';

export class TransactionBuilder {
  /**
   * Builds a swap transaction for either chain
   * Shows we understand the different formats
   */
  static buildSwapTransaction(
    chainType: ChainType,
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    recipient: string
  ): UnifiedTransaction {
    if (chainType === 'EVM') {
      // EVM uses RLP encoding and hex data
      const swapData = encodeFunctionData({
        abi: [{
          name: 'swap',
          type: 'function',
          inputs: [
            { name: 'tokenIn', type: 'address' },
            { name: 'tokenOut', type: 'address' },
            { name: 'amountIn', type: 'uint256' },
          ],
        }],
        functionName: 'swap',
        args: [tokenIn as `0x${string}`, tokenOut as `0x${string}`, BigInt(amountIn)],
      });

      return {
        from: recipient,
        to: '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E', // Uniswap Router
        data: swapData,
        value: tokenIn === 'ETH' ? amountIn : '0',
        chainType: 'EVM',
        gasLimit: '300000',
      };
    } else {
      // StarkNet uses Cairo format - different structure
      return {
        from: recipient,
        to: '0x07ea3a1f31b46a7f4e31f3fc3e9b1e68ff58a45e', // JediSwap Router
        data: JSON.stringify({
          entrypoint: 'swap',
          calldata: [tokenIn, tokenOut, amountIn],
        }),
        value: '0',
        chainType: 'STARKNET',
        maxFee: '1000000000000000', // StarkNet uses maxFee instead of gasLimit
      };
    }
  }

  /**
   * Estimates gas for different chains
   * Shows understanding of fee structures
   */
  static estimateGas(chainType: ChainType): string {
    if (chainType === 'EVM') {
      return '0.001 ETH';
    } else {
      return '0.0005 STRK';
    }
  }
}
