import styled from 'styled-components';
import palette from '@constants/styles';

export const Container = styled.div`
  background-color: ${palette.black500};
`;

export const Panel = styled.div`
  position: fixed;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
  background-color: ${palette.white500};
  top: 0;
  bottom: 0;
  left: -320px;
  transition: 0.4s ease;
  color: ${palette.white300};
  height: 100%;
  z-index: 99;
`;

export const Background = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${palette.black500};
  opacity: ${(props) => (props.isOpen ? 0.5 : 0)};
  visibility: ${(props) => (props.isHidden ? 'hidden' : 'visible')};
  transition: opacity 0.5s ease-in-out;
  width: 100vw;
  height: 100vh;
  border: 0;
  z-index: 98;
`;

export const TopPanel = styled.div`
  position: relative;
  background-color: ${palette.white300};
  height: 55px;
  z-index: 99;
`;

export const MiddlePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.051));
  background-color: ${palette.white300};
  margin-top: 6px;
  height: 150px;
  z-index: 99;
`;

export const BottomPanel = styled.div`
  position: relative;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.051));
  background-color: ${palette.white300};
  padding: 20px;
  margin-top: 6px;
  max-height: calc(100% - 280px);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 99;
`;

export const CategoryText = styled.h2`
  margin-top: 6px;
  margin-bottom: 6px;
  text-align: left;
  text-decoration: none;
  font-family: 'kumap-bold';
  font-size: 18px;
  color: ${palette.black500};
`;

export const CategoryButton = styled.button`
  position: relative;
  background-color: transparent;
  margin-bottom: -1px;
  border: 0px solid;
  border-top: 1px solid ${palette.gray300};
  border-bottom: 1px solid ${palette.gray300};
  padding-left: 0px;
  width: 100%;
  height: 32px;
  text-align: left;
  text-decoration: none;
  font-size: 15px;
  color: ${palette.gray700};
  cursor: pointer;
  z-index: 99;
`;

export const BackButton = styled.button`
  position: relative;
  margin-top: 7px;
  margin-right: 10px;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 4px;
  background-color: aqua;
  overflow: hidden;
  cursor: pointer;
`;

export const RefreshButton = styled.button`
  position: absolute;
  top: 32px;
  right: 20px;
  width: 15px;
  height: 15px;
  border: 0;
  border-radius: 4px;
  background-color: aqua;
  overflow: hidden;
  cursor: pointer;
`;

export const OpenButton = styled.button`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 55px;
  height: 55px;
  z-index: 99;
  transition: 0.4s ease;
  border: 0;
  border-radius: 40px;
  background-color: transparent;
  overflow: hidden;
`;

export const OpenTextButton = styled.button`
  position: absolute;
  background-color: transparent;
  top: 20px;
  right: 24px;
  border: 0;
  text-align: center;
  text-decoration: none;
  font-family: 'SC Dream 4';
  font-size: 12px;
  color: ${palette.gray300};
  cursor: pointer;
  z-index: 99;
`;

export const CloseButton = styled.button`
  position: relative;
  right: -10px;
  top: 10px;
  width: 40px;
  height: 40px;
  z-index: 99;
  transition: 0.8s ease;
  border: 0;
  border-radius: 40px;
  background-color: transparent;
  overflow: hidden;
`;

export const UserImage = styled.img`
  border-radius: 48px;
  background-color: ${palette.gray500};
  width: 64px;
  height: 64px;
  margin: 20px;
  margin-bottom: 10px;
`;

export const UserNameText = styled.h2`
  margin-top: 32px;
  margin-bottom: 0px;
  text-align: left;
  text-decoration: none;
  font-family: 'kumap-bold';
  font-size: 18px;
  color: ${palette.black500};
`;

export const UserEmailText = styled.div`
  margin-top: 4px;
  text-align: left;
  text-decoration: none;
  font-size: 12px;
  color: ${palette.gray700};
`;

export const TextButton = styled.button`
  border: 0;
  padding: 0;
  background-color: transparent;
  width: 80px;
  text-align: center;
  font-size: 12px;
  color: ${palette.gray700};
  cursor: pointer;
`;

export const LoginButton = styled.button`
  background-color: ${palette.blue500};
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.161));
  margin-top: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  border: 0;
  border-radius: 6px;
  width: 135px;
  height: 50px;
  font-family: 'kumap-bold';
  font-size: 12px;
  color: ${palette.white300};
  cursor: pointer;
`;

export const RegisterButton = styled.button`
  background-color: ${palette.white300};
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.161));
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-radius: 6px;
  width: 135px;
  height: 50px;
  font-family: 'kumap-bold';
  font-size: 12px;
  color: ${palette.black700};
  cursor: pointer;
`;

export const LandNavigateButton = styled.button`
  border: 0;
  border-top: 1px solid ${palette.gray700};
  border-bottom: 1px solid ${palette.gray700};
  padding: 0;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-bottom: -1px;
  background-color: transparent;
  width: 100%;
  text-align: left;
  font-size: 12px;
  color: ${palette.black300};
  cursor: pointer;
`;

export const LandNavigateText = styled.span`
  text-align: left;
  font-size: 12px;
  color: ${palette.black300};
`;

export const LandNavigateHighlightText = styled.span`
  text-align: left;
  font-size: 12px;
  color: ${palette.red500};
`;
