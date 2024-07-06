import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});

// core styles are required for all packages
import '@mantine/core/styles.css';

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
import '@mantine/charts/styles.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider>
            <SWRConfig value={{ provider: () => new Map() }}>
                <Component {...pageProps} />;
            </SWRConfig>
        </MantineProvider>
    );
}
