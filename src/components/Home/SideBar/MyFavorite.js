import { LuMenu } from 'react-icons/lu';
import * as Styled from '@styles/Home/SideBar.styles';

function MyFavorite({ myFavoriteLandList = [] }) {
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
        <Styled.CategoryText>나의 관심 목록</Styled.CategoryText>
        <Styled.RefreshButton onClick={() => setRefresh(true)} />
      </div>
      {myFavoriteLandList.length === 0 ? (
        <Styled.LandNavigateText>내 관심목록이 존재하지 않습니다.</Styled.LandNavigateText>
      ) : (
        myFavoriteLandList.map((favorite, index) => {
          return (
            <Styled.LandNavigateButton onClick={() => LoadLand(favorite.lat, favorite.lng)}>
              [{LandType(favorite)}]<br />
              <Styled.LandNavigateText>
                {favorite.addr}
                <br />
              </Styled.LandNavigateText>
              <Styled.LandNavigateHighlightText>
                예측가: {NumberFormat(favorite.land_area * favorite.predict_land_price)}원
              </Styled.LandNavigateHighlightText>
              {LandType(favorite) === '경매' ? (
                <Styled.LandNavigateHighlightText style={{ color: '#0067a3' }}>
                  <br />
                  경매가: {NumberFormat(favorite.bid_data.case_info.minimum_sale_price)}원
                </Styled.LandNavigateHighlightText>
              ) : (
                LandType(favorite) === '매물' && (
                  <Styled.LandNavigateHighlightText style={{ color: '#0067a3' }}>
                    <br />
                    매매가: {NumberFormat(favorite.sale_data.land_price)}원
                  </Styled.LandNavigateHighlightText>
                )
              )}
            </Styled.LandNavigateButton>
          );
        })
      )}
    </Styled.BottomPanel>
  );
}

export default MyFavorite;
