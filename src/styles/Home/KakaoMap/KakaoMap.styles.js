import styled from 'styled-components';
import palette from '@constants/styles';

export const MapContainer = styled.div`
  position: relative;
  width: calc(100% - 450px);
  height: 100%;
  z-index: 5;
`;

export const MapButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isToggled' && prop !== 'type',
})`
  position: absolute;
  background: ${(props) =>
    props.isToggled
      ? props.type === 'auction'
        ? palette.red500
        : props.type === 'listing'
          ? palette.blue500
          : palette.gray700
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
  color: ${(props) => (props.isToggled ? palette.white500 : palette.gray700)};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background: ${(props) =>
      props.isToggled
        ? props.type === 'auction'
          ? palette.red700
          : props.type === 'listing'
            ? palette.blue700
            : palette.gray900
        : palette.gray300};
    cursor: pointer;
  }
`;
