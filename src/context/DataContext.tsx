import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AnalyticsData } from '../types';

interface DataState {
  analytics: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataState>({
  analytics: null, loading: true, error: null,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>({
    analytics: null, loading: true, error: null,
  });

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/analytics.json`)
      .then(r => r.json())
      .then((analytics) => {
        setState({ analytics, loading: false, error: null });
      })
      .catch(err => {
        setState({ analytics: null, loading: false, error: err.message });
      });
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
