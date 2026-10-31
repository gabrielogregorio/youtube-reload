import React from 'react';

const DELAY_IN_MS_TO_RUN_AXE = 1000;

export const runAxe = (reactDom: unknown) => {
  if (process.env.NODE_ENV === 'production') {
    return undefined;
  }

  return import('@axe-core/react')
    .then(async (axe) => {
      await axe.default(React, reactDom, DELAY_IN_MS_TO_RUN_AXE);

      // eslint-disable-next-line no-console
      console.log('AXE DONE!');
    })
    .catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error('Error on run axe', error);
    });
};
