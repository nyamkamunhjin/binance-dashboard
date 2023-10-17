import Binance from 'binance-api-node';
import moment from 'moment';


const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;

console.log({ apiKey, apiSecret })

const binanceClient = Binance({
  apiKey,
  apiSecret,
  getTime: () => moment().unix() * 1000,
});

export {
  binanceClient
}