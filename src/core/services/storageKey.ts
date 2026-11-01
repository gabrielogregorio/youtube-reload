const SITE_PREFIX = 'youtube-reload.';
const PREVIEW_PATH = /^\/youtube-reload\/preview\/([^/]+)\//;
const STORYBOOK_PREVIEW_PATH = /^\/youtube-reload\/storybook\/([^/]+)\//;
const STORYBOOK_PATH = /^\/youtube-reload\/storybook\//;

// No prefix may start like another one, otherwise resetting one environment would sweep the other.
export const storagePrefixFor = (pathname: string): string => {
  const previewBranch = PREVIEW_PATH.exec(pathname)?.[1];

  if (previewBranch !== undefined) {
    return `youtube-reload-preview.${previewBranch}.`;
  }

  const storybookBranch = STORYBOOK_PREVIEW_PATH.exec(pathname)?.[1];

  if (storybookBranch !== undefined) {
    return `youtube-reload-storybook-preview.${storybookBranch}.`;
  }

  return STORYBOOK_PATH.test(pathname) ? 'youtube-reload-storybook.' : SITE_PREFIX;
};

/** Every project of the account shares the github.io origin, so nothing here may use a bare key. */
export const storagePrefix = (): string => storagePrefixFor(location.pathname);

export const storageKey = (name: string): string => storagePrefix() + name;

export const isPublishedSite = (): boolean => storagePrefix() === SITE_PREFIX;
