'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallets } from '@/hooks/useWallets';
import { truncateAddress } from '@/lib/utils/format';
import { useState, useEffect } from 'react';
import { fetchTokenPrices } from '@/lib/defi/prices';

export default function Home() {
  const { evmWallet, starknetWallet, connectStarkNet, disconnectStarkNet, evmConnected } = useWallets();
  const [prices, setPrices] = useState({ ETH: 0, USDC: 0 });
  const [showSwap, setShowSwap] = useState(false);
  
  const hasAnyWallet = evmConnected || starknetWallet !== null;

  useEffect(() => {
    fetchTokenPrices().then(setPrices);
    const interval = setInterval(() => {
      fetchTokenPrices().then(setPrices);
    }, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  // Calculate position values based on real prices
  const uniswapValue = prices.ETH ? (0.85 * prices.ETH).toFixed(0) : '0';
  const jediswapValue = prices.ETH ? (0.4 * prices.ETH).toFixed(0) : '0';

  return (
    <main className="container">
      <h1>Cross-Chain DeFi Portfolio</h1>
      <p>Unified interface for EVM and StarkNet</p>
      
      <div className="wallet-section">
        <div className="wallet-card">
          <h3>EVM Wallet</h3>
          <ConnectButton />
          {evmWallet && (
            <div className="wallet-info">
              <small>Connected: {truncateAddress(evmWallet.address)}</small>
            </div>
          )}
        </div>
        
        <div className="wallet-card">
          <h3>StarkNet Wallet</h3>
          {!starknetWallet ? (
            <button className="btn" onClick={connectStarkNet}>
              Connect Braavos (Simulated)
            </button>
          ) : (
            <div>
              <div className="wallet-info">
                <small>Connected: {truncateAddress(starknetWallet.address)}</small>
              </div>
              <button className="btn-disconnect" onClick={disconnectStarkNet}>
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {hasAnyWallet && (
        <>
          <div className="positions-section">
            <h2>DeFi Positions</h2>
            <div className="price-ticker">
              ETH: ${prices.ETH.toLocaleString()} | USDC: ${prices.USDC}
            </div>
            
            {evmConnected && (
              <div className="position-card">
                <div className="position-header">
                  <span className="protocol">Uniswap V3</span>
                  <span className="value">${uniswapValue}</span>
                </div>
                <div className="position-details">
                  <p>WETH/USDC • 0.3% fee tier</p>
                  <p>Liquidity: 0.85 WETH</p>
                  <p>Chain: Ethereum Sepolia</p>
                </div>
              </div>
            )}
            
            {starknetWallet && (
              <div className="position-card">
                <div className="position-header">
                  <span className="protocol">JediSwap</span>
                  <span className="value">${jediswapValue}</span>
                </div>
                <div className="position-details">
                  <p>ETH/USDC • 0.3% fee tier</p>
                  <p>Liquidity: 0.4 ETH</p>
                  <p>Chain: StarkNet Sepolia</p>
                </div>
              </div>
            )}
          </div>

          <div className="swap-section">
            <h2>Cross-Chain Swap</h2>
            <div className="swap-card">
              {!showSwap ? (
                <>
                  <p>Execute swaps across connected chains</p>
                  <button className="btn" onClick={() => setShowSwap(true)}>
                    Open Swap Interface
                  </button>
                </>
              ) : (
                <div className="swap-interface">
                  <div className="swap-input">
                    <label>From</label>
                    <input type="number" placeholder="0.0" />
                    <select>
                      <option>ETH</option>
                      <option>USDC</option>
                    </select>
                  </div>
                  <div className="swap-arrow">↓</div>
                  <div className="swap-input">
                    <label>To</label>
                    <input type="number" placeholder="0.0" disabled />
                    <select>
                      <option>USDC</option>
                      <option>ETH</option>
                    </select>
                  </div>
                  <button className="btn btn-swap">Execute Swap</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
