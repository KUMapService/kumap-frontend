import { useDispatch } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { LuRefreshCcw } from 'react-icons/lu';
import { numberFormat } from '@utils/formatter';
import * as Styled from '@styles/Home/SideBar.styles';
import palette from '@constants/styles';

import { setCurrentLandAddress } from '@store/actions/land';

function MyFavorite({ myFavoriteLandList, setCurrentPage, fetchFavoriteData }) {
  // global variables
  const dispatch = useDispatch();

  const checkLandType = (land) => {
    console.log(land);
    if (land.auction !== null) {
      return '경매';
    } else if (land.listing !== null) {
      return '매물';
    } else {
      return '일반';
    }
  };

  const navigateToFavoriteLand = (land) => {
    dispatch(
      setCurrentLandAddress({
        pnu: land.pnu,
        address: land.address,
        lat: land.lat,
        lng: land.lng,
      }),
    );
  };

  return (
    <Styled.BottomPanel>
      <div style={{ display: 'flex' }}>
        <Styled.BackButton onClick={() => setCurrentPage('main')}>
          <IoIosArrowBack size={21} style={{ marginTop: '-2px', marginLeft: '-2px' }} />
        </Styled.BackButton>
        <Styled.CategoryText>나의 관심 목록</Styled.CategoryText>
        <Styled.RefreshButton onClick={fetchFavoriteData}>
          <LuRefreshCcw size={16} />
        </Styled.RefreshButton>
      </div>
      {myFavoriteLandList.length === 0 ? (
        <Styled.LandNavigateText>내 관심목록이 존재하지 않습니다.</Styled.LandNavigateText>
      ) : (
        myFavoriteLandList.map((favorite) => {
          return (
            <Styled.LandNavigateButton onClick={() => navigateToFavoriteLand(favorite)}>
              [{checkLandType(favorite)}]<br />
              <Styled.LandNavigateText>
                {favorite?.address?.fulladdr}
                <br />
              </Styled.LandNavigateText>
              <Styled.LandNavigateHighlightText>
                예측가: {numberFormat(favorite?.detail?.land_area * favorite?.predicted_price)}
              </Styled.LandNavigateHighlightText>
              {checkLandType(favorite) === '경매' && (
                <Styled.LandNavigateHighlightText style={{ color: palette.blue500 }}>
                  <br />
                  경매가: {numberFormat(favorite.bid_data.case_info.minimum_sale_price)}원
                </Styled.LandNavigateHighlightText>
              )}
              {checkLandType(favorite) === '매물' && (
                <Styled.LandNavigateHighlightText style={{ color: palette.blue500 }}>
                  <br />
                  매매가: {numberFormat(favorite?.listing?.price)}원
                </Styled.LandNavigateHighlightText>
              )}
            </Styled.LandNavigateButton>
          );
        })
      )}
    </Styled.BottomPanel>
  );
}

export default MyFavorite;
