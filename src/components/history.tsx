import React, { FC } from 'react';
import useSWR from 'swr';
import { Connection, IHistory, IIncome } from '../types';
import moment from 'moment';

interface IProps {
    connection: Connection;
}

/**
 * @author
 * @function @History
 **/

export const History: FC<IProps> = ({ connection }) => {
    const { isLoading, data } = useSWR<IIncome[]>(
        [connection.name, process.env.NEXT_PUBLIC_API_KEY, 'history'],
        async ([name, apiKey]) => {
            const response = await fetch(
                `${connection.url}/api/v1/binance/income?api_key=${apiKey}&symbol=${connection.symbol}`
            );

            const result = await response.json();

            console.log({ result });

            return result;
        }
    );
    return (
        <div className="flex flex-col">
            {data
                ?.sort((a, b) => b.time - a.time)
                ?.flatMap((each) => (
                    <div className="flex border-y gap-2 text-sm items-center py-1">
                        <span>
                            {moment(each.time).format('YYYY/MM/DD hh:mm')}
                        </span>
                        <span className="border rounded-lg p-0.5">
                            {each.symbol}
                        </span>
                        <span
                            className={`ml-auto ${
                                parseFloat(each.income) > 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            ${parseFloat(each.income).toFixed(2)}
                        </span>
                    </div>
                ))}
        </div>
    );
};
