import styled from 'styled-components';
import palette from '@constants/styles';

export const Container = styled.div`
  margin: auto;
  margin-top: 120px;
  min-width: 300px;
  max-width: 426px;
  height: 100vh;
`;

export const Template = styled.div`
  box-sizing: border-box;
  background: ${palette.white300};
  filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.2));
  border-radius: 10px;
  margin: 10px;
  padding: 40px;
  min-width: 300px;
  max-width: 426px;
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
  margin-top: 24px;
  border: none;
  background: ${palette.blue500};
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 18px;
  color: ${palette.white300};
  border-radius: 10px;
  width: 100%;
  height: 48px;

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
  width: 90px;
  text-align: center;
  font-size: 12px;
  color: ${palette.gray500};
  cursor: pointer;
`;

export const DivLine = styled.hr`
  margin: 0;
  margin-top: 3px;
  border: 1px solid ${palette.gray500};
  height: 13px;
`;
