import React from 'react';
import * as Styled from '@styles/Home/Home.styles';
import KakaoMap from './KakaoMap';
import SideWindow from './SideWindow';

export const HomePage = () => {
  return (
    <div>
      <Styled.InnerContainer>
        <KakaoMap />
        <SideWindow />
      </Styled.InnerContainer>
    </div>
  );
};
