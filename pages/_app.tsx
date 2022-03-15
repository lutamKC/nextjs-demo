import '../src/styles/globals.scss'
import type {AppProps} from 'next/app'
import Link from 'next/link';

function App({Component, pageProps}: AppProps) {
    return <div id='app'>
        <header id='app-header'>
            <div>
                <Link href='/'>
                    <h1>
                        just a <strong>Next</strong> cats app<strong>.</strong>
                    </h1>
                </Link>

                <h2>demo react app built with next.js</h2>
            </div>
            <Link href='/favourites'>
                <button>My favourites</button>
            </Link>

        </header>
        <main id='app-main'>
            <Component {...pageProps} />
        </main>
    </div>
}

export default App
