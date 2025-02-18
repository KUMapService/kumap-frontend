import styled from 'styled-components';
import palette from '@constants/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${palette.white500};
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  margin: 40px 0px;
  width: 100%;
  justify-content: center;
  font-size: 42px;
  font-family: 'kumap-bold';
  color: ${palette.blue500};
`;

export const Footer = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Template = styled.div`
  box-sizing: border-box;
  background: ${palette.white300};
  border: 1px solid ${palette.gray300};
  border-radius: 10px;
  margin: 10px;
  padding: 20px 40px;
  width: 500px;
  height: auto;
`;

export const MainText = styled.h1`
  position: relative;
  text-align: left;
  font-family: 'kumap-bold';
  font-size: 24px;
  color: ${palette.black700};
`;

export const EmailInputBox = styled.input`
  position: relative;
  margin-top: 5px;
  box-sizing: border-box;
  background: ${palette.white300};
  padding: 10px 20px;
  text-align: left;
  font-size: 18px;
  font-family: sans-serif;
  color: ${palette.black700};
  border: 2px solid ${palette.gray300};
  border-radius: 20px;
  width: 100%;
  height: 48px;
  transition: border-color 0.3s ease-in-out;

  &::placeholder {
    color: ${palette.gray300};
    font-family: 'kumap-medium';
  }
  &:focus {
    outline: none;
    border: 2px solid ${palette.blue500};
  }
`;

export const PasswordInputBox = styled.input`
  position: relative;
  margin-top: 10px;
  box-sizing: border-box;
  background: ${palette.white300};
  padding-left: 20px;
  padding-right: 42px;
  text-align: left;
  font-size: 18px;
  font-family: sans-serif;
  color: ${palette.black700};
  border: 2px solid ${palette.gray300};
  border-radius: 20px;
  width: 100%;
  height: 48px;
  transition: border-color 0.3s ease-in-out;

  &[type='password'] {
    font-family: inherit;
  }
  &::placeholder {
    color: ${palette.gray300};
  }
  &:focus {
    outline: none;
    border: 2px solid ${palette.blue500};
  }
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  box-sizing: border-box;
  margin-top: 18px;
  margin-left: -40px;
  border: none;
  padding: 4px;
  background: transparent;
  width: 32px;
  height: 32px;
  color: ${palette.gray500};

  &:hover {
    cursor: pointer;
  }
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

export const LoginButton = styled.button`
  position: relative;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 10px;
  border: none;
  background: ${palette.blue500};
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 18px;
  color: ${palette.white300};
  border-radius: 10px;
  width: 100%;
  height: 48px;
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    background: ${palette.blue700};
    cursor: pointer;
  }
`;

export const TextButtonContainer = styled.div`
  box-sizing: border-box;
  margin-top: 17px;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const TextButton = styled.button`
  border: 0;
  background-color: transparent;
  width: 80px;
  text-align: center;
  font-size: 12px;
  color: ${palette.gray500};
  cursor: pointer;
`;

export const DivLine = styled.hr`
  margin: 0 0 1px 0;
  border: 1px solid ${palette.gray500};
  height: 13px;
`;

export const FooterTextButton = styled(TextButton)`
  width: auto;
  padding: 0px 20px;
  font-size: 15px;
`;

export const FooterText = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: ${palette.gray500};
`;

export const FooterButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
