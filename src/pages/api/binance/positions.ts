import type { NextApiRequest, NextApiResponse } from 'next';
import BinanceFunctions from '@/services/binance/functions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET': {
            const result = await BinanceFunctions.getPosition(
                process.env.TRADE_PAIR || ''
            );

            console.log({ result });

            return res.json(result);
        }
    }
};

export default handler;
