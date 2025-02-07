import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMenu } from 'react-icons/lu';
import { IoCloseOutline } from 'react-icons/io5';
import * as Styled from '@styles/Home/SideBar.styles';
import Guest from './Guest';
import User from './User';
import MyFavorite from './MyFavorite';
import MySales from './MySales';

function SideBar({ width = 320 }) {
  const [isOpen, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [xPos, setX] = useState(0);
  const side = useRef();
  const isUserLogin = true;
  const currentUser = { user: 'test', email: 'test@test.com' };
  const [currentPage, setCurrentPage] = useState('main');

  const navigate = useNavigate();
  const toggleMenu = () => {
    if (xPos < 0) {
      setX(0);
      setOpen(false);
    } else {
      setX(-width);
      setIsHidden(false);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setIsHidden(true);
      }, 500); // 1초 지연
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

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
                <div style={{ display: 'flex' }}>
                  <Styled.UserImage />
                  <div>
                    <Styled.UserNameText>{currentUser?.user}</Styled.UserNameText>
                    <Styled.UserEmailText>{currentUser?.email}</Styled.UserEmailText>
                    <br />
                  </div>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                  <Styled.TextButton>회원정보 수정</Styled.TextButton>
                  <Styled.TextButton>로그아웃</Styled.TextButton>
                </div>
              </Styled.MiddlePanel>
              {currentPage === 'main' ? (
                <User setCurrentPage={setCurrentPage} />
              ) : currentPage === 'my-favorite' ? (
                <MyFavorite />
              ) : (
                <MySales />
              )}
            </>
          )}
        </>
        aaa
      </Styled.Panel>
    </Styled.Container>
  );
}

export default SideBar;
