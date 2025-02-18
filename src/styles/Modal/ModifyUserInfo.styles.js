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

export const MainText = styled.h1`
  position: relative;
  margin-top: 0px;

  text-align: left;
  font-family: 'kumap-bold';
  font-size: 24px;
  color: ${palette.black500};
`;

export const UserImage = styled.img`
  border-radius: 48px;
  background-color: ${palette.gray500};
  width: 84px;
  height: 84px;
  margin: 10px;
  margin-bottom: 10px;
`;

export const UserImageEditButton = styled.button`
  position: absolute;
  background: ${palette.white500};
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
  margin-top: 66px;
  margin-left: 66px;
  border: 0;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  z-index: 1;
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    background: ${palette.gray300};
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const TopButton = styled.button`
  position: relative;
  box-sizing: border-box;
  border: 1px solid ${palette.gray500};
  background: ${palette.white500};
  text-align: center;
  font-size: 12px;
  color: ${palette.black500};
  border-radius: 10px;
  width: 100px;
  height: 32px;
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    background: ${palette.gray300};
    cursor: pointer;
  }
`;

export const NoticeText = styled.div`
  margin-top: -20px;
  width: 100%;
  color: ${palette.red500};
  font-size: 15px;
  text-align: right;
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubText = styled.h2`
  position: relative;
  margin: 0;
  width: 120px;
  text-align: left;
  font-size: 16px;
  color: ${palette.black500};
`;

export const DivLine = styled.hr`
  margin: ${(props) => (props.hide ? '5px' : '10px')} 0;
  border: 1px solid ${(props) => (props.hide ? 'transparent' : palette.gray500)};
  width: 100%;
`;

export const InputBox = styled.input`
  position: relative;
  flex: 1;
  box-sizing: border-box;
  background: ${palette.white300};
  padding: 5px 10px;
  text-align: left;
  font-size: 17px;
  font-family: sans-serif;
  color: ${palette.black700};
  border: 2px solid ${(props) => (props.errorCaused ? palette.red300 : palette.gray300)};
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
    border: 2px solid ${(props) => (props.errorCaused ? palette.red500 : palette.blue500)};
  }
  &:disabled {
    background: ${palette.gray300};
    color: ${palette.gray500};
  }
`;

export const ConfirmButton = styled(TopButton)`
  margin-left: 4px;
  width: 48px;
  height: 48px;

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
  margin-top: 9px;
  right: 34px;
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

export const PermissionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PermissionRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const PermissionContext = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToggleButton = styled.div`
  position: relative;
  width: 52px;
  height: 26px;
  background-color: ${({ isActive }) => (isActive ? palette.blue500 : palette.gray300)};
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: ${({ isActive }) => (isActive ? '30px' : '4px')};
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

export const PermissionTitle = styled.h3`
  margin: 0;
  font-size: 15px;
`;

export const PermissionSummary = styled.span`
  font-size: 12px;
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

export const BottomButton = styled(TopButton)`
  margin-top: 8px;
  font-size: 14px;
  width: 100px;
  height: 48px;
`;

export const UserDeleteButton = styled(BottomButton)`
  border: 1px solid ${palette.red500};
  color: ${palette.red500};
  width: 120px;

  &:hover {
    background: ${palette.red100};
    cursor: pointer;
  }
`;

export const SaveButton = styled(BottomButton)`
  border: none;
  background: ${palette.blue500};
  color: ${palette.white300};

  &:hover {
    background: ${palette.blue700};
    cursor: pointer;
  }
`;
