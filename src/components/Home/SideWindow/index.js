import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getLandData } from '@api/land';
import * as Styled from '@styles/Home/SideWindow.styles';
import LandDetail from './LandDetail';

const SideWindow = () => {
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);
  const [page, setPage] = useState('land-detail');
  const [landData, setLandData] = useState(null);

  useEffect(() => {
    if (!currentLandAddress) return;

    const fetchData = async () => {
      try {
        const data = await getLandData({ pnu: currentLandAddress?.pnu });
        setLandData({
          ...data.data,
          like: data.like,
        });
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [currentLandAddress]);
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
      {page === 'land-detail' && <LandDetail data={landData} />}
    </Styled.SideWindowContainer>
  );
};

export default SideWindow;
