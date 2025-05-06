import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { LuMenu } from 'react-icons/lu';
import { IoCloseOutline } from 'react-icons/io5';
import { getFavoriteLand, getUserListingList } from '@api/user';
import palette from '@constants/styles';
import { useModal } from '@providers/ModalProvider';
import * as Styled from '@styles/Home/SideBar.styles';
import Guest from './Guest';
import User from './User';
import MyFavorite from './MyFavorite';
import MyListings from './MyListings';

function SideBar({ width = 320 }) {
  const isUserLogin = useSelector((state) => state.auth.isUserLogin);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [xPos, setX] = useState(0);
  const side = useRef();
  const [currentPage, setCurrentPage] = useState('main');
  const [myFavoriteLandList, setMyFavoriteLandList] = useState([]);
  const [myListingList, setMyListingList] = useState([]);
  const modal = useModal();

  useEffect(() => {
    if (isUserLogin) {
      // TODO: 관심목록 받아오기
      fetchFavoriteData();
      fetchListingData();
      setMyFavoriteLandList([]);
    }
  }, [isUserLogin]);

  const fetchFavoriteData = async () => {
    const response = await getFavoriteLand();
    setMyFavoriteLandList(response.data);
  };

  const fetchListingData = async () => {
    const response = await getUserListingList();
    setMyListingList(response.data);
  };

  const toggleMenu = () => {
    if (xPos < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    toast.success('로그아웃되었습니다.');
    window.location.replace('/');
  };

  return (
    <Styled.Container>
      <Styled.OpenButton onClick={toggleMenu}>
        <LuMenu size={32} />
      </Styled.OpenButton>
      <Styled.Panel ref={side} style={{ width: `${width}px`, height: '100%', transform: `translatex(${-xPos}px)` }}>
        <>
          <Styled.TopPanel>
            <Styled.CloseButton onClick={toggleMenu}>
              <IoCloseOutline size={32} />
            </Styled.CloseButton>
          </Styled.TopPanel>
          {!isUserLogin ? (
            <Guest />
          ) : (
            <>
              <Styled.MiddlePanel>
                <div style={{ display: 'flex', width: '100%', marginTop: '6px' }}>
                  <Styled.UserImage src={currentUser.image} />
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                      <Styled.UserNameText>{currentUser?.nickname}</Styled.UserNameText>
                      <BsFillPersonBadgeFill
                        size={18}
                        color={currentUser.phoneVerified ? palette.blue500 : palette.red500}
                        style={{ marginTop: '33px' }}
                      />
                    </div>
                    <Styled.UserEmailText>{currentUser?.email}</Styled.UserEmailText>
                    <br />
                  </div>
                </div>
                <div style={{ width: '80%', marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                  <Styled.TextButton onClick={() => modal.modifyUserInfo()}>회원정보 수정</Styled.TextButton>
                  <Styled.TextButton onClick={handleLogout}>로그아웃</Styled.TextButton>
                </div>
              </Styled.MiddlePanel>
              {currentPage === 'main' && <User setCurrentPage={setCurrentPage} />}
              {currentPage === 'myFavorite' && (
                <MyFavorite
                  myFavoriteLandList={myFavoriteLandList}
                  setCurrentPage={setCurrentPage}
                  fetchFavoriteData={fetchFavoriteData}
                />
              )}
              {currentPage === 'myListings' && (
                <MyListings
                  myListingList={myListingList}
                  setCurrentPage={setCurrentPage}
                  fetchListingData={fetchListingData}
                />
              )}
            </>
          )}
        </>
      </Styled.Panel>
    </Styled.Container>
  );
}

export default SideBar;
