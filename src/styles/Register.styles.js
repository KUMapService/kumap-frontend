import styled from 'styled-components';
import palette from '@constants/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
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

export const Template = styled.div`
  box-sizing: border-box;
  background: ${palette.white300};
  border: 1px solid ${palette.gray300};
  border-radius: 10px;
  margin: 10px;
  padding: 40px;
  min-width: 600px;
  max-width: 626px;
  height: auto;
`;

export const MainText = styled.h1`
  position: relative;
  margin-bottom: 22px;
  text-align: left;
  font-family: 'kumap-bold';
  font-size: 24px;
  color: ${palette.black700};
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputBox = styled.input`
  position: relative;
  flex: 1;
  box-sizing: border-box;
  background: ${palette.white300};
  padding: 5px 10px;
  margin: 4px 0px;
  text-align: left;
  font-size: 17px;
  font-family: sans-serif;
  color: ${palette.black700};
  border: 2px solid ${palette.gray300};
  border-radius: 5px;
  width: 100%;
  height: 48px;
  transition: border-color 0.3s ease-in-out;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  &::placeholder {
    color: ${palette.gray300};
    font-family: 'kumap-medium';
  }
  &:focus {
    outline: none;
    border: 2px solid ${palette.blue500};
  }
  &:disabled {
    background: ${palette.gray300};
    color: ${palette.gray500};
  }
`;

export const ConfirmButton = styled.button`
  position: relative;
  box-sizing: border-box;
  border: 1px solid ${palette.gray500};
  background: ${palette.white500};
  text-align: center;
  font-size: 12px;
  color: ${palette.black500};
  border-radius: 10px;
  margin-top: 4px;
  margin-left: 4px;
  width: 96px;
  height: 48px;
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    background: ${palette.gray300};
    cursor: pointer;
  }
  &:disabled {
    background: ${palette.gray300};
    color: ${palette.gray500};
    cursor: default;
  }
`;

export const PasswordInputBox = styled(InputBox)`
  padding-right: 36px;
  &[type='password'] {
    font-family: inherit;
  }
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  box-sizing: border-box;
  margin-top: 13px;
  margin-left: 480px;
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
  text-align: left;
  font-size: 12px;
  color: ${palette.red500};
`;

export const RegisterButton = styled.button`
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
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    background: ${palette.blue700};
    cursor: pointer;
  }
`;

export const TermSummaryButton = styled.button`
  border: 0;
  background-color: transparent;
  position: absolute;
  right: -4%;
  width: 90px;
  text-align: center;
  text-decoration: underline;
  font-size: 12px;
  color: ${palette.gray500};
  cursor: pointer;
`;

export const TermsForm = styled.div`
  position: relative;
  margin-top: 38px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: ${palette.gray500};
`;

export const TermsTitleText = styled.label`
  margin-bottom: 30px;
  font-size: 16px;
  color: ${palette.black700};
`;

export const TermsCheckboxText = styled.label`
  margin-left: 5px;
  width: 100%;
`;
