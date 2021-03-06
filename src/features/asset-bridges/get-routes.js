import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/asset-bridges-page'),
    path: URL.ASSET_BRIDGES,
  },
];

export default getRoutes;
