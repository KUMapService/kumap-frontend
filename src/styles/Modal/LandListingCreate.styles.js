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
  max-width: 680px;
  height: auto;
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
  margin: 18px;
  text-align: center;
  font-size: 32px;
  color: ${palette.black500};
  cursor: pointer;
`;

export const TitleText = styled.h2`
  margin: 5px 0px;
  text-align: center;
  text-decoration: none;
  font-family: 'kumap-bold';
  font-size: 24px;
  color: ${palette.black500};
`;

export const SubtitleText = styled.h2`
  margin: 6px 0px;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  color: ${palette.black500};
`;

export const ContentText = styled.span`
  display: block;
  margin-top: 6px;
  margin-bottom: 6px;
  text-align: left;
  text-decoration: none;
  font-size: 18px;
  color: ${palette.black500};
`;

export const Checkbox = styled.input`
  position: relative;
  margin: 10px 0px;
  width: 24px;
  height: 24px;
`;
export const CheckboxText = styled.span`
  position: relative;
  display: block;
  width: 200px;
  margin-top: 12px;
  margin-left: 10px;
  text-align: left;
  text-decoration: none;
  font-size: 15px;
  color: ${palette.red500};
`;

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 400px;

  &::before {
    content: '';
    background-color: ${palette.gray300};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: -1;
  }
`;

export const Progress = styled.div`
  background-color: ${palette.blue300};
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 0%;
  z-index: -1;
  transition: 0.4s ease;
`;

export const Circle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})`
  background-color: ${palette.white500};
  color: #999;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid ${(props) => (props.isActive ? palette.blue300 : palette.gray300)};
  transition: 0.4s ease;
  text-align: center;
  text-decoration: none;
  font-family: 'kumap-bold';
  font-size: 15px;
  color: ${(props) => (props.isActive ? palette.blue300 : palette.gray300)};
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

export const NextButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isDisable',
})`
  background-color: ${(props) => (props.isDisable ? palette.gray300 : palette.blue300)};
  color: #fff;
  border: 0;
  border-radius: 6px;
  margin: 5px 0px;
  bottom: 20px;
  width: 100%;
  height: 42px;
  font-family: 'kumap-bold';
  font-size: 18px;
  cursor: ${(props) => (props.isDisable ? 'not-allowed' : 'pointer')};
  transition: background 0.3s ease-in-out;

  &:focus {
    outline: 0;
  }

  &:hover {
    background: ${(props) => !props.isDisable && palette.blue500};
  }
`;

export const PrevButton = styled(NextButton)`
  background-color: ${(props) => (props.isDisable ? palette.gray300 : palette.gray500)};

  &:hover {
    background: ${(props) => !props.isDisable && palette.gray700};
  }
`;

export const LandInput = styled.input`
  background: transparent;
  width: auto;
  min-width: 104px;
  height: 20px;
  border: 0;
  border-bottom: 2px solid ${palette.gray500};
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 2px 4px;
  font-size: 18px;
  font-family: 'kumap-bold';
  color: ${palette.black500};
  transition: border 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${palette.blue500};
  }
`;

export const UnitText = styled.span`
  margin-top: 11px;
  margin-left: 4px;
  font-size: 18px;
  font-family: 'kumap-bold';
  color: ${palette.black500};
`;

export const LandSummaryInput = styled.textarea`
  background: rgba(236, 236, 236, 1);
  width: 556px;
  height: 84px;
  border: none;
  border-radius: 6px;
  margin-top: 10px;
  resize: none;
  padding: 10px;
  font-size: 18px;
  color: ${palette.black500};
`;

export const LandSummaryCountText = styled.span`
  display: block;
  width: 576px;
  text-align: right;
  font-size: 15px;
  color: rgba(127, 127, 127, 1);
`;
