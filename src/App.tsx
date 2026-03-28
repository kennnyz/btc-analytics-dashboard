import { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { COLORS, FONT_MONO } from './components/shared/charts/theme';

import Overview from './components/sections/Overview';
import Sessions from './components/sections/Sessions';
import Calendar from './components/sections/Calendar';
import Hourly from './components/sections/Hourly';
import Fomc from './components/sections/Fomc';
import Liquidity from './components/sections/Liquidity';
import Returns from './components/sections/Returns';
import Volatility from './components/sections/Volatility';
import Candles from './components/sections/Candles';
import Trends from './components/sections/Trends';
import Volume from './components/sections/Volume';
import SessionDive from './components/sections/SessionDive';
import RoundNumbers from './components/sections/RoundNumbers';
import BigMoves from './components/sections/BigMoves';
import DowSession from './components/sections/DowSession';
import Autocorrelation from './components/sections/Autocorrelation';
import Backtests from './components/sections/Backtests';
import KillZones from './components/sections/KillZones';
import AsianRange from './components/sections/AsianRange';
import CmeGap from './components/sections/CmeGap';
import HalvingCycle from './components/sections/HalvingCycle';
import WeeklyRange from './components/sections/WeeklyRange';
import MonthlyBias from './components/sections/MonthlyBias';
import BtcEthCorr from './components/sections/BtcEthCorr';
import MfeMae from './components/sections/MfeMae';
import Streaks from './components/sections/Streaks';
import RiskOfRuin from './components/sections/RiskOfRuin';
import Kelly from './components/sections/Kelly';
import DrawdownDuration from './components/sections/DrawdownDuration';
import Sortino from './components/sections/Sortino';

const SECTIONS: Record<string, React.FC> = {
  overview: Overview, sessions: Sessions, calendar: Calendar,
  hourly: Hourly, fomc: Fomc, liquidity: Liquidity, returns: Returns,
  volatility: Volatility, candles: Candles, trends: Trends, volume: Volume,
  sessiondive: SessionDive, roundnums: RoundNumbers, bigmoves: BigMoves,
  heatmap: DowSession, autocorr: Autocorrelation, backtests: Backtests,
  killzones: KillZones, asianrange: AsianRange, cmegap: CmeGap,
  halvingcycle: HalvingCycle, weeklyrange: WeeklyRange, monthlybias: MonthlyBias,
  correlations: BtcEthCorr, mfemae: MfeMae, streaks: Streaks,
  riskruin: RiskOfRuin, kelly: Kelly, drawdown: DrawdownDuration,
  sortino: Sortino,
};

function Content({ section }: { section: string }) {
  const { loading, error } = useData();

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontFamily: FONT_MONO, color: COLORS.textMuted }}>
      Loading data...
    </div>
  );

  if (error) return (
    <div style={{ color: COLORS.negative, fontFamily: FONT_MONO, padding: 40 }}>Error: {error}</div>
  );

  const Component = SECTIONS[section];
  return Component ? <Component /> : null;
}

export default function App() {
  const [section, setSection] = useState('overview');

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="app-layout">
          <Sidebar active={section} onChange={setSection} />
          <main className="content-area">
            <Content section={section} />
          </main>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}
