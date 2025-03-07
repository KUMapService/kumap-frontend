const { kakao } = window;

import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import palette from '@constants/styles';
import * as Styled from '@styles/Home/TopBar.styles';
import { fetchAutoCompleteAddress, getPNU } from 'api/geo';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const TopBar = () => {
  const dispatch = useDispatch();
  // 지번 검색 관련 변수
  const [addrSearch, setAddrSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const addrInput = useRef();
  const relatedSearchBoxRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetchAutoCompleteAddress({ query: addrSearch });
        setSuggestions(response.related_search);
      } catch (error) {
        toast.error('문제가 발생했습니다.');
      }
    };

    if (addrSearch !== '') {
      fetchAddress();
    } else {
      setSuggestions([]);
    }
  }, [addrSearch]);

  const handleRelateSearchItemClick = async (lat, lng) => {
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    await getPNU(dispatch, { lat: lat, lng: lng });
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      var geoCoder = new kakao.maps.services.Geocoder();
      var callback = async function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
          await getPNU(dispatch, { lat: latlng.getLat(), lng: latlng.getLng() });
        }
      };
      geoCoder.addressSearch(addrInput.current.value, callback);
    }
  };

  const handleClickOutside = (e) => {
    // RelatedSearchBox 외부 클릭 시 관련 검색어 숨기기
    if (
      relatedSearchBoxRef.current &&
      !relatedSearchBoxRef.current.contains(e.target) &&
      !addrInput.current.contains(e.target)
    ) {
      setIsFocused(false);
    }
  };

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
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleEnterKey}
          placeholder="건물명, 지번, 도로명 검색"
        />
        <FaSearch size={25} color={palette.gray500} style={{ marginLeft: '-32px' }} />
      </Styled.AddressSearchBarContainer>
      {isFocused && (
        <Styled.RelatedSearchBox ref={relatedSearchBoxRef}>
          {suggestions.length > 0 ? (
            suggestions.map((term, index) => (
              <Styled.RelatedSearchItem key={index} onClick={() => handleRelateSearchItemClick(term.lat, term.lng)}>
                {term.address} <br />
                {term.road_address}
              </Styled.RelatedSearchItem>
            ))
          ) : (
            <Styled.RelatedSearchItem>연관 검색내역이 없습니다.</Styled.RelatedSearchItem>
          )}
        </Styled.RelatedSearchBox>
      )}
    </Styled.Container>
  );
};

export default TopBar;
