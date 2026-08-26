function usePipelineStats(runs) {
  const totalRuns = runs.length;
  const success = runs.filter((r) => r.status === "SUCCESS").length;

  const successRate =
    totalRuns === 0 ? 0 : ((success / totalRuns) * 100).toFixed(1);

  // buildTime is stored in milliseconds — convert to seconds for display.
  const avgBuildMs =
    totalRuns === 0
      ? 0
      : runs.reduce((sum, r) => sum + r.buildTime, 0) / totalRuns;

  const avgBuildSeconds = (avgBuildMs / 1000).toFixed(1);

  return { totalRuns, successRate, avgBuildSeconds };
}

export default usePipelineStats;