import React from 'react';

import * as PStyled from '@styles/Home/LandInfo.styles';
import * as Styled from '@styles/Home/LandDetail.styles';

const LandDetail = ({ data }) => {
  return (
    <>
      {/* 토지 특성 정보 영역 */}
      <PStyled.TitleText>토지 기본 정보 (기준년도: {data?.detail?.stdr_year}년)</PStyled.TitleText>
      <Styled.FeatureRow>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>지목</PStyled.SubTitleText>
          <Styled.FeatureText>{data?.detail?.land_cls}</Styled.FeatureText>
        </Styled.FeatureBox>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>이용상황</PStyled.SubTitleText>
          <Styled.FeatureText>{data?.detail?.land_usage}</Styled.FeatureText>
        </Styled.FeatureBox>
      </Styled.FeatureRow>
      <Styled.FeatureRow>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>용도지역</PStyled.SubTitleText>
          <Styled.FeatureText>{data?.detail?.land_zoning}</Styled.FeatureText>
        </Styled.FeatureBox>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>면적</PStyled.SubTitleText>
          <Styled.FeatureText>{Math.floor(data?.detail?.land_area).toLocaleString('ko-KR')}m²</Styled.FeatureText>
        </Styled.FeatureBox>
      </Styled.FeatureRow>
      <Styled.FeatureRow>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>형상</PStyled.SubTitleText>
          <Styled.FeatureText>{data?.detail?.land_form}</Styled.FeatureText>
        </Styled.FeatureBox>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>지세</PStyled.SubTitleText>
          <Styled.FeatureText>{data?.detail?.land_height}</Styled.FeatureText>
        </Styled.FeatureBox>
      </Styled.FeatureRow>
      <Styled.FeatureRow>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>도로접면</PStyled.SubTitleText>
          <Styled.FeatureText>{data?.detail?.road_side}</Styled.FeatureText>
        </Styled.FeatureBox>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>공시지가</PStyled.SubTitleText>
          <Styled.FeatureText>{Math.floor(data?.detail?.official_price).toLocaleString('ko-KR')}원</Styled.FeatureText>
        </Styled.FeatureBox>
      </Styled.FeatureRow>
      <Styled.FeatureRow>
        <Styled.FeatureBox>
          <PStyled.SubTitleText>토지 이용 계획</PStyled.SubTitleText>
          <Styled.FeatureText>{data?.detail?.use_plan.replaceAll('/', ', ')}</Styled.FeatureText>
        </Styled.FeatureBox>
      </Styled.FeatureRow>
      <PStyled.DivLine />
      {/* 토지 매매 내역 리스트 */}
      <PStyled.TitleText>토지 실거래 내역</PStyled.TitleText>
      {data?.land_trade_list.length === 0 ? (
        <Styled.FeatureText style={{ marginTop: '80px', width: '450px', fontSize: '15px', textAlign: 'center' }}>
          주변 지역의 실거래 내역이 없습니다.
        </Styled.FeatureText>
      ) : (
        <Styled.DealList>
          <thead>
            <tr>
              <Styled.DealListTH style={{ width: '80px' }}>거래일자</Styled.DealListTH>
              <Styled.DealListTH>거래유형</Styled.DealListTH>
              <Styled.DealListTH>거래금액 (원)</Styled.DealListTH>
              <Styled.DealListTH>거래면적 (㎥)</Styled.DealListTH>
              <Styled.DealListTH>단가</Styled.DealListTH>
            </tr>
          </thead>
          <tbody>
            {data?.land_trade_list.map((deal, index) => {
              return (
                <tr key={index}>
                  <Styled.DealListTD>{deal.deal_year + deal.deal_month.padStart(2, '0')}</Styled.DealListTD>
                  <Styled.DealListTD>{deal.deal_type}</Styled.DealListTD>
                  <Styled.DealListTD>{Math.floor(deal.land_real_price).toLocaleString('ko-KR')}원</Styled.DealListTD>
                  <Styled.DealListTD>{Math.floor(deal.deal_area).toLocaleString('ko-KR')}m²</Styled.DealListTD>
                  <Styled.DealListTD>
                    {parseInt(deal.land_real_price / deal.deal_area).toLocaleString('ko-KR') + '원/m²'}
                  </Styled.DealListTD>
                </tr>
              );
            })}
          </tbody>
        </Styled.DealList>
      )}
    </>
  );
};

export default LandDetail;
