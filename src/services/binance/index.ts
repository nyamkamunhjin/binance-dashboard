import Binance from 'binance-api-node';
import moment from 'moment';

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;

console.log({ apiKey, apiSecret });

// const binanceClient = Binance({
//   apiKey,
//   apiSecret,
//   getTime: () => moment().unix() * 1000,
// });

const binanceClient = Binance({
    apiKey: '8de8820c56ecffb45f724310bbcd521ea17371cd37c09baa96ce1005ed90b387',
    apiSecret:
        'eda7f99ab59565689a54519b33ffc4e61339ab305014929463929d6dbb185d99',
    getTime: () => moment().unix() * 1000,
    httpFutures: 'https://testnet.binancefuture.com',
    wsFutures: 'wss://stream.binancefuture.com',
});

export { binanceClient };
