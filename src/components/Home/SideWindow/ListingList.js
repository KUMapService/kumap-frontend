import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { toast } from 'react-toastify';

//import { Loading } from '@components/Loading';
//import palette from '@constants/styles';
//import { useModal } from '@providers/ModalProvider';
import { getListingList } from '@api/listing';
import { setCurrentLandAddress } from '@store/actions/land';
import * as Styled from '@styles/Home/ListingList.styles';
//import { addCommas } from '@utils/formatter';

const ListingList = () => {
  // global variables
  const dispatch = useDispatch();
  const centerAddress = useSelector((state) => state.land.centerAddress);
  const [listings, setListings] = useState([]);
  const [prevPnu, setPrevPnu] = useState('');
  const [total, setTotal] = useState(0);
  //const [page, setPage] = useState(1);

  const fetchData = async (pnuPrefix, page) => {
    const data = await getListingList({ pnu_prefix: pnuPrefix, page: page, size: 10 });
    setListings(data?.listings);
    setTotal(data?.total);
    console.log(data);
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

  useEffect(() => {
    if (centerAddress?.pnu !== prevPnu) {
      setPrevPnu(centerAddress?.pnu);
      fetchData(centerAddress?.pnu, 1);
    }
  }, [centerAddress]);

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.CenterAddressText>{centerAddress?.address} 매물</Styled.CenterAddressText>
        <Styled.Row>
          <Styled.InfoBox>총 {total}개</Styled.InfoBox>
          <Styled.InfoBox>매물</Styled.InfoBox>
        </Styled.Row>
        <Styled.Listings>
          {listings.length === 0 ? (
            <Styled.InfoBox>해당 지역에 매물이 없습니다.</Styled.InfoBox>
          ) : (
            listings.map((item, idx) => (
              <Styled.ListingCard key={idx} onClick={() => navigateToListingLand(item)}>
                <Styled.AddressText>{item?.address?.fulladdr}</Styled.AddressText>
                <div>
                  {item.price.toLocaleString()}원, {item.area}m²
                </div>
                <Styled.Row>
                  <Styled.DateText>등록일: {new Date(item.reg_date).toLocaleDateString('ko-KR')}</Styled.DateText>
                  <Styled.UserCard>등록자: {item.nickname}</Styled.UserCard>
                </Styled.Row>
              </Styled.ListingCard>
            ))
          )}
        </Styled.Listings>
      </Styled.Content>
    </Styled.Container>
  );
};

export default ListingList;
