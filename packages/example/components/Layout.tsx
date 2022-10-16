import { PropsWithChildren } from 'react';
import Link from 'next/link';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <nav className="p-4">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/fast-page">Fast page</Link>
          </li>
          <li>
            <Link href="/regular-page">Regular page</Link>
          </li>
          <li>
            <Link href="/slow-page">Slow page</Link>
          </li>
        </ul>
      </nav>
      <main className="p-4">{children}</main>
    </>
  );
}
