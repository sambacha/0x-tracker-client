import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const CardFooter = styled.div`
  background: ${COLORS.NEUTRAL.MYSTIC_100};
  border-top: 1px solid ${COLORS.NEUTRAL.MYSTIC_200};
  color: ${COLORS.NEUTRAL.MYSTIC_600};
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 1rem;
  text-align: right;
  text-transform: uppercase;
`;

export default CardFooter;
