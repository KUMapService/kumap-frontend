import React from 'react';
import * as Styled from '@styles/Home/Home.styles';
import KakaoMap from './KakaoMap';
import SideWindow from './SideWindow';
import TopBar from './TopBar';
import SideBar from './SideBar';

export const Home = () => {
  return (
    <div>
      <TopBar />
      <SideBar />
      <Styled.InnerContainer>
        <KakaoMap />
        <SideWindow />
      </Styled.InnerContainer>
    </div>
  );
};
