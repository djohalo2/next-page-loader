# Next Page Loader

A lightweight page loader for Next.js to give your users subtle feedback on navigating through your pages.

## Getting started
### 1. Installation

```
npm i next-page-loader
```

### 2. Page loader component
In your `_app.tsx` import and use the page loader component like so:

```tsx
import type { AppProps } from 'next/app';
import PageLoader from 'next-page-loader';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageLoader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

### 3. Done!
For the basis setup this is about it. A loading progress indicator will be shown on switching routes.

## Features
- Easy to use
- Lightweight (~2kb)
- Typescript support
- Customization (Tailwind.css compatible)

## Examples
### Customization
The page loader component container and progress bar styling can be fully customized through class or style object props.

#### Style overrides
```tsx
<PageLoader style={{ backgroundColor: 'orange', height: '5px' }} />
```

#### Tailwind.css
```tsx
<PageLoader className="h-[3px] bg-orange-500 shadow-lg shadow-orange-500/50 w-full" />
```
There is also a full [Next.js + Tailwind.css example](/packages/example)

## Local development
1. Run `nvm i` to use the correct node version
2. Run `npm i` to install dependencies
3. Configure and use prettier
4. Run `npm run dev` to run dev server and watch changes

## License
[MIT](https://choosealicense.com/licenses/mit)
