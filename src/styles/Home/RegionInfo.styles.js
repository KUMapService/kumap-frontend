import styled from 'styled-components';
import palette from '@constants/styles';

// 사이드 윈도우 스타일
const Container = styled.div`
  position: relative;
  background: rgba(250, 250, 250, 1);

  flex-shrink: 1;
  width: ${(props) => (props.isMobile ? '100vw' : '500px')};
  height: calc(100% - 50px);

  z-index: ${(props) => (props.isMobile ? '100' : '8')};
`;

// 사이드윈도우에 표시될 컨텐츠
const Content = styled.div`
  position: relative;
  background: rgba(250, 250, 250, 1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;

  width: 100%;
  height: 100%;
  z-index: 8;
`;
const NoResultsText = styled.h1`
  margin-top: 200px;
  text-align: center;
  font-family: 'SC Dream 4';
  font-size: 15px;
  color: ${palette.grayB};
`;

// 토지정보의 주소
const CenterAddrText = styled.span`
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;

  text-align: left;
  font-family: 'SC Dream 6';
  font-size: ${(props) => (props.isMobile ? '18px' : '20px')};
  color: #343a40;
`;

// 토지정보 표시 시 보여줄 지도
const RegionButton = styled.button`
  position: relative;
  background-color: transparent;
  margin-top: 10px;
  padding: 0;

  border: 2px solid #cecece;
  border-radius: 10px;

  justify-content: center;

  width: 90%;
  min-height: 135px;

  cursor: pointer;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const AddrText = styled.span`
  display: flex;
  align-items: center;
  width: 235px;
  padding: 15px;
  border-right: 1px solid #cecece;
  text-align: left;
  font-family: 'SC Dream 6';
  font-size: 15px;
  color: ${palette.blackB};
`;

const RegionContent = styled.div`
  display: flex;
  margin-top: 0px;
  padding-left: 22px;
  padding-top: 1px;

  width: 100%;
  height: 135px;

  text-align: left;
  font-family: 'SC Dream 6';
  font-size: 15px;
  color: #495057;
`;

const RegionPriceTitle = styled.span`
  text-align: left;
  font-family: 'SC Dream 6';
  font-size: 10px;
  color: #868e96;
`;

const RegionPriceContent = styled.div`
  margin-top: 8px;
  border-bottom: 1px solid #cecece;
  padding-left: 22px;
  padding-top: 1px;

  width: 120px;
  height: 56px;

  text-align: left;
  font-family: 'SC Dream 6';
  font-size: 15px;
  color: #495057;
`;

// 토지정보의 작은 텍스트
const LandInfoMiniText = styled.span`
  position: relative;

  text-align: center;
  font-family: 'SC Dream 4';
  font-size: 12px;
  color: #343a40;
`;

// 토지의 가격
const LandInfoPriceText = styled.span`
  margin-top: 0px;
  position: relative;
  text-align: center;
  font-family: 'SC Dream 6';
  font-size: ${(props) => (props.isMobile ? '20px' : '24px')};
  color: rgba(255, 99, 99, 1);
`;
