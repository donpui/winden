import "@ionic/vue";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import App from "./components/App";
import CodeInputProvider from "./components/providers/CodeInputProvider";
import ErrorProvider from "./components/providers/ErrorProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import WormholeProvider from "./components/providers/WormholeProvider";

Sentry.init({
  dsn: process.env["SENTRY_DSN"],
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],
  tracesSampleRate: 1.0,
  release: process.env.RELEASE,
});

ReactDOM.render(
  <CodeInputProvider>
    <ThemeProvider>
      <ErrorProvider>
        <WormholeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WormholeProvider>
      </ErrorProvider>
    </ThemeProvider>
  </CodeInputProvider>,
  document.querySelector("#app")
);