import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import { buildUrl } from '../../../util';
import { media } from '../../../styles/util';
import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import getPeriodOptions from '../../../util/get-period-options';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import RelayerMetrics from '../../metrics/components/relayer-metrics';
import RelayerPageTitle from './relayer-page-title';
import useRelayer from '../hooks/use-relayer';

const StyledChartsContainer = styled(ChartsContainer)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const RelayerPage = ({ history, location, match }) => {
  const { slug } = match.params;
  const [relayer, loadingRelayer] = useRelayer(slug);
  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  useMetadata({
    title:
      relayer === undefined
        ? undefined
        : `${relayer.name} Trading Activity, Metrics & Charts`,
  });

  const onPageChange = useCallback((newPage) => {
    history.push(
      buildUrl(match.url, {
        page: newPage,
      }),
    );
  }, []);

  if (loadingRelayer) {
    return <LoadingPage />;
  }

  if (relayer === undefined) {
    return <PageNotFound />;
  }

  return (
    <PageLayout title={<RelayerPageTitle relayer={relayer} />}>
      <StyledChartsContainer
        charts={[
          {
            component: (
              <RelayerMetrics relayerId={relayer.id} type="tradeVolume" />
            ),
            title: 'Volume',
          },
          {
            component: (
              <RelayerMetrics relayerId={relayer.id} type="tradeCount" />
            ),
            title: 'Trades',
          },
          {
            component: (
              <RelayerMetrics relayerId={relayer.id} type="traderCount" />
            ),
            title: 'Active Traders',
          },
        ]}
        defaultPeriod={TIME_PERIOD.MONTH}
        periods={getPeriodOptions([
          TIME_PERIOD.DAY,
          TIME_PERIOD.WEEK,
          TIME_PERIOD.MONTH,
          TIME_PERIOD.YEAR,
          TIME_PERIOD.ALL,
        ])}
      />
      <Card fullHeight>
        <Fills
          excludeColumns={['relayer']}
          filter={{ relayer: relayer.id }}
          onPageChange={onPageChange}
          page={page}
        />
      </Card>
    </PageLayout>
  );
};

RelayerPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RelayerPage;
