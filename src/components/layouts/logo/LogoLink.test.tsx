import { render, screen } from '@testing-library/react';
import { MockProviders } from '@/utils/mockProviders';
import { Logo } from '.';

describe('<Logo />', () => {
  it('should render text logo', () => {
    render(
      <MockProviders>
        <Logo />
      </MockProviders>,
    );

    expect(screen.getByRole('heading', { name: 'Youtube Reload' })).toBeDefined();
  });
});
