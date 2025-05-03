import styled from 'styled-components';
import palette from '@constants/styles';

export const Container = styled.div`
  position: relative;
  background: ${palette.white300};
  flex-shrink: 1;
  width: 100%;
  z-index: 8;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  padding: 0px 10px;
  width: calc(100% - 20px);
  height: 100%;
  z-index: 8;
`;

export const Map = styled.iframe`
  position: absolute;
  margin: 0;
  border: 0;
  border-radius: 0px;
  width: 100%;
  height: 300px;
`;

export const RoadViewButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isRoadView',
})`
  position: absolute;
  background-color: ${({ isRoadView }) => (isRoadView ? palette.gray700 : palette.white500)};
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3));
  color: ${({ isRoadView }) => (isRoadView ? palette.white500 : palette.gray700)};
  border: 0;
  border-radius: 6px;
  top: 56px;
  right: 12px;
  width: 36px;
  height: 36px;
  z-index: 10;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ isRoadView }) => (isRoadView ? palette.gray900 : palette.gray300)};
    cursor: pointer;
  }
`;

export const LikeButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLike',
})`
  position: absolute;
  background-color: ${({ isLike }) => (isLike ? palette.gray700 : palette.white500)};
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3));
  color: ${({ isLike }) => (isLike ? palette.white500 : palette.gray700)};
  border: 0;
  border-radius: 6px;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  z-index: 10;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ isLike }) => (isLike ? palette.gray900 : palette.gray300)};
    cursor: pointer;
  }
`;

export const RegisterButton = styled.button`
  position: absolute;
  background: ${palette.white500};
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3));
  border: 0;
  border-radius: 6px;
  padding-left: 14px;
  padding-right: 14px;
  top: 256px;
  right: 12px;
  min-width: 100px;
  width: auto;
  height: 36px;
  z-index: 10;
  text-align: center;
  font-size: 13px;
  color: ${palette.black500};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${palette.gray300};
    cursor: pointer;
  }
`;

export const LikeCountText = styled.span`
  position: relative;
  margin-top: 304px;
  margin-bottom: 20px;
  margin-left: 12px;
  width: 100%;
  text-align: left;
  font-size: 15px;
  color: ${palette.gray500};
`;

export const DivLine = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid ${palette.gray500};
  width: 100%;
`;

export const TinyDivLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid ${palette.gray500};
  width: 90%;
`;

export const AddressText = styled.span`
  position: relative;
  margin-top: 4px;
  margin-bottom: 10px;
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 22px;
  color: ${palette.black500};
`;

export const LandPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  width: 100%;
`;

export const LandPriceText = styled.span`
  margin-top: 0px;
  position: relative;
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 24px;
  color: ${palette.red500};
`;

export const LandPricePerText = styled.span`
  margin-top: 4px;
  position: relative;
  text-align: center;
  font-size: 14px;
  color: ${palette.red500};
`;

export const ViewLandReportButton = styled.button`
  background: ${palette.blue500};
  margin-top: 20px;
  margin-bottom: 10px;
  border: 0;
  border-radius: 8px;
  padding: 0px 20px;
  width: 100%;
  height: 62px;
  text-align: center;
  font-size: 18px;
  color: ${palette.white300};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background: ${palette.blue700};
    cursor: pointer;
  }
`;

// 토지정보의 작은 텍스트
export const MiniText = styled.span`
  position: relative;
  text-align: center;
  font-size: 12px;
  color: ${palette.black500};
`;

export const TitleText = styled.span`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 4px;
  width: 100%;
  text-align: left;
  font-family: 'kumap-bold';
  font-size: 20px;
  color: ${palette.black500};
`;

export const SubTitleText = styled.span`
  position: relative;
  width: 100%;
  text-align: left;
  font-family: 'kumap-bold';
  font-size: 18px;
  color: ${palette.black500};
`;
