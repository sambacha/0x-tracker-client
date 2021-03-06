import useApi from '../../../hooks/use-api';

const useNetworkMetrics = (
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/network', {
    autoReload,
    params: {
      granularity,
      period,
    },
  });

export default useNetworkMetrics;
