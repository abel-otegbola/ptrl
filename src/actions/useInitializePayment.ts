'use server';

import https from 'https';

export async function initializeTransaction(email: string, amount: string) {
  try {
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      });

      req.on('error', reject);
      req.write(JSON.stringify({ email, amount }));
      req.end();
    });

    return response;
  } catch (error) {
    console.error('Paystack error:', error);
    throw new Error('Failed to initialize transaction');
  }
}