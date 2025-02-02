import React from 'react';
import * as Styled from '@styles/Home/Home.styles';
import KakaoMap from './KakaoMap';
import SideWindow from './SideWindow';
import TopBar from './TopBar';

export const HomePage = () => {
  return (
    <div>
      <TopBar />
      <Styled.InnerContainer>
        <KakaoMap />
        <SideWindow />
      </Styled.InnerContainer>
    </div>
  );
};
