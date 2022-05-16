import { Html, Head, Main, NextScript } from 'next/document';
import { Background } from '@components/body';
import { colors } from '@colors';

export default function Document() {
  return (
    <>
      <Html lang="en" data-theme="light">
        <Head />
        <body style={{ background: colors.box.mainBg }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  );
}
