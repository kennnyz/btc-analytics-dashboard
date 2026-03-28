// Analytics data types — derived from btc_analytics.py output

export interface OverviewData {
  total_sweeps: number;
  ssl_count: number;
  bsl_count: number;
  reversal_rate: number;
  by_level_type: Record<string, number>;
  avg_returns: Record<string, number>;
}

export interface SessionStat {
  session: string;
  count: number;
  reversal_rate: number;
  avg_4h_return: number;
  avg_depth: number;
}

export interface DayOfWeekStat {
  day: string;
  day_num: number;
  count: number;
  reversal_rate: number;
  avg_daily_range: number;
  avg_daily_return: number;
}

export interface QuarterStat {
  quarter: string;
  count: number;
  reversal_rate: number;
  early: number;
  mid: number;
  late: number;
}

export interface LevelTypeStat {
  level_type: string;
  side: string;
  count: number;
  reversal_rate: number;
  avg_4h_return: number;
  avg_depth: number;
}

export interface DepthBucketStat {
  bucket: string;
  count: number;
  reversal_rate: number;
  avg_return_4H: number;
}

export interface HourlyStat { hour: number; count: number; reversal_rate: number; }
export interface MonthlyStat { month: string; month_num: number; avg_return: number; sweep_count: number; }
export interface YearlyStat { year: number; total_sweeps: number; reversal_rate: number; avg_4h_return: number; }

export interface FomcMeeting {
  date: string;
  wb_return: number | null; wb_high: number | null; wb_low: number | null; wb_max_rally: number | null; wb_max_dd: number | null;
  event_open: number; event_close: number; event_high: number; event_low: number; event_range: number; event_return: number;
  wa_return: number | null; wa_high: number | null; wa_low: number | null; wa_max_rally: number | null; wa_max_dd: number | null;
}
export interface FomcData {
  fomc_avg_range: number; normal_avg_range: number;
  fomc_sweep_per_day: number; normal_sweep_per_day: number;
  fomc_avg_return: number; fomc_reversal_rate: number;
  day_before_fomc_avg_return: number; day_before_fomc_avg_range: number;
  day_after_fomc_avg_return: number; day_after_fomc_avg_range: number;
  avg_wb_return?: number; avg_wa_return?: number;
  avg_wa_max_rally?: number; avg_wa_max_dd?: number;
  positive_wa_pct?: number;
  meetings?: FomcMeeting[];
}

export interface VolatilityData {
  atr_by_month: { month: string; avg_atr: number; avg_range: number }[];
  atr_by_session: { session: string; avg_range: number }[];
  bb_squeeze: { threshold_width: number; total_squeezes: number; avg_move_24h: number; avg_move_48h: number; pct_big_move: number };
  vol_clustering: { big_move_days: number; avg_range_day1: number; avg_range_day2: number; avg_range_day3: number; avg_normal_range: number };
}

export interface TrendData {
  ema_stats: { pct_above_ema20: number; pct_above_ema50: number; pct_above_ema200: number };
  trend_length: { avg_above_ema50: number; max_above_ema50: number; avg_below_ema50: number; max_below_ema50: number };
  drawdown: { max_drawdown: number; avg_drawdown: number; count_10pct_drawdowns: number; avg_recovery_days: number };
  streaks: { max_green: number; avg_green: number; max_red: number; avg_red: number; after_3_green_avg_ret: number; after_3_red_avg_ret: number; after_3_green_count: number; after_3_red_count: number };
}

export interface VolumeData {
  vol_by_session: { session: string; avg_volume: number }[];
  vol_by_hour: { hour: number; avg_volume: number }[];
  vol_spikes: { total: number; by_session: { session: string; count: number; avg_ret_1h: number; avg_ret_4h: number }[] };
}

export interface SessionDiveData {
  asia_range: { avg_range_pct: number; london_break_high_pct: number; london_break_low_pct: number; total_days: number };
  london_open_predict: { total_days: number; correct_pct: number };
  overlap: { overlap_avg_range: number; rest_avg_range: number };
  orb: { session: string; total: number; break_up_pct: number; break_down_pct: number }[];
}

export interface PostBigMoveData {
  after_big_up: { count: number; returns: Record<string, number> };
  after_big_down: { count: number; returns: Record<string, number> };
  after_big_4h: { count: number; avg_ret_4h: number; avg_ret_12h: number };
  mean_reversion: { oversold_events: number; avg_recovery_days_oversold: number; overbought_events: number; avg_recovery_days_overbought: number };
}

export interface HeatmapMatrix { rows: string[]; cols: string[]; values: number[][]; }
export interface DowSessionData {
  reversal_heatmap: HeatmapMatrix;
  return_heatmap: HeatmapMatrix;
  best_worst: { best_reversal: { day: string; session: string; value: number }; worst_reversal: { day: string; session: string; value: number }; best_return: { day: string; session: string; value: number }; worst_return: { day: string; session: string; value: number } };
}

