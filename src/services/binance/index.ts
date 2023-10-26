import Binance from 'binance-api-node';
import moment from 'moment';

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;

const binanceClient = Binance({
    apiKey,
    apiSecret,
    getTime: () => moment().unix() * 1000,
});
// test account
// const binanceClient = Binance({
//     apiKey: '',
//     apiSecret:
//         '',
//     getTime: () => moment().unix() * 1000,
//     httpFutures: 'https://testnet.binancefuture.com',
//     wsFutures: 'wss://stream.binancefuture.com',
// });

export { binanceClient };
