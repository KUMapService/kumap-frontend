import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { toast } from 'react-toastify';

//import { Loading } from '@components/Loading';
//import palette from '@constants/styles';
//import { useModal } from '@providers/ModalProvider';
import { getListingList } from '@api/listing';
import { setCurrentLandAddress } from '@store/actions/land';
import * as Styled from '@styles/Home/ListingList.styles';
//import { addCommas } from '@utils/formatter';
import Loading from '../../../components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLandAddress } from '@store/actions/land';
import { LAND_TYPES } from '../../../constants/enums';
import palette from '../../../constants/styles';

const RegionInfo = ({ isMobile = false }) => {
  const dispatch = useDispatch();
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);

  const handleLandPageOpen = (land) => {
    console.log(land);
    dispatch(
      setCurrentLandAddress({
        pnu: land.pnu,
        address: land.address,
        lat: land.lat,
        lng: land.lng,
      }),
    );
  };

  // 조건부 렌더링
  if (!isMobile) {
    return (
      <Container>
        {currentLandAddress.type === LAND_TYPES.REGION_LAND_UNLOAD ? (
          <Content>
            <Loading />
          </Content>
        ) : (
          <Content>
            <CenterAddrText>{currentLandAddress.address}</CenterAddrText>
            {currentLandAddress.avg_predict_land_price != 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LandInfoMiniText>예측된 토지: 총 {currentLandAddress.total_land_count}개</LandInfoMiniText>
                <br />

                <LandInfoMiniText>평균 토지 예측가: </LandInfoMiniText>
                <LandInfoPriceText
                  style={currentLandAddress.price_ratio > 100 ? { color: palette.red500 } : { color: palette.blue500 }}
                >
                  {Math.floor(currentLandAddress.avg_predict_land_price).toLocaleString('ko-KR')}원/m²당
                </LandInfoPriceText>
                <div>
                  <LandInfoMiniText>공시지가의 </LandInfoMiniText>
                  <LandInfoMiniText
                    style={
                      currentLandAddress.price_ratio > 100 ? { color: palette.red500 } : { color: palette.blue500 }
                    }
                  >
                    {currentLandAddress.price_ratio}%
                  </LandInfoMiniText>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LandInfoMiniText>예측된 토지: 총 {currentLandAddress.total_land_count}개</LandInfoMiniText>
                <br />
                <NoResultsText>예측된 토지가 존재하지 않습니다.</NoResultsText>
              </div>
            )}
            <br />
            {landAddress.land.map((land, i) => (
              <RegionButton onClick={() => handleLandPageOpen(land)}>
                <RegionContent>
                  <AddrText>{land.address.address}</AddrText>
                  <div style={{ display: 'flex-direction' }}>
                    <RegionPriceContent>
                      <RegionPriceTitle>토지 예측가</RegionPriceTitle>
                      <br />
                      {Math.floor(land.predict_land_price).toLocaleString('ko-KR')}
                    </RegionPriceContent>
                    <RegionPriceContent
                      style={
                        land.price_ratio > 100
                          ? { color: palette.red500, border: '0' }
                          : { color: palette.blue500, border: '0' }
                      }
                    >
                      <RegionPriceTitle>공시지가의</RegionPriceTitle>
                      <br />
                      {land.price_ratio}%
                    </RegionPriceContent>
                  </div>
                </RegionContent>
              </RegionButton>
            ))}
          </Content>
        )}

        <div style={{ marginBottom: '50px' }} />
      </Container>
    );
  }
};

export default RegionInfo;
