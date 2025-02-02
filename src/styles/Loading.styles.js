import styled from 'styled-components';
import palette from '@constants/styles';

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${palette.white500};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.h1`
  margin-top: 30px;
  text-align: center;
  font-size: 32px;
  color: ${palette.blue500};
`;
