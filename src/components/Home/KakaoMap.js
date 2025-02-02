// using kakao map
const { kakao } = window;

import React, { useState, useEffect } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdOutlineMap } from 'react-icons/md';
import { MapContainer, MapButton } from '@styles/Home/KakaoMap/KakaoMap.styles';

import '@styles/Home/KakaoMap/KakaoMap.css';

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [isSkyView, setSkyView] = useState(false);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = () => {
    if (map) {
      return;
    }
    const lastViewLat = localStorage.getItem('last_view_lat');
    const lastViewLng = localStorage.getItem('last_view_lng');
    // 만약 값이 존재한다면 해당 위경도로 중심 좌표를 변경하고, 아니면 내가 임의로 지정한 좌표로 이동하게 돼.
    const initialCenter =
      lastViewLat && lastViewLng
        ? new kakao.maps.LatLng(lastViewLat, lastViewLng)
        : new kakao.maps.LatLng(37.536172, 126.976978);

    // 카카오맵의 기본 설정을 진행해. 줌 레벨은 3으로 할꺼야.
    const mapOptions = {
      center: initialCenter,
      level: 3,
    };
    // 새로운 카카오맵을 만들고, html은 id가 map으로 되어있는 요소와 연결해.
    const newMap = new kakao.maps.Map(document.getElementById('map'), mapOptions);
    setMap(newMap);
  };

  return (
    <MapContainer id="map">
      <MapButton number={1}>
        <BiCurrentLocation size="28" style={{ marginTop: '2px' }} />
      </MapButton>
      <MapButton number={2} toggle={isSkyView} type="map">
        <MdOutlineMap size="28" style={{ marginTop: '2px' }} />
      </MapButton>
      <MapButton number={3} toggle={true} type="bid">
        경매
      </MapButton>
      <MapButton number={4} toggle={true} type="sale">
        매물
      </MapButton>
    </MapContainer>
  );
};

export default KakaoMap;
