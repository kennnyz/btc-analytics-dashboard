import { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { COLORS, FONT_MONO } from './components/shared/charts/theme';

import Overview from './components/sections/Overview';
import SessionPlaybook from './components/sections/SessionPlaybook';
import Seasonality from './components/sections/Seasonality';
import Hourly from './components/sections/Hourly';
import Fomc from './components/sections/Fomc';
import Liquidity from './components/sections/Liquidity';
import Volatility from './components/sections/Volatility';
import Trends from './components/sections/Trends';
import Volume from './components/sections/Volume';
import BigMoves from './components/sections/BigMoves';
import AsianRange from './components/sections/AsianRange';
import CmeGap from './components/sections/CmeGap';
import HalvingCycle from './components/sections/HalvingCycle';
import WeeklyRange from './components/sections/WeeklyRange';
import TimeInProfit from './components/sections/TimeInProfit';
import DrawdownRecovery from './components/sections/DrawdownRecovery';
import DcaOptimizer from './components/sections/DcaOptimizer';
import ConsecutiveRed from './components/sections/ConsecutiveRed';
import RegimeSplit from './components/sections/RegimeSplit';
import BuyTheDip from './components/sections/BuyTheDip';
import ReturnDist from './components/sections/ReturnDist';
import AthDrawdown from './components/sections/AthDrawdown';
import MacroEvents from './components/sections/MacroEvents';
import VolRegimeEntry from './components/sections/VolRegimeEntry';

const SECTIONS: Record<string, React.FC> = {
  overview: Overview, sessionplaybook: SessionPlaybook, seasonality: Seasonality,
  hourly: Hourly, fomc: Fomc, liquidity: Liquidity,
  volatility: Volatility, trends: Trends, volume: Volume,
  bigmoves: BigMoves,
  asianrange: AsianRange, cmegap: CmeGap,
  halvingcycle: HalvingCycle, weeklyrange: WeeklyRange,
  timeinprofit: TimeInProfit, drawdowns: DrawdownRecovery,
  dcaoptimizer: DcaOptimizer, consecutivered: ConsecutiveRed,
  regimesplit: RegimeSplit, buythedip: BuyTheDip,
  returndist: ReturnDist, athdrawdown: AthDrawdown,
  macroevents: MacroEvents, volregime: VolRegimeEntry,
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
