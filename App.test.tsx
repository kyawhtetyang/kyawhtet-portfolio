import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders Home section by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByText('Kyaw Htet | Full-Stack Python Engineer with Applied AI/ML Experience')).toBeInTheDocument();
  });

  it('uses the confirmed five primary portfolio tabs', () => {
    render(<App />);

    for (const label of ['Home', 'Projects', 'Blog', 'Library', 'Ask']) {
      expect(screen.getAllByRole('button', { name: label }).length).toBeGreaterThan(0);
    }

    expect(screen.queryByRole('button', { name: 'Settings' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Books' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Chat' })).not.toBeInTheDocument();
  });
});
