import type { NextApiRequest, NextApiResponse } from 'next';
import BinanceFunctions from '@/services/binance/functions';
import { z } from 'zod';

const schema = z.object({
    symbol: z.string(),
    side: z.enum(['buy', 'sell']),
    entry_price: z.string(),
    risk: z.number(),
    details: z.object({
        action: z.enum([
            'buy',
            'sell',
            'exit_short',
            'exit_long',
            'profit_25',
            'profit_50',
            'profit_75',
        ]),
        type: z.enum(['LIMIT', 'MARKET']),
        takeprofit_price: z.string(),
        stoploss_price: z.string(),
    }),
    partial_profits: z.array(
        z.object({
            where: z.number(),
            qty: z.number(),
        })
    ),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'POST': {
                const {
                    symbol,
                    side,
                    risk,
                    entry_price,
                    details,
                    partial_profits,
                } = schema.parse(req.body);

                await BinanceFunctions.entry({
                    symbol,
                    entryPrice: parseFloat(entry_price),
                    partialProfits: partial_profits,
                    risk,
                    side: side.toUpperCase() as any,
                    stoplossPrice: parseFloat(details.stoploss_price),
                    takeProfitPrice: parseFloat(details.takeprofit_price),
                });

                return res.json(req.body);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export default handler;
