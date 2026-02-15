import * as Sentry from '@sentry/react';
import { envs } from '../../env';

Sentry.init({
  dsn: envs.SENTRY_DSN,
  integrations: [
    // new Sentry.BrowserTracing({
    //   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    //   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    // }),
  ],
  tracesSampleRate: 0.2,
  enabled: !!envs.SENTRY_DSN,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: envs.VITE_ENVIRONMENT,
  release: `youtube-reload@${envs.VERSION}`,
});
