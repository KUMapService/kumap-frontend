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

export const TopButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isChecked',
})`
  background-color: ${(props) => (props.isChecked ? palette.blue100 : 'transparent')};
  border: 0;
  border-bottom: ${(props) => (props.isChecked ? `2px solid ${palette.blue500}` : `2px solid ${palette.gray500}`)};
  width: 50%;
  text-align: center;
  font-size: 12px;
  color: ${palette.black500};
  transition:
    background-color 0.3s ease-in-out,
    border 0.3s ease-in-out;

  &:hover {
    background-color: ${palette.blue100};
    border-bottom: 2px solid ${palette.blue500};
    cursor: pointer;
  }
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

export const Content = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  background-color: ${palette.white500};
`;

export const Footer = styled.footer`
  background-color: ${palette.gray100};
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: ${palette.gray700};
  border-top: 1px solid ${palette.gray300};
  margin-top: auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;
