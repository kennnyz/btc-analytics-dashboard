import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AnalyticsData, BacktestsData } from '../types';

interface DataState {
  analytics: AnalyticsData | null;
  backtests: BacktestsData | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataState>({
  analytics: null, backtests: null, loading: true, error: null,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>({
    analytics: null, backtests: null, loading: true, error: null,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/analytics.json`).then(r => r.json()),
      fetch(`${import.meta.env.BASE_URL}data/backtests.json`).then(r => r.json()),
    ])
      .then(([analytics, backtests]) => {
        setState({ analytics, backtests, loading: false, error: null });
      })
      .catch(err => {
        setState({ analytics: null, backtests: null, loading: false, error: err.message });
      });
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
