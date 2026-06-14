import { render, screen } from '@testing-library/react';
import App from './App';
import { Category } from './types';
import { DEFAULT_USER_SETTINGS, getVisibleCategories } from './userSettings';

describe('App', () => {
  it('renders Home section by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByText('Kyaw Htet | Full-Stack Python Engineer with Applied AI/ML Experience')).toBeInTheDocument();
  });

  it('shows tabs that match the current env-gated visibility config', () => {
    render(<App />);

    const visibleCategories = getVisibleCategories(DEFAULT_USER_SETTINGS);
    const expectedVisibleLabels = ['Home', 'Projects', ...visibleCategories.filter((category) => category !== Category.Home)];
    const expectedHiddenLabels = [Category.Blog, Category.Library, Category.Ask].filter(
      (category) => !visibleCategories.includes(category)
    );

    for (const label of expectedVisibleLabels) {
      expect(screen.getAllByRole('button', { name: label }).length).toBeGreaterThan(0);
    }

    for (const label of expectedHiddenLabels) {
      expect(screen.queryAllByRole('button', { name: label }).length).toBe(0);
    }

    if (visibleCategories.includes(Category.Settings)) {
      expect(screen.getAllByRole('button', { name: 'Settings' }).length).toBeGreaterThan(0);
    } else {
      expect(screen.queryAllByRole('button', { name: 'Settings' }).length).toBe(0);
    }

    expect(screen.queryByRole('button', { name: 'Books' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Chat' })).not.toBeInTheDocument();
  });
});
