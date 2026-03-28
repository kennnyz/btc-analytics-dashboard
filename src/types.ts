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

export interface FomcData {
  fomc_avg_range: number; normal_avg_range: number;
  fomc_sweep_per_day: number; normal_sweep_per_day: number;
  fomc_avg_return: number; fomc_reversal_rate: number;
  day_before_fomc_avg_return: number; day_before_fomc_avg_range: number;
  day_after_fomc_avg_return: number; day_after_fomc_avg_range: number;
}

export interface ReturnDist { mean: number; median: number; q25: number; q75: number; min: number; max: number; std: number; }
export interface SweepReturnsData { SSL: Record<string, ReturnDist>; BSL: Record<string, ReturnDist>; }

export interface VolatilityData {
  atr_by_month: { month: string; avg_atr: number; avg_range: number }[];
  atr_by_session: { session: string; avg_range: number }[];
  bb_squeeze: { threshold_width: number; total_squeezes: number; avg_move_24h: number; avg_move_48h: number; pct_big_move: number };
  vol_clustering: { big_move_days: number; avg_range_day1: number; avg_range_day2: number; avg_range_day3: number; avg_normal_range: number };
}

export interface CandleStructureData {
  wick_by_session: { session: string; avg_upper_wick: number; avg_lower_wick: number }[];
  engulfing: { bullish_count: number; bullish_avg_4h: number; bullish_avg_24h: number; bearish_count: number; bearish_avg_4h: number; bearish_avg_24h: number };
  hammer_star: { hammer_count: number; hammer_avg_4h_ret: number; shooting_star_count: number; shooting_star_avg_4h_ret: number };
  gaps: { total_mondays: number; avg_gap_pct: number; gap_fill_rate: number };
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

export interface RoundNumberStat { level: number; total_touches: number; bounce_pct: number; break_pct: number; avg_24h_ret: number; }
export interface RoundNumbersData {
  round_numbers: RoundNumberStat[];
  magnetic_effect: { from_below_avg_ret: number; from_above_avg_ret: number; from_below_count: number; from_above_count: number };
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

export interface AutocorrelationData { autocorr_1h: number; autocorr_4h: number; autocorr_1d: number; momentum_5d_corr: number; }

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

// BTC Internal Correlations
export interface BtcInternalCorrData { return_volume_corr: number; volatility_next_return_corr: number; volume_trend_corr: number; }

// BTC-ETH Correlation
export interface RollingCorr { date: string; corr: number; }
export interface BtcEthCorrelationData { overall_corr: number; rolling_30d: RollingCorr[]; divergence_events: number; divergence_pct: number; }


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
  sweep_returns: SweepReturnsData;
  volatility: VolatilityData;
  candle_structure: CandleStructureData;
  trend: TrendData;
  volume: VolumeData;
  session_dive: SessionDiveData;
  round_numbers: RoundNumbersData;
  post_big_move: PostBigMoveData;
  dow_session: DowSessionData;
  autocorrelation: AutocorrelationData;
  kill_zones: KillZonesData;
  asian_range_amd: AsianRangeAmdData;
  cme_gap: CmeGapData;
  halving_cycle: HalvingCycleData;
  weekly_range: WeeklyRangeData;
  monthly_open_bias: MonthlyOpenBiasData;
  btc_internal_corr: BtcInternalCorrData;
  btc_eth_correlation: BtcEthCorrelationData;
}

