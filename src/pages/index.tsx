'use client';

import configs from '../../config';
import { Position } from '../components/position';

export default function Page() {
    return (
        <main>
            <div className="p-4 w-full flex gap-4 flex-wrap">
                {configs.map((connection) => (
                    <Position key={connection.name} connection={connection} />
                ))}
            </div>
        </main>
    );
}
