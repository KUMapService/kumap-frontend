import styled from 'styled-components';
import palette from '@constants/styles';

// 매물 스타일

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 95%;
  gap: 4px;
`;

export const InfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

export const Value = styled.div`
  font-size: 19px;
  color: ${palette.black700};
`;

export const PriceValue = styled.div`
  font-size: 19px;
  color: ${palette.blue500};
`;

export const VDivLine = styled.hr`
  margin: 0 10px;
  border: 1px solid ${palette.gray300};
  height: 42px;
`;

export const HDivLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid ${palette.gray300};
  width: 100%;
`;

export const SummaryContainer = styled.div`
  background-color: ${palette.blue100};
  width: calc(100% - 20px);
  min-height: 50px;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  font-size: 17px;
  color: ${palette.black500};
`;
