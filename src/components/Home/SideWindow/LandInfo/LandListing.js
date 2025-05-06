import React from 'react';
import { FaCalendarAlt, FaRulerCombined, FaWonSign, FaPen } from 'react-icons/fa';

import palette from '@constants/styles';
import * as PStyled from '@styles/Home/LandInfo.styles';
import * as Styled from '@styles/Home/LandListing.styles';

const LandListing = ({ data }) => {
  if (data?.listing === null) {
    return <></>;
  } else {
    return (
      <>
        <PStyled.DivLine />
        <Styled.Row>
          <Styled.InfoBox>
            <Styled.Label>
              <FaCalendarAlt color={palette.black500} /> 매물 등록일자
            </Styled.Label>
            <Styled.Value>{new Date(data?.listing?.reg_date).toLocaleDateString('ko-KR')}</Styled.Value>
          </Styled.InfoBox>
          <Styled.VDivLine />
          <Styled.InfoBox>
            <Styled.Label>
              <FaRulerCombined color={palette.black500} /> 매물 면적
            </Styled.Label>
            <Styled.Value>{data?.listing?.area}m²</Styled.Value>
          </Styled.InfoBox>
        </Styled.Row>

        <Styled.HDivLine />

        <Styled.Row>
          <Styled.Label>
            <FaWonSign color={palette.black500} /> 매물 가격
          </Styled.Label>
          <Styled.PriceValue>{Math.floor(data?.listing?.price).toLocaleString('ko-KR')}원</Styled.PriceValue>
        </Styled.Row>

        <Styled.HDivLine />

        <Styled.Row>
          <Styled.InfoBox>
            <Styled.Label>
              <FaPen color={palette.black500} /> 매물 설명
            </Styled.Label>
            <Styled.SummaryContainer>{data?.listing?.summary}</Styled.SummaryContainer>
          </Styled.InfoBox>
        </Styled.Row>
      </>
    );
  }
};

export default LandListing;
