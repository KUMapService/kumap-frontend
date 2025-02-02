import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import palette from '@constants/styles';
import * as Styled from '@styles/Home/TopBar.styles';

const TopBar = () => {
  // 지번 검색 관련 변수
  const [addrSearch, setAddrSearch] = useState('');
  const addrInput = useRef();

  return (
    <Styled.Container>
      <Styled.ServiceTitleText>KUMap</Styled.ServiceTitleText>
      <Styled.AddressSearchBarContainer>
        <Styled.AddressSearchBar
          ref={addrInput}
          className="addr-search"
          type="text"
          value={addrSearch}
          onChange={(e) => setAddrSearch(e.target.value)}
          placeholder="지번 검색"
        />
        <FaSearch size={30} color={palette.gray500} style={{ marginLeft: '-32px' }} />
      </Styled.AddressSearchBarContainer>
    </Styled.Container>
  );
};

export default TopBar;
