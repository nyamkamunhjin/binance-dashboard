import React, { FC } from 'react';
import { Connection, Snapshot } from '@/types';
import useSWR from 'swr';
import moment from 'moment';
import { Sparkline } from '@mantine/charts';
import { Loader } from '@mantine/core';

interface IProps {
    connection: Connection;
}

export const Chart: FC<IProps> = ({ connection }) => {
    const { isLoading, data = [] } = useSWR<number[]>(
        [connection.name, process.env.NEXT_PUBLIC_API_KEY, 'chart'],
        async ([, apiKey]) => {
            const response = await fetch(
                `${
                    connection.url
                }/api/v1/binance/snapshot?api_key=${apiKey}&startTime=${
                    moment().subtract(1, 'month').unix() * 1000
                }&endTime=${moment().unix() * 1000}`
            );

            const result: Snapshot = await response.json();

            const accountSnapshotValues =
                result.snapshotVos?.map((each) => {
                    return parseFloat(
                        each.data.assets.find((item) => item.asset === 'USDT')
                            ?.walletBalance || '0'
                    );
                }) || [];

            return accountSnapshotValues
        }
    );

    if (isLoading) <Loader />;

    return (
        data && (
            <Sparkline
                // w={200}
                h={100}
                id={connection.name}
                data={data || []}
                curveType="linear"
                color="blue"
                fillOpacity={0.6}
                strokeWidth={2}
            />
        )
    );
};
