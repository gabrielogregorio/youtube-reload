import React from 'react';
import { vi } from 'vitest';
import { runAxe } from './runAxe';

const axeMock = vi.hoisted(() => vi.fn());

vi.mock('@axe-core/react', () => ({ default: axeMock }));

describe('runAxe', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    axeMock.mockReset();
  });

  it('should do nothing in production', () => {
    vi.stubEnv('NODE_ENV', 'production');

    expect(runAxe({})).toBeUndefined();
    expect(axeMock).not.toHaveBeenCalled();
  });

  it('should start axe outside production', async () => {
    const reactDom = {};
    axeMock.mockResolvedValue(undefined);

    await runAxe(reactDom);

    expect(axeMock).toHaveBeenCalledWith(React, reactDom, 1000);
  });

  it('should report when axe fails', async () => {
    const failure = new Error('failure');
    axeMock.mockRejectedValue(failure);

    await runAxe({});

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith('Error on run axe', failure);
  });
});
