/*global kakao*/
import React, { useState, useRef, useEffect } from 'react';

import { getAddressData } from '@api/geo';
import * as Styled from '@styles/Home/AddressSearchBar.styles';

const AddressSearchBar = ({ map = null }) => {
  const [select, setSelect] = useState(0);
  // 주소 딕셔너리
  const [addressCategory, setAddressCategory] = useState({});
  // 시/도, 시/군/구, 읍/면/동에 해당하는 지번 리스트
  const [currentCategory, setCurrentCategory] = useState([]);
  // 현재 선택되어 있는 시/도
  const [currentSido, setCurrentSido] = useState('');
  // 현재 선택되어 있는 시/군/구
  const [currentSigungu, setCurrentSigungu] = useState('');
  // 현재 선택되어 있는 읍/면/동
  const [currentEupmyeondong, setCurrentEupmyeondong] = useState('');
  // 지도 좌표 이동 버튼 ref
  const addressButton = useRef();

  // 컴포넌트 생성 시 처음 한 번 실행
  useEffect(() => {
    getData();
  }, []);

  // 지도가 변경될 때 실행
  useEffect(() => {
    // 지도 객체가 생성되지 않았다면 리턴
    if (!map) {
      return;
    }

    // 검색 기능
    function SearchAddressToLatLng(address) {
      var geoCoder = new kakao.maps.services.Geocoder();

      var callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var bounds = new kakao.maps.LatLngBounds();

          bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));

          map.setBounds(bounds);
        }
      };
      geoCoder.addressSearch(address, callback);
    }

    function AddrSearch(addr) {
      var address = addr;
      SearchAddressToLatLng(address);
    }

    const onClickSearch = () => {
      AddrSearch(addressButton.current.value);
      setSelect(0);
    };

    addressButton.current.addEventListener('click', onClickSearch);
  }, [map]);

  const getData = async () => {
    const data = await getAddressData();
    setAddressCategory(data);
  };

  // 시/도, 시/군/구, 읍/면/동 에 따른 카테고리 리스트 변경 및 select 넘버 변경
  const HandlerAddressCategory = (type) => {
    if (select === type) {
      setSelect(0);
    } else {
      if (type === 3 && currentSigungu !== '') {
        setCurrentCategory(addressCategory[currentSido][currentSigungu]);
        setSelect(3);
      } else if (type === 2 && currentSido !== '') {
        setCurrentCategory(Object.keys(addressCategory[currentSido]));
        setSelect(2);
      } else {
        setCurrentCategory(Object.keys(addressCategory));
        setSelect(1);
      }
    }
  };

  // 시/도, 시/군/구, 읍/면/동 선택 시 (SelectButton 핸들러)
  const HandlerAddrSelect = (type, addr) => {
    if (type === 1) {
      // 현재 주소 변경
      setCurrentSido(addr);
      setCurrentSigungu('');
      setCurrentEupmyeondong('');
      // 카테고리 넘버 변경 (시군구(2))
      setSelect(2);
      // 카테고리 리스트 변경 (시군구)
      setCurrentCategory(Object.keys(addressCategory[addr]));
    } else if (type === 2) {
      // 현재 주소 변경
      setCurrentSigungu(addr);
      setCurrentEupmyeondong('');
      // 카테고리 넘버 변경 (시군구(2))
      setSelect(3);
      // 카테고리 리스트 변경 (읍면동)
      setCurrentCategory(addressCategory[currentSido][addr]);
    } else if (type === 3) {
      // 현재 주소 변경
      setCurrentEupmyeondong(addr);
    }
  };

  // 상단에 표기되는 주소 텍스트 포멧팅
  const CategoryText = (type) => {
    if (type === 3 && currentEupmyeondong !== '') {
      return currentSido + ' > ' + currentSigungu + ' > ' + currentEupmyeondong;
    } else if (type === 3 && currentSigungu !== '') {
      return currentSido + ' > ' + currentSigungu;
    } else if (type === 2 && currentSido !== '') {
      return currentSido;
    } else if (type === 1 && currentSido !== '') {
      return currentSido;
    } else {
      return '시/도';
    }
  };

  return (
    <Styled.Container>
      <Styled.TextButton onClick={() => HandlerAddressCategory(1)}>
        {currentSido !== '' ? currentSido : '시/도'}
      </Styled.TextButton>
      <Styled.VDivLine />
      <Styled.TextButton onClick={() => HandlerAddressCategory(2)}>
        {currentSigungu !== '' ? currentSigungu : '시/군/구'}
      </Styled.TextButton>
      <Styled.VDivLine />
      <Styled.TextButton onClick={() => HandlerAddressCategory(3)}>
        {currentEupmyeondong !== '' ? currentEupmyeondong : '읍/면/동'}
      </Styled.TextButton>
      <Styled.SelectDiv style={select === 0 ? { visibility: 'hidden' } : { visibility: 'visible' }}>
        <Styled.SelectTopText>{CategoryText(select)}</Styled.SelectTopText>
        <Styled.SelectGrid>
          {currentCategory.map((addr) => {
            return <Styled.SelectButton onClick={() => HandlerAddrSelect(select, addr)}>{addr}</Styled.SelectButton>;
          })}
        </Styled.SelectGrid>
        <Styled.ViewMapButton
          ref={addressButton}
          value={currentSido + ' ' + currentSigungu + ' ' + currentEupmyeondong}
        >
          지도로 보기
        </Styled.ViewMapButton>
      </Styled.SelectDiv>
    </Styled.Container>
  );
};

export default AddressSearchBar;
