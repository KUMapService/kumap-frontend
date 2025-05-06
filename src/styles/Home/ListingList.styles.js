import styled from 'styled-components';
import palette from '@constants/styles';

export const Container = styled.div`
  position: relative;
  background: ${palette.white300};
  flex-shrink: 1;
  width: 100%;
  height: 100%;
  z-index: 8;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  padding: 0px 10px;
  width: calc(100% - 20px);
  height: 100%;
  z-index: 8;
`;

export const CenterAddressText = styled.span`
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 22px;
  color: ${palette.black500};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 4px;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  gap: 6px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.black500};
  gap: 6px;
`;

export const Listings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 15px;
  overflow-x: hidden;
  overflow-y: auto;
  gap: 6px;
`;

export const ListingCard = styled.div`
  width: calc(90% - 20px);
  border: 1px solid ${palette.gray300};
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${palette.blue500};
    cursor: pointer;
  }

  div {
    font-size: 14px;
    color: ${palette.gray800};
    line-height: 1.4;
  }
`;

export const AddressText = styled.span`
  position: relative;
  font-family: 'kumap-bold';
  font-size: 18px;
  color: ${palette.black500};
`;

export const UserCard = styled.div`
  background: ${palette.blue100};
  padding: 5px 10px;
  border-radius: 12px;
  width: auto;
  height: auto;
  font-size: 14px;
`;

export const DateText = styled.span`
  position: relative;
  font-size: 14px;
  color: ${palette.gray700};
`;

export const PriceText = styled.span`
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-family: 'kumap-bold';
  font-size: 22px;
  color: ${palette.black500};
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
