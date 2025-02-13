import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NumberFormat } from '@utils/formatter';
import * as Styled from '@styles/Home/SideBar.styles';
import palette from '@constants/styles';

function MyFavorite({ setCurrentPage }) {
  const isUserLogin = useSelector((state) => state.auth.isUserLogin);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [myFavoriteLandList, setMyFavoriteLandList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const LandType = (land) => {
    if (land.bid_data !== null) {
      return '경매';
    } else if (land.sale_data !== null) {
      return '매물';
    } else {
      return '일반';
    }
  };

  const LandLoad = (land) => {
    console.log(land);
  };

  useEffect(() => {
    if (isUserLogin) {
      // TODO: 관심목록 받아오기
      console.log(currentUser);
      setMyFavoriteLandList([]);
    }
    setRefresh(false);
  }, [isUserLogin, refresh]);

  return (
    <Styled.BottomPanel>
      <div style={{ display: 'flex' }}>
        <Styled.BackButton onClick={() => setCurrentPage('main')}></Styled.BackButton>
        <Styled.CategoryText>나의 관심 목록</Styled.CategoryText>
        <Styled.RefreshButton onClick={() => setRefresh(true)} />
      </div>
      {myFavoriteLandList.length === 0 ? (
        <Styled.LandNavigateText>내 관심목록이 존재하지 않습니다.</Styled.LandNavigateText>
      ) : (
        myFavoriteLandList.map((favorite) => {
          return (
            <Styled.LandNavigateButton onClick={() => LandLoad(favorite.lat, favorite.lng)}>
              [{LandType(favorite)}]<br />
              <Styled.LandNavigateText>
                {favorite.addr}
                <br />
              </Styled.LandNavigateText>
              <Styled.LandNavigateHighlightText>
                예측가: {NumberFormat(favorite.land_area * favorite.predict_land_price)}원
              </Styled.LandNavigateHighlightText>
              {LandType(favorite) === '경매' ? (
                <Styled.LandNavigateHighlightText style={{ color: palette.blue500 }}>
                  <br />
                  경매가: {NumberFormat(favorite.bid_data.case_info.minimum_sale_price)}원
                </Styled.LandNavigateHighlightText>
              ) : (
                LandType(favorite) === '매물' && (
                  <Styled.LandNavigateHighlightText style={{ color: palette.blue500 }}>
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
