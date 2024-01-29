import { Header } from './header';
import { Footer } from '../footer';
import '@/styles/globals.css';
import Fonts from '@/config/fonts';
import { CountryNamespace } from '@/types/country';
import { API_ROUTES } from '@/routes';
import { ModalCountry } from '../layout/modalcountry';
import { Providers } from '@/app/client-packages/react-redux/provider';
import Script from 'next/script';
import { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: 'وبسایت کوچا',
    description: 'کوچا جامعه ایرانیان مقیم همه‌جا',
    alternates: {
        canonical: process.env.FRONT_URL,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let countries: CountryNamespace.GET[];
    try {
        countries = await (await API_ROUTES.COUNTRIES.GET_ALL(1, 20)).json();
    } catch (e) {
        console.log(e);
        throw new Error('error in get country');
    }

    return (
        <html lang='fa' dir='rtl' className='scroll-smooth'>
            <body className='min-h-screen'>
                <Providers>
                    <div className='container mx-auto'>
                        <Fonts />
                        <Header>
                            <ModalCountry countries={countries} />
                        </Header>
                        <Toaster />
                        <main className='min-h-[70vh]'>{children}</main>
                    </div>
                    <Footer />
                </Providers>
                <Script src='https://www.googletagmanager.com/gtag/js?id=G-EED4RG3GPD' />
                <Script id='google-analytics'>
                    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-EED4RG3GPD');
        `}
                </Script>
            </body>
        </html>
    );
}
