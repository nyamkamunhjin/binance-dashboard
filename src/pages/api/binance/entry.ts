import type { NextApiRequest, NextApiResponse } from 'next'
import BinanceFunctions from '@/services/binance/functions'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {

      return res.json(req.body);

    }

  }

}


export default handler

