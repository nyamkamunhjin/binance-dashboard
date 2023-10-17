import type { NextApiRequest, NextApiResponse } from 'next';
import BinanceFunctions from '@/services/binance/functions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET': {
            const balance = await BinanceFunctions.getCurrentBalance();

            return res.json(balance);
        }
    }
};

export default handler;
