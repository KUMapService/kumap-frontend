import styled from 'styled-components';
import palette from '@constants/styles';

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${palette.whiteM};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorText = styled.h1`
  text-align: center;
  font-size: 32px;
  color: ${palette.blueM};
`;

export const Content = styled.span`
  display: block;
  text-align: center;
  font-size: 15px;
  color: ${palette.blackM};
`;
