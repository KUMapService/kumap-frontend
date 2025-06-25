import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { setCurrentLandAddress } from '@store/actions/land';
import { LAND_TYPE } from '@constants/map';
import palette from '@constants/styles';
import { numberFormat } from '@utils/formatter';
import * as Styled from '@styles/Home/ListingList.styles';

const ClustererInfo = () => {
  const dispatch = useDispatch();
  const landAddress = useSelector((state) => state.land.currentLandAddress);

  function handleRegionPageOpen(idx) {
    const land = {
      type: LAND_TYPE.REGION_LAND_UNLOAD,
      addr: landAddress.region[idx],
      pnu: landAddress.pnu[idx],
    };
    dispatch(setCurrentLandAddress(land));
  }

  // 조건부 렌더링
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.CenterAddressText>주변 지역 정보</Styled.CenterAddressText>

        {landAddress.pnu.length === 0 ? (
          <NoResultsText>조건에 맞는 검색 결과가 없습니다.</NoResultsText>
        ) : (
          landAddress.pnu.map((pnu, i) => (
            <RegionCard onClick={() => handleRegionPageOpen(i)}>
              <RegionContent>
                <div>
                  <AddrText>{landAddress.region[i]}</AddrText>
                  <RegionPriceText>
                    평균 토지 예측가: {landAddress.price[i] != 0 ? numberFormat(Math.floor(landAddress.price[i])) : '-'}
                    원
                  </RegionPriceText>
                </div>
                <RatioCard
                  style={
                    landAddress.ratio[i] > 100
                      ? { backgroundColor: palette.red100, border: '0' }
                      : { backgroundColor: palette.blue100, border: '0' }
                  }
                >
                  <RegionRatioText>공시지가의</RegionRatioText>
                  <br />
                  {landAddress.ratio[i] != 0 ? landAddress.ratio[i] : '-'}%
                </RatioCard>
              </RegionContent>
            </RegionCard>
          ))
        )}
        <div style={{ marginBottom: '50px' }} />
      </Styled.Content>
    </Styled.Container>
  );
};

const NoResultsText = styled.h1`
  margin-top: 200px;
  text-align: center;
  font-size: 15px;
  color: ${palette.grayB};
`;

// 토지정보 표시 시 보여줄 지도
const RegionCard = styled.button`
  position: relative;
  background-color: transparent;
  margin-top: 10px;
  padding: 0px 30px;

  border: 2px solid ${palette.gray300};
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  justify-content: center;

  width: 95%;
  min-height: 135px;

  cursor: pointer;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const AddrText = styled.span`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 20px;
  color: ${palette.black500};
`;

const RegionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  text-align: left;
  font-size: 15px;
  color: #495057;
`;

const RegionPriceText = styled.span`
  text-align: left;
  font-size: 12px;
  color: #868e96;
`;

const RegionRatioText = styled.span`
  text-align: left;
  font-size: 10px;
  color: #868e96;
`;

const RatioCard = styled.div`
  background: ${palette.blue100};
  padding: 8px 16px;
  border-radius: 12px;
  width: auto;
  height: auto;
  font-size: 14px;
`;

export default ClustererInfo;
