import { LuMenu } from 'react-icons/lu';
import * as Styled from '@styles/Home/SideBar.styles';

function MySales({ mySaleList = [] }) {
  const NumberFormat = (number) => {
    // 조 단위 포멧팅
    if (Math.floor(number / 1000000000000) !== 0) {
      return Math.floor(number / 1000000000000).toLocaleString('ko-KR') + '조';
    }
    // 억 단위 포멧팅
    else if (Math.floor(number / 100000000) !== 0) {
      return Math.floor(number / 100000000).toLocaleString('ko-KR') + '억';
    }
    // 만 단위 포멧팅
    else if (Math.floor(number / 10000) !== 0) {
      return Math.floor(number / 10000).toLocaleString('ko-KR') + '만';
    }
    // 그 외
    else {
      return Math.floor(number).toLocaleString('ko-KR');
    }
  };

  const LandType = (land) => {
    if (land.bid_data !== null) {
      return '경매';
    } else if (land.sale_data !== null) {
      return '매물';
    } else {
      return '일반';
    }
  };

  return (
    <Styled.BottomPanel>
      <div style={{ display: 'flex' }}>
        <Styled.BackButton onClick={() => setCurrPage('main')}></Styled.BackButton>
        <Styled.CategoryText>나의 매물</Styled.CategoryText>
        <Styled.RefreshButton onClick={() => setRefresh(true)} />
      </div>
      {mySaleList.length === 0 ? (
        <Styled.LandNavigateText>내 매물이 존재하지 않습니다.</Styled.LandNavigateText>
      ) : (
        mySaleList.map((mysale, index) => {
          return (
            <Styled.LandNavigateButton onClick={() => LoadLand(mysale.lat, mysale.lng)}>
              [{LandType(mysale)}]<br />
              <Styled.LandNavigateText>
                {mysale.addr}
                <br />
              </Styled.LandNavigateText>
              <Styled.LandNavigateHighlightText>
                예측가: {NumberFormat(mysale.land_area * mysale.predict_land_price)}원
              </Styled.LandNavigateHighlightText>
              <Styled.LandNavigateHighlightText style={{ color: '#0067a3' }}>
                <br />
                매매가: {NumberFormat(mysale.sale_data.land_price)}원
              </Styled.LandNavigateHighlightText>
            </Styled.LandNavigateButton>
          );
        })
      )}
    </Styled.BottomPanel>
  );
}

export default MySales;
