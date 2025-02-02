import styled from 'styled-components';
import palette from '@constants/styles';

export const SideWindowContainer = styled.div`
  position: relative;
  background: ${palette.white500};
  filter: drop-shadow(3px 0px 6px rgba(0, 0, 0, 0.161));
  width: 450px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 8;
`;
export const TopMenu = styled.div`
  background-color: ${palette.white500};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  z-index: 9;
`;

export const TopButton = styled.button`
  background-color: ${(props) => (props.isCheck ? palette.blue100 : 'transparent')};
  border: 0;
  border-bottom: ${(props) => (props.isCheck ? `2px solid ${palette.blue500}` : `2px solid ${palette.gray500}`)};
  width: 50%;
  text-align: center;
  font-size: 12px;
  color: ${palette.black500};
  cursor: pointer;
`;

export const LandInfoAddrText = styled.span`
  position: relative;
  margin-top: 340px;
  margin-bottom: 10px;
  text-align: center;
  font-family: 'SC Dream 6';
  font-size: 20px;
  color: ${palette.black500};
`;

export const MyPageBackButton = styled.button`
  position: absolute;
  background-color: ${palette.white500};
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3));
  border: 0;
  border-radius: 10px;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 36px;
  z-index: 20;
  cursor: pointer;
`;
