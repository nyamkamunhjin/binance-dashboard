import React, { FC, useMemo } from 'react';
import { Connection, IPosition } from '@/types';
import useSWR from 'swr';
import { Loader, NumberFormatter } from '@mantine/core';
import { History } from './history';
import { Sparkline } from '@mantine/charts';
import { Chart } from './chart';

interface IProps {
    connection: Connection;
}


export const Position: FC<IProps> = ({ connection }) => {
    const { isLoading, data } = useSWR<IPosition>(
        [connection.name, process.env.NEXT_PUBLIC_API_KEY],
        async ([name, apiKey]) => {
            const response = await fetch(
                `${connection.url}/api/v1/binance/balance?api_key=${apiKey}`
            );

            const result = await response.json();

            return result;
        }
    );

    const unrealizedProfit = useMemo(
        () => parseFloat(data?.crossUnPnl || '0'),
        [data]
    );

    return (
        <div className="w-full border rounded p-4 sm:max-w-sm h-96 overflow-auto flex flex-col gap-4 scroll-">
            <h2 className="text-3xl font-medium">{connection.name}</h2>
            {isLoading ? <Loader /> : null}
            {data ? (
                <div className="flex flex-col gap-4">
                    <div className={`text-4xl font-medium text-black`}>
                        <NumberFormatter
                            prefix="$"
                            value={data.balance}
                            thousandSeparator
                            decimalScale={2}
                        />
                    </div>
                    <div
                        className={`text-2xl font-medium  ${
                            unrealizedProfit > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        <NumberFormatter
                            prefix="$"
                            value={data.crossUnPnl}
                            thousandSeparator
                            decimalScale={2}
                        />
                    </div>
                </div>
            ) : null}

            <Chart connection={connection} />
            <History connection={connection} />
        </div>
    );
};
