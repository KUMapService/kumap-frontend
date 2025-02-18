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
  min-width: 300px;
  max-width: 450px;
  height: auto;
  max-height: 701px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 30px;
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

export const EmailInputBox = styled.input`
  position: relative;
  margin-top: 5px;
  box-sizing: border-box;
  background: ${palette.white300};
  padding: 10px 20px;
  text-align: left;
  font-size: 17px;
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
    border: 2px solid ${palette.black500};
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

export const SendEmailButton = styled.button`
  position: relative;
  box-sizing: border-box;
  margin-top: 24px;
  border: none;
  background: ${palette.black500};
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 18px;
  color: ${palette.white300};
  border-radius: 10px;
  width: 100%;
  height: 48px;

  &:hover {
    background: ${palette.black500};
    cursor: pointer;
  }
`;
