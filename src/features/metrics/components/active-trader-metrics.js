import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import AsyncActiveTraderMetricsChart from './async-active-trader-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import ResetChartButton from '../../../components/reset-chart-button';
import useActiveTraderMetrics from '../hooks/use-active-trader-metrics';

const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const determineGranularity = period => {
  if (period === TIME_PERIOD.ALL) {
    return 'week';
  }

  return undefined;
};

const ActiveTraderMetrics = ({ period }) => {
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loading] = useActiveTraderMetrics(
    { granularity: determineGranularity(period), period },
    { autoReload: !brushActive },
  );

  // This is a quick and dirty hack to implement brush resetting because Recharts
  // doesn't allow us to control the brush indexes after mount. It works by modifying
  // a chartKey value which is used as the key prop on AsyncNetworkMetricsChart below.
  // When this key changes it will force a rerender of the chart.
  const [chartKey, setChartKey] = React.useState(Date.now());
  const handleResetClick = () => {
    setBrushActive(false);
    setChartKey(Date.now());
  };

  // The NetworkMetricsChart is designed to only rerender when one of its props changes. This
  // is to prevent the brush position resetting when chart data hasn't changed. Because of this
  // we must memoize the `handleBrushChange` and `data` props to ensure their references don't
  // change each time this component rerenders (e.g. after the brushActive state changes).
  const handleBrushChange = React.useCallback(() => {
    setBrushActive(true);
  }, []);

  const data = React.useMemo(
    () =>
      (metrics || []).map(metric => ({
        date: new Date(metric.date),
        makerCount: metric.makerCount,
        takerCount: metric.takerCount,
        traderCount: metric.traderCount,
      })),
    [metrics],
  );

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <Container>
      {brushActive && (
        <ResetChartButton
          css="position: absolute; right: 0; z-index: 10;"
          onClick={handleResetClick}
        />
      )}
      <AsyncActiveTraderMetricsChart
        data={data}
        key={chartKey}
        onBrushChange={handleBrushChange}
      />
    </Container>
  );
};

ActiveTraderMetrics.propTypes = {
  period: PropTypes.string,
};

ActiveTraderMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export, react/prop-types, react/no-multi-comp
export default ({ period }) => (
  /*
    This is a hack to ensure autoReload is reset whenever the period or type props are changed.
    By using a key composed of period and type we can ensure the metrics component will remount
    (and therefore reset state) whenever one of these props changes.

    Ideally the autoReload state would be lifted up the component tree but I'm being lazy for
    the time being because of the additional work involved.
  */
  <ActiveTraderMetrics key={period} period={period} />
);
