// Tests must not depend on the network or on which thumbnails a playlist drew.
import { readFileSync } from 'node:fs';
import type { Page } from 'puppeteer-core';

const THUMBNAIL_HOST = 'img.youtube.com';

// Same dimensions as the real thumbnails: an image takes memory by width and height, not by file size.
const thumbnailsByName = new Map([
  ['mqdefault.jpg', readFileSync('cypress/fixtures/thumbnail-320x180.jpg')],
  ['hqdefault.jpg', readFileSync('cypress/fixtures/thumbnail-480x360.jpg')],
]);

export const serveTheThumbnailsLocally = async (page: Page, siteOrigin: string, unexpectedHosts: Set<string>): Promise<void> => {
  await page.setRequestInterception(true);
  await page.setCacheEnabled(true);

  page.on('request', (request) => {
    const url = new URL(request.url());
    const thumbnail = url.host === THUMBNAIL_HOST ? thumbnailsByName.get(url.pathname.split('/').at(-1) ?? '') : undefined;

    if (thumbnail) {
      void request.respond({ status: 200, contentType: 'image/jpeg', headers: { 'Cache-Control': 'max-age=3600' }, body: thumbnail });

      return;
    }

    if (url.protocol === 'data:' || url.protocol === 'blob:' || url.origin === siteOrigin) {
      void request.continue();

      return;
    }

    unexpectedHosts.add(url.host);
    void request.abort();
  });
};
