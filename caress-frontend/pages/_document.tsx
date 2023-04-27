import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
	  <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
		  <meta name="google-site-verification" content="vHJk5kG3C7tLg19yx8cKG_z-7fzZBx_sR08KDX7iX6U" />
		</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
