'use server';

import https from 'https';

export async function verifyPayment(reference: string) {
  try {
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
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
      req.end();
    });

    return response;
  } catch (error) {
    console.error('Verification error:', error);
    throw new Error('Failed to verify payment');
  }
}