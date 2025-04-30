import styled from 'styled-components';
import palette from '@constants/styles';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto:
  outline: 0;
`;

export const Overlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

export const Inner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${palette.white300};
  border-radius: 15px;
  min-width: 550px;
  max-width: 750px;
  height: auto;
  max-height: 701px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 30px;
`;

export const TitleText = styled.h2`
  margin-top: 20px;
  margin-bottom: 6px;
  padding-left: 20px;
  text-align: left;
  text-decoration: none;
  font-family: 'kumap-bold';
  font-size: 24px;
  color: ${palette.black500};
`;

export const Content = styled.div`
  width: 100%;
  height: 570px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const NoticeText = styled.div`
  padding-top: 15px;
  font-size: 15px;
  text-color: ${palette.gray500};
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 2%;
  right: 0%;
  width: 40px;
  height: 40px;
  margin: 32px;
  text-align: center;
  font-size: 15px;
  color: ${palette.black500};
  cursor: pointer;
`;

export const MainText = styled.h1`
  position: relative;
  margin-top: 0px;

  text-align: left;
  font-family: 'kumap-bold';
  font-size: 24px;
  color: ${palette.black500};
`;

export const ErrorMessage = styled.span`
  position: relative;
  display: block;
  margin-top: 5px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: left;
  font-size: 12px;
  color: ${palette.red500};
`;

export const GuestPanel = styled.div`
  position: absolute;
  top: 70px;
  left: 15px;
  width: calc(100% - 30px);
  height: calc(100% - 120px);
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginButton = styled.button`
  z-index: 3;
  background-color: transparent;
  color: ${palette.blue500};
  border: 2px solid ${palette.blue500};
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: rgba(191, 190, 232, 0.5);
  }
`;