// Kill Zones
export interface KillZoneWindow { time: string; avg_move: number; count: number; }
export interface KillZonesData { windows: KillZoneWindow[]; top_5: KillZoneWindow[]; }

// Asian Range AMD
export interface AsianRangeDay { date: string; asian_high: number; asian_low: number; asian_range_pct: number; london_broke_high: boolean; london_broke_low: boolean; ny_broke_high: boolean; ny_broke_low: boolean; direction: string; }
export interface AsianRangeAmdData {
  total_days: number; london_break_high_pct: number; london_break_low_pct: number;
  ny_break_high_pct: number; ny_break_low_pct: number;
  amd_up_pct: number; amd_down_pct: number; amd_inside_pct: number;
  daily: AsianRangeDay[];
}

// CME Gap
export interface CmeGapEntry { date: string; friday_close: number; sunday_open: number; gap_pct: number; filled: boolean; fill_hours: number; }
export interface CmeGapFillWindow { window: string; hours: number; filled_count: number; filled_pct: number; }
export interface CmeGapPercentiles { p50: number; p75: number; p80: number; p90: number; p95: number; }
export interface CmeGapSizeBucket {
  bucket: string; count: number; fill_rate: number;
  monday_fill_pct: number; median_fill_hours: number; avg_gap_pct: number;
}
export interface CmeGapDirectionStats {
  label: string; count: number; fill_rate: number;
  monday_fill_pct: number; median_fill_hours: number; avg_gap_pct: number;
}
export interface CmeGapCorrelations { size_vs_fill_time: number; size_vs_filled: number; }
export interface CmeGapData {
  total_gaps: number; avg_gap_pct: number; gap_fill_rate: number; avg_fill_hours: number;
  never_filled_pct: number;
  fill_time_distribution: CmeGapFillWindow[];
  fill_time_percentiles: CmeGapPercentiles;
  size_analysis: CmeGapSizeBucket[];
  direction_analysis: { up: CmeGapDirectionStats; down: CmeGapDirectionStats };
  correlations: CmeGapCorrelations;
  gaps: CmeGapEntry[];
}

// Halving Cycle
export interface HalvingEntry { date: string; price_at_halving: number; return_30d: number | null; return_90d: number | null; return_180d: number | null; return_365d: number | null; }
export interface CycleReturn { days_since: number; avg_return: number; }
export interface HalvingCycleData { halvings: HalvingEntry[]; current_days_since_halving: number; cycle_returns: CycleReturn[]; }

// Weekly Range
export interface WeeklyRangeYear { year: number; avg_range: number; max_range: number; }
export interface WeeklyRangeQuarter { quarter: string; avg_range: number; }
export interface WeeklyRangeBucket { bucket: string; count: number; }
export interface WeeklyRangeData { avg_range: number; by_year: WeeklyRangeYear[]; by_quarter: WeeklyRangeQuarter[]; distribution: WeeklyRangeBucket[]; }

// Monthly Open Bias
export interface MonthlyBias { month: string; bullish_pct: number; avg_return: number; count: number; }
export interface MonthlyOpenBiasData { total_months: number; bullish_pct: number; by_month: MonthlyBias[]; }

// Hourly Returns
export interface HourlyReturn { hour: number; avg_return: number; median_return: number; positive_pct: number; count: number; }

// Monthly Grid (year × month)
export interface MonthlyGridRow { year: number; m1: number | null; m2: number | null; m3: number | null; m4: number | null; m5: number | null; m6: number | null; m7: number | null; m8: number | null; m9: number | null; m10: number | null; m11: number | null; m12: number | null; }

// Weekly Cumulative Range
export interface WeeklyCumulativeDay { day: string; day_num: number; avg_pct_of_weekly_range: number; median_pct: number; }

// Volatility Percentiles
export interface VolPercentiles { current_atr14: number; percentile_90d: number; percentile_365d: number; percentile_all: number; }
export interface VolYearly { year: number; avg_range: number; max_range: number; avg_atr14: number; days_above_5pct: number; days_above_10pct: number; }

// Cycle Comparison
export interface CycleComparisonEntry { name: string; date: string; price: number | null; d30: number | null; d60: number | null; d90: number | null; d180: number | null; d270: number | null; d365: number | null; d540: number | null; d730: number | null; }

// Time in Profit
export interface TimeInProfitEntry { days: number; label: string; win_pct: number; avg_return: number; median_return: number; worst: number; best: number; samples: number; }

// Drawdown Events
export interface DrawdownEventEntry { start_date: string; trough_date: string; recovery_date: string | null; peak_price: number; trough_price: number; drawdown_pct: number; recovery_days: number | null; total_days: number | null; }

