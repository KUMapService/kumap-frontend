// using kakao map
const { kakao } = window;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdOutlineMap } from 'react-icons/md';
import palette from '@constants/styles';
import { MapContainer, MapButton } from '@styles/Home/KakaoMap/KakaoMap.styles';
import '@styles/Home/KakaoMap/KakaoMap.css';
import { getCadastralMap, getPNU } from '@api/geo';
import { toast } from 'react-toastify';

const KakaoMap = () => {
  // global variables
  const dispatch = useDispatch();
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);
  // map variables
  const [map, setMap] = useState(null);
  const [isSkyView, setSkyView] = useState(false);
  // overlay marker variables
  const [cadastralMap, setCadastralMap] = useState([]);
  const [currentLandMarker, setCurrentLandMarker] = useState(null);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = () => {
    const lastViewLat = localStorage.getItem('last_view_lat');
    const lastViewLng = localStorage.getItem('last_view_lng');
    const initialCenter =
      lastViewLat && lastViewLng
        ? new kakao.maps.LatLng(lastViewLat, lastViewLng)
        : new kakao.maps.LatLng(37.536172, 126.976978);

    const mapOptions = {
      center: initialCenter,
      level: 3,
    };
    const newMap = new kakao.maps.Map(document.getElementById('map'), mapOptions);
    const newCustomOverlay = new kakao.maps.CustomOverlay({
      map: newMap,
      position: null,
      content: '',
      yAnchor: 0,
    });
    setMap(newMap);
    setCadastralMap([]);
    setCurrentLandMarker(newCustomOverlay);
  };

  useEffect(() => {
    if (!map) {
      return;
    }
    currentLandMarker.setMap(map);
    // add event listener
    kakao.maps.event.addListener(map, 'click', onMapClick);
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }
    cadastralMap.forEach((polygon) => {
      polygon.setMap(null);
    });

    // set current land marker
    const latlng = new kakao.maps.LatLng(currentLandAddress?.lat, currentLandAddress?.lng);
    var content = '';
    if (!currentLandAddress?.address?.eupmyeondong) {
      content = `<div class="custom-overlay"><span class="title">불러오는중...<br>`;
    } else {
      content = `<div class="custom-overlay"><span class="title">${
        currentLandAddress?.address?.eupmyeondong + ' ' + currentLandAddress?.address?.detail
      }<br>`;
    }
    currentLandMarker.setContent(content);
    currentLandMarker.setPosition(latlng);
    currentLandMarker.setMap(map);
    map.panTo(latlng);

    // renew cadastral map
    const fetchCadastralMap = async (pnu) => {
      try {
        const response = await getCadastralMap({ pnu: pnu });

        // 새로운 폴리곤 생성
        const newPolygons = [];
        for (var i = 0; i < response.polygons.length; i++) {
          for (var j = 0; j < response.polygons[i].length; j++) {
            for (var k = 0; k < response.polygons[i][j].length; k++) {
              var path = new Array();
              for (var l = 0; l < response.polygons[i][j][k].length; l++) {
                var polygonLatlng = new kakao.maps.LatLng(
                  response.polygons[i][j][k][l][1],
                  response.polygons[i][j][k][l][0],
                );
                path.push(polygonLatlng);
              }
              const polygon = new kakao.maps.Polygon({
                path,
                strokeWeight: 3,
                strokeColor: palette.blue500,
                strokeOpacity: 0.8,
                strokeStyle: 'solid',
                fillColor: palette.blue100,
                fillOpacity: 0.7,
              });
              polygon.setMap(map);
              newPolygons.push(polygon);
            }
          }
        }
        setCadastralMap(newPolygons);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCadastralMap(currentLandAddress?.pnu);
  }, [currentLandAddress]);

  const onMapClick = async (mouseEvent) => {
    if (map.getLevel() > 4) {
      return;
    }
    const latlng = mouseEvent.latLng;
    await getPNU(dispatch, { lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const moveToCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lng);
          // 지도 중심을 현재 위치로 설정
          map.setCenter(locPosition);
        },
        () => {
          toast.error('현재 위치를 가져오는 데 실패했습니다.');
        },
      );
    } else {
      toast.error('이 브라우저는 Geolocation을 지원하지 않습니다.');
    }
  };

  const changeMapType = () => {
    if (!map) {
      return;
    }

    if (isSkyView) {
      map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
      setSkyView(false);
    } else {
      map.setMapTypeId(kakao.maps.MapTypeId.SKYVIEW);
      setSkyView(true);
    }
  };

  return (
    <MapContainer id="map">
      <MapButton number={1} onClick={moveToCurrentPosition}>
        <BiCurrentLocation size="28" style={{ marginTop: '2px' }} />
      </MapButton>
      <MapButton number={2} isToggled={isSkyView} type="map" onClick={changeMapType}>
        <MdOutlineMap size="28" style={{ marginTop: '2px' }} />
      </MapButton>
      <MapButton number={3} isToggled={true} type="auction">
        경매
      </MapButton>
      <MapButton number={4} isToggled={true} type="listing">
        매물
      </MapButton>
    </MapContainer>
  );
};

export default KakaoMap;
