import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import NavigationLink from './navigation-link';
import SubNavigationParent from './sub-navigation-parent';

const StyledNavigation = styled.nav`
  height: 100%;
  margin: 0 0 0 2.5rem;
  padding: 0;
`;

const Navigation = ({ className }) => (
  <StyledNavigation aria-label="Primary" className={className}>
    <SubNavigationParent
      items={[
        { href: URL.TRADERS, title: 'Active Traders' },
        { href: URL.ASSET_BRIDGES, title: 'Asset Bridges' },
        { href: URL.FILLS, title: 'Browse Fills' },
        { href: URL.NETWORK_INSIGHTS, title: 'Insights' },
      ]}
    >
      Network
    </SubNavigationParent>
    <NavigationLink href={URL.TOKENS}>Tokens</NavigationLink>
    <NavigationLink href={URL.RELAYERS}>Relayers</NavigationLink>
    <NavigationLink href={URL.NEWS}>News & Updates</NavigationLink>
  </StyledNavigation>
);

Navigation.propTypes = {
  className: PropTypes.string,
};

Navigation.defaultProps = {
  className: undefined,
};

export default Navigation;
