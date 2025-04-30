import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getLandData } from '@api/land';
import DisplayAds from '@components/DisplayAds';
import * as Styled from '@styles/Home/SideWindow.styles';
import LandDetail from './LandDetail';
import { getLandPredictPrice } from 'api/land';

const SideWindow = () => {
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);
  const [page, setPage] = useState('land-detail');
  const [landData, setLandData] = useState(null);

  useEffect(() => {
    if (!currentLandAddress) return;
    const fetchData = async () => {
      try {
        const data = await getLandData({ pnu: currentLandAddress?.pnu });
        console.log(data);
        setLandData({
          ...data,
        });
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [currentLandAddress]);

  useEffect(() => {
    console.log(landData);
    if (!landData) return;
    const fetchData = async () => {
      try {
        const data = await getLandPredictPrice({ pnu: landData?.pnu });
        setLandData({
          ...landData,
          predicted_price: data?.predicted_price,
          last_predicted_price: data?.last_predicted_price,
        });
      } catch (error) {
        toast.error(error);
      }
    };
    if (!landData?.predicted_price) {
      fetchData();
    }
  }, [landData]);

  return (
    <Styled.SideWindowContainer>
      <Styled.TopMenu>
        <Styled.TopButton isChecked={page === 'land-detail'} onClick={() => setPage('land-detail')}>
          토지 정보
        </Styled.TopButton>
        <Styled.TopButton isChecked={page === 'auctions'} onClick={() => setPage('auctions')}>
          경매 목록
        </Styled.TopButton>
        <Styled.TopButton isChecked={page === 'listings'} onClick={() => setPage('listings')}>
          매물 목록
        </Styled.TopButton>
      </Styled.TopMenu>
      <Styled.Content>{page === 'land-detail' && <LandDetail data={landData} />}</Styled.Content>
      <Styled.Footer style={{ height: '100px' }}>
        {/* 구글 디스플레이 광고 삽입 */}
        <DisplayAds />
        {/*450x100*/}
      </Styled.Footer>
    </Styled.SideWindowContainer>
  );
};

export default SideWindow;
