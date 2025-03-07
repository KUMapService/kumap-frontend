import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { LuRefreshCcw } from 'react-icons/lu';
import { numberFormat } from '@utils/formatter';
import * as Styled from '@styles/Home/SideBar.styles';
import palette from '@constants/styles';

function MySales({ setCurrentPage }) {
  const isUserLogin = useSelector((state) => state.auth.isUserLogin);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [mySaleList, setMySaleList] = useState([]);
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
      setMySaleList([]);
    }
    setRefresh(false);
  }, [isUserLogin, refresh]);

  return (
    <Styled.BottomPanel>
      <div style={{ display: 'flex' }}>
        <Styled.BackButton onClick={() => setCurrentPage('main')}>
          <IoIosArrowBack size={21} style={{ marginTop: '-2px', marginLeft: '-2px' }} />
        </Styled.BackButton>
        <Styled.CategoryText>나의 매물</Styled.CategoryText>
        <Styled.RefreshButton onClick={() => setRefresh(true)}>
          <LuRefreshCcw size={16} />
        </Styled.RefreshButton>
      </div>
      {mySaleList.length === 0 ? (
        <Styled.LandNavigateText>내 매물이 존재하지 않습니다.</Styled.LandNavigateText>
      ) : (
        mySaleList.map((mysale) => {
          return (
            <Styled.LandNavigateButton onClick={() => LandLoad(mysale.lat, mysale.lng)}>
              [{LandType(mysale)}]<br />
              <Styled.LandNavigateText>
                {mysale.addr}
                <br />
              </Styled.LandNavigateText>
              <Styled.LandNavigateHighlightText>
                예측가: {numberFormat(mysale.land_area * mysale.predict_land_price)}원
              </Styled.LandNavigateHighlightText>
              <Styled.LandNavigateHighlightText style={{ color: palette.blue500 }}>
                <br />
                매매가: {numberFormat(mysale.sale_data.land_price)}원
              </Styled.LandNavigateHighlightText>
            </Styled.LandNavigateButton>
          );
        })
      )}
    </Styled.BottomPanel>
  );
}

export default MySales;
