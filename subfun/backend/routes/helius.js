import express from 'express';

/**
 * Helius Integration for substance.fun
 * 
 * This module provides Helius-powered wallet balance checking for agents.
 * Helius offers ultra-fast Web3 RPC endpoints and account management.
 */

const HE LIUS_API_BASE_URL = 'https://api.helius.com';
const HE LIUS_RPC_URL = 'https://rpc.helius.com';

/**
 * Middleware to validate Helius API key presence
 */
const requireHeliusKey = (req, res, next) => {
  const apiKey = process.env.HELIUS_API_KEY;
  if (!apiKey || apiKey === 'your_helius_api_key_here') {
    return res.status(400).json({
      error: 'Helius API key not configured. Set HE LIUS_API_KEY in .env file.'
    });
  }
  next();
};

/**
 * Check Helius wallet balance for an agent
 */
export const checkWalletBalance = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const apiKey = process.env.HELIUS_API_KEY;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Call Helius to get wallet balance
    const response = await fetch(`${HE LIUS_API_BASE_URL}/api/v1/account/${walletAddress}/balance`, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    if (!response.ok) {
      return res.status(500).json({ 
        error: 'Failed to fetch wallet balance from Helius',
        details: response.statusText
      });
    }

    const data = await response.json();

    return res.json({
      success: true,
      data: {
        walletAddress,
        balance: data.balance || '0',
        balanceSOL: data.balanceSOL || '0',
        currency: 'SOL',
        lastUpdated: data.lastUpdated || null,
        api: 'helius'
      }
    });
  } catch (error) {
    console.error('Helius balance check error:', error);
    return res.status(500).json({
      error: 'Failed to check wallet balance',
      message: error.message
    });
  }
};

/**
 * Get Helius wallet history for an agent
 */
export const getWalletHistory = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const apiKey = process.env.HELIUS_API_KEY;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Call Helius to get wallet history
    const response = await fetch(`${HE LIUS_API_BASE_URL}/api/v1/account/${walletAddress}/history`, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    if (!response.ok) {
      return res.status(500).json({ 
        error: 'Failed to fetch wallet history from Helius',
        details: response.statusText
      });
    }

    const data = await response.json();

    return res.json({
      success: true,
      data: {
        walletAddress,
        transactions: data.transactions || [],
        api: 'helius'
      }
    });
  } catch (error) {
    console.error('Helius wallet history error:', error);
    return res.status(500).json({
      error: 'Failed to fetch wallet history',
      message: error.message
    });
  }
};

/**
 * Get Helius wallet info (with account link if configured)
 */
export const getWalletInfo = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const apiKey = process.env.HELIUS_API_KEY;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Call Helius to get wallet info
    const response = await fetch(`${HE LIUS_API_BASE_URL}/api/v1/account/${walletAddress}`, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    if (!response.ok) {
      return res.status(500).json({ 
        error: 'Failed to fetch wallet info from Helius',
        details: response.statusText
      });
    }
    
    const data = await response.json();

    return res.json({
      success: true,
      data: {
        walletAddress,
        accountLinked: data.accountLinked || false,
        solBalance: data.solBalance || '0',
        usdcBalance: data.usdcBalance || '0',
        api: 'helius'
      }
    });
  } catch (error) {
    console.error('Helius wallet info error:', error);
    return res.status(500).json({
      error: 'Failed to fetch wallet info',
      message: error.message
    });
  }
};

/**
 * Webhook handler for Helius wallet events
 * Helius sends POST requests to configured webhook URLs when wallet events occur
 */
export const handleHeliusWebhook = async (req, res) => {
  try {
    const apiKey = process.env.HELIUS_API_KEY;
    
    // Verify Helius API key
    if (!apiKey || apiKey === 'your_helius_api_key_here') {
      return res.status(400).json({ 
        error: 'Helius API key not configured',
        info: 'To enable: Set HE LIUS_API_KEY in .env file'
      });
    }

    const { walletAddress, event, transactionSignature } = req.body;

    // Validate required fields
    if (!walletAddress || !event) {
      return res.status(400).json({ 
        error: 'Missing required fields: walletAddress and event'
      });
    }

    // Verify transaction signature from wallet
    const sigResponse = await fetch(`${HE LIUS_RPC_URL}/verifyTransactionSignature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
      body: JSON.stringify({
        walletAddress,
        signature: transactionSignature
      })
    });

    if (!sigResponse.ok) {
      console.error('Failed to verify transaction signature:', sigResponse.statusText);
    }

    // Here you would forward the event to your configured webhook
    // For demo, we just log it
    console.log('Helius webhook received:', {
      walletAddress,
      event,
      transactionSignature
    });

    res.json({
      success: true,
      message: 'Webhook received and logged',
      data: {
        walletAddress,
        event,
        api: 'helius'
      }
    });
  } catch (error) {
    console.error('Helius webhook error:', error);
    return res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message
    });
  }
};

export default { 
  requireHeliusKey,
  checkWalletBalance,
  getWalletHistory,
  getWalletInfo,
  handleHeliusWebhook
};
