import React, { FC, useMemo } from 'react';
import { Connection, IPosition } from '@/types';
import useSWR from 'swr';
import { Loader, NumberFormatter } from '@mantine/core';

interface IProps {
    connection: Connection;
}

export const Position: FC<IProps> = ({ connection }) => {
    const { isLoading, data } = useSWR<IPosition>(connection.name, () =>
        fetch(
            `${connection.url}/api/v1/binance/balance?api_key=${
                process.env.API_KEY || ''
            }`
        ).then((res) => res.json())
    );

    const unrealizedProfit = useMemo(
        () => parseFloat(data?.crossUnPnl || '0'),
        [data]
    );

    return (
        <div className="w-full border rounded p-4 sm:max-w-sm flex flex-col gap-4">
            <h2 className="text-3xl font-medium">{connection.name}</h2>
            {isLoading ? <Loader /> : null}
            {data ? (
                <div className="flex flex-col gap-4">
                    <div
                        className={`text-4xl font-medium  ${
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
        </div>
    );
};
