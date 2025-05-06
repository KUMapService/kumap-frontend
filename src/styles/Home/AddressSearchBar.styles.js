import styled from 'styled-components';
import palette from '@constants/styles';

export const Container = styled.div`
  position: absolute;
  background-color: ${palette.white500};
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.15));
  display: flex;
  border-radius: 40px;
  padding: 6px 18px;
  top: 20px;
  left: calc(50% - 140px);
  width: auto;
  height: auto;
  gap: 4px;
  z-index: 5;
`;

export const TextButton = styled.button`
  position: relative;
  background-color: transparent;
  border: 0;
  border-radius: 10px;
  min-width: 60px;
  height: 22px;
  text-align: center;
  text-decoration: none;
  font-size: 11px;
  color: ${palette.black500};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${palette.gray300};
    cursor: pointer;
  }
`;

export const VDivLine = styled.hr`
  margin: 0 10px;
  border: 1px solid ${palette.gray500};
  height: 20px;
`;

export const SelectDiv = styled.div`
  position: absolute;
  background-color: ${palette.white500};
  border: 0;
  border-radius: 10px;
  padding-bottom: 10px;
  top: 50px;
  left: calc(50% - 140px);
  width: 280px;
  height: auto;
`;

export const SelectTopText = styled.span`
  position: relative;
  display: block;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid ${palette.black500};
  padding-top: 6px;
  padding-bottom: 6px;
  margin-left: 10px;
  width: 260px;
  height: auto;
  text-align: center;
  text-decoration: none;
  font-size: 11px;
  color: ${palette.black500};
`;

export const SelectGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 90px 90px 90px;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 260px;
`;

export const SelectButton = styled.button`
  position: relative;
  background-color: transparent;
  border: 0;
  border-radius: 10px;
  padding-bottom: 4px;
  width: 100px;
  text-align: center;
  text-decoration: none;
  font-size: 11px;
  color: ${palette.black500};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${palette.gray300};
    cursor: pointer;
  }
`;

export const ViewMapButton = styled.button`
  position: relative;
  background-color: ${palette.red500};
  border: 0;
  border-radius: 6px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-top: 10px;
  margin-left: 10px;
  width: 260px;
  text-align: center;
  text-decoration: none;
  font-family: 'kumap-bold';
  font-size: 11px;
  color: ${palette.white500};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${palette.red700};
    cursor: pointer;
  }
`;