// DCA Optimizer
export interface DcaDow { day: string; day_num: number; avg_return: number; avg_low_from_open: number; positive_pct: number; }
export interface DcaHour { hour: number; avg_low_from_open: number; avg_return: number; }
export interface DcaOptimizer { by_dow: DcaDow[]; by_hour: DcaHour[]; }

// Consecutive Red Days
export interface ConsecutiveRedEntry { streak: number; count: number; avg_1d: number | null; win_1d: number | null; avg_7d: number | null; win_7d: number | null; avg_30d: number | null; win_30d: number | null; }

// Regime Split
export interface RegimeSummary { days: number; pct_of_total: number; avg_daily_return: number; avg_daily_range: number; positive_days_pct: number; }
export interface RegimeHourly { hour: number; bull_avg: number; bull_positive: number; bear_avg: number; bear_positive: number; }
export interface RegimeDow { day: string; bull_avg: number; bull_positive: number; bear_avg: number; bear_positive: number; }
export interface RegimeSplitData { summary: { bull: RegimeSummary; bear: RegimeSummary }; hourly: RegimeHourly[]; dow: RegimeDow[]; }

// Buy the Dip
export interface BuyTheDipEntry { threshold: number; count: number; avg_7d: number | null; win_7d: number | null; median_7d: number | null; avg_30d: number | null; win_30d: number | null; median_30d: number | null; avg_90d: number | null; win_90d: number | null; median_90d: number | null; }

// Return Distribution
export interface ReturnHistBin { bin: number; count: number; }
export interface ReturnDistStats { mean: number; median: number; std: number; skewness: number; kurtosis: number; var_95: number; var_99: number; cvar_95: number; min: number; max: number; total_days: number; }
export interface ReturnDistributionData { histogram: ReturnHistBin[]; stats: ReturnDistStats; }

// ATH Drawdown
export interface AthDdBucket { bucket: string; days: number; pct: number; }
export interface AthDrawdownData { current_dd_pct: number; current_ath: number; distribution: AthDdBucket[]; }

// Macro Events
export interface MacroMeeting {
  date: string;
  wb_return: number | null; wb_high: number | null; wb_low: number | null; wb_max_rally: number | null; wb_max_dd: number | null;
  event_open: number; event_close: number; event_high: number; event_low: number; event_range: number; event_return: number;
  wa_return: number | null; wa_high: number | null; wa_low: number | null; wa_max_rally: number | null; wa_max_dd: number | null;
}
export interface MacroEventData {
  name: string; count: number; avg_event_return: number; avg_event_range: number; avg_normal_range: number; positive_event_pct: number;
  avg_wb_return?: number; avg_wa_return?: number; avg_wa_max_rally?: number; avg_wa_max_dd?: number; positive_wa_pct?: number;
  meetings: MacroMeeting[];
}

// Vol Regime Entry
export interface VolRegimeEntryData { total_squeezes: number; bb_width_threshold: number; bullish_pct: number; bearish_pct: number; avg_bull_return_5d: number; avg_bear_return_5d: number; }

export interface AnalyticsData {
  overview: OverviewData;
  sessions: SessionStat[];
  day_of_week: DayOfWeekStat[];
  quarters: QuarterStat[];
  level_types: LevelTypeStat[];
  depth_buckets: DepthBucketStat[];
  hourly: HourlyStat[];
  fomc: FomcData;
  monthly: MonthlyStat[];
  yearly: YearlyStat[];
  volatility: VolatilityData;
  trend: TrendData;
  volume: VolumeData;
  session_dive: SessionDiveData;
  post_big_move: PostBigMoveData;
  dow_session: DowSessionData;
  kill_zones: KillZonesData;
  asian_range_amd: AsianRangeAmdData;
  cme_gap: CmeGapData;
  halving_cycle: HalvingCycleData;
  weekly_range: WeeklyRangeData;
  monthly_open_bias: MonthlyOpenBiasData;
  hourly_returns?: HourlyReturn[];
  monthly_grid?: MonthlyGridRow[];
  weekly_cumulative_range?: WeeklyCumulativeDay[];
  vol_percentiles?: VolPercentiles;
  vol_yearly?: VolYearly[];
  cycle_comparison?: CycleComparisonEntry[];
  time_in_profit?: TimeInProfitEntry[];
  drawdown_events?: DrawdownEventEntry[];
  dca_optimizer?: DcaOptimizer;
  consecutive_red_days?: ConsecutiveRedEntry[];
  regime_split?: RegimeSplitData;
  buy_the_dip?: BuyTheDipEntry[];
  return_distribution?: ReturnDistributionData;
  ath_drawdown?: AthDrawdownData;
  macro_events?: MacroEventData[];
  vol_regime_entry?: VolRegimeEntryData;
}

