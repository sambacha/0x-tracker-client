import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../styles/constants';

const CardPlaceholder = ({ children }) => (
  <div
    css={`
      align-items: center;
      color: ${COLORS.NEUTRAL.MYSTIC_500};
      display: flex;
      justify-content: center;
      min-height: 300px;
      padding: 3rem;
      text-align: center;
      width: 100%;
    `}
  >
    <div css="max-width: 370px;">{children}</div>
  </div>
);

CardPlaceholder.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardPlaceholder;
