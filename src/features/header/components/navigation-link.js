import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from '../../../components/link';

const StyledNavigationLink = styled(Link)`
  align-items: center;
  color: ${(props) => (props.active ? 'white' : 'inherit')};
  display: inline-flex;
  height: 100%;
  margin-right: 1.75rem;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const NavigationLink = ({ href, children }) => {
  const location = useLocation();
  const active = location.pathname.startsWith(href);

  return (
    <StyledNavigationLink active={active} aria-current={active} href={href}>
      {children}
    </StyledNavigationLink>
  );
};

NavigationLink.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default NavigationLink;
