import styled from 'styled-components';
import palette from '@constants/styles';

export const FeatureText = styled.span`
  position: relative;
  width: 100%;
  margin-bottom: 4px;
  text-align: left;
  font-size: 15px;
  color: ${palette.blackL};
`;

export const FeatureRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  width: 100%;
`;

export const FeatureBox = styled.div`
  position: relative;
  background-color: ${palette.white300};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${palette.gray500};
  border-radius: 5px;
  padding: 15px 20px;
  width: 100%;
  height: auto;
`;

export const DealList = styled.table`
  width: ${(props) => (props.isMobile ? '91vw' : '442px')};
  border-collapse: collapse;
`;

export const DealListTH = styled.th`
  border-bottom: 2px solid rgba(204, 204, 204, 1);
  padding-top: 5px;
  padding-bottom: 5px;

  text-align: center;
  font-family: 'SC Dream 6';
  font-weight: normal;
  font-size: ${(props) => (props.isMobile ? '10px' : '12px')};
  color: #767676;
`;

export const DealListTD = styled.td`
  border-bottom: 2px solid rgba(204, 204, 204, 1);
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  font-weight: normal;
  font-size: 10px;
  color: rgba(118, 118, 118, 1);
`;
