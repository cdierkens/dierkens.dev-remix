import type { V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css";

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Remix Template",
    viewport: "width=device-width,initial-scale=1",
  },
];

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  return (
    <html
      lang="en"
      className="bg-gradient-to-br from-primary-content to-bg-base-200 bg-no-repeat bg-fixed"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
