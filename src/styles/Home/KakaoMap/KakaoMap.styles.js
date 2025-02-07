import styled from 'styled-components';
import palette from '@constants/styles';

export const MapContainer = styled.div`
  position: relative;
  width: calc(100% - 450px);
  height: 100%;
  z-index: 5;
`;

export const MapButton = styled.button`
  position: absolute;
  background: ${(props) =>
    props.toggle
      ? props.type === 'bid'
        ? palette.red500
        : props.type === 'sale'
          ? palette.blue500
          : palette.gray500
      : palette.white500};
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3));
  border: 0;
  border-radius: 6px;
  top: calc(30px + ${(props) => props.number * 60}px);
  right: 20px;
  width: 42px;
  height: 42px;
  z-index: 10;
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 12px;
  color: ${(props) => (props.toggle ? palette.white500 : palette.gray700)};
  cursor: pointer;
`;
