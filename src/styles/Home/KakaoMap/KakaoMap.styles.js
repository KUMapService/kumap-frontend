import styled from 'styled-components';
import palette from '@constants/styles';

export const MapContainer = styled.div`
  position: relative;
  width: calc(100% - 500px);
  min-width: 400px;
  height: 100%;
  z-index: 5;
`;

export const MapButton = styled.button`
  position: absolute;
  background: ${(props) =>
    props.toggle ? (props.type === 'bid' ? '#ff7d7d' : props.type === 'sale' ? '#0067a3' : '#767676') : '#FAFAFA'};
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
  color: ${(props) => (props.toggle ? '#FAFAFA' : '#767676')};
  cursor: pointer;
`;
