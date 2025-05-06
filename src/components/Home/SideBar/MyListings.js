import { useDispatch } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { LuRefreshCcw } from 'react-icons/lu';

import palette from '@constants/styles';
import { setCurrentLandAddress } from '@store/actions/land';
import * as Styled from '@styles/Home/SideBar.styles';
import { numberFormat } from '@utils/formatter';

function MyListings({ myListingList, setCurrentPage, fetchListingData }) {
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

  const navigateToListingLand = (land) => {
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
        <Styled.CategoryText>나의 매물</Styled.CategoryText>
        <Styled.RefreshButton onClick={fetchListingData}>
          <LuRefreshCcw size={16} />
        </Styled.RefreshButton>
      </div>
      {myListingList.length === 0 ? (
        <Styled.LandNavigateText>내 매물이 존재하지 않습니다.</Styled.LandNavigateText>
      ) : (
        myListingList.map((listing) => {
          return (
            <Styled.LandNavigateButton onClick={() => navigateToListingLand(listing)}>
              [{checkLandType(listing)}]<br />
              <Styled.LandNavigateText>
                {listing?.address?.fulladdr}
                <br />
              </Styled.LandNavigateText>
              <Styled.LandNavigateHighlightText>
                예측가: {numberFormat(listing?.detail?.land_area * listing?.predicted_price)}원
              </Styled.LandNavigateHighlightText>
              <Styled.LandNavigateHighlightText style={{ color: palette.blue500 }}>
                <br />
                매매가: {numberFormat(listing?.listing?.price)}원
              </Styled.LandNavigateHighlightText>
            </Styled.LandNavigateButton>
          );
        })
      )}
    </Styled.BottomPanel>
  );
}

export default MyListings;
