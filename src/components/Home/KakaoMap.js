// using kakao map
const { kakao } = window;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdOutlineMap } from 'react-icons/md';
import { toast } from 'react-toastify';

import { getCadastralMap, getPNU } from '@api/geo';
import { getListingMarkerList } from '@api/listing';
import AddressSearchBar from '@components/Home/AddressSearchBar';
import palette from '@constants/styles';
import { setCurrentLandAddress } from '@store/actions/land';
import { MapContainer, MapButton } from '@styles/Home/KakaoMap/KakaoMap.styles';
import '@styles/Home/KakaoMap/KakaoMap.css';
import { numberFormat } from '@utils/formatter';

const KakaoMap = () => {
  // 전역 변수 관리
  const dispatch = useDispatch();
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);
  // 지도 변수
  const [map, setMap] = useState(null);
  const [isSkyView, setSkyView] = useState(false);
  const [isShowListingMarker, setShowListingMarker] = useState(true);
  // 오버레이 마커 및 폴리곤 변수
  const [cadastralMap, setCadastralMap] = useState([]);
  const [currentLandMarker, setCurrentLandMarker] = useState(null);
  const [listingMarker, setListingMarker] = useState({});
  // 그 외 변수
  const [listingMarkerData, setListingMarkerData] = useState([]); // 토지 매물 마커 데이터 (카카오맵 마커 X)
  const [isAlreadyMarkerExist, setAlreadyMarkerExist] = useState(false); // 해당 토지에 이미 마커가 있는지 확인하는 변수 (매물, 경매)

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
    // 이벤트 리스너 추가
    kakao.maps.event.addListener(map, 'click', onMapClick);
    kakao.maps.event.addListener(map, 'tilesloaded', onTilesLoaded);
    kakao.maps.event.addListener(map, 'zoom_changed', onZoomChanged);
    //
    return () => {
      kakao.maps.event.removeListener(map, 'click', onMapClick);
      kakao.maps.event.removeListener(map, 'tilesloaded', onTilesLoaded);
      kakao.maps.event.removeListener(map, 'zoom_changed', onZoomChanged);
    };
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }
    cadastralMap.forEach((polygon) => {
      polygon.setMap(null);
    });

    // 현재 토지 마커 표시
    if (!isAlreadyMarkerExist || !isShowListingMarker) {
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
    }
    setAlreadyMarkerExist(false);
    // 지적도 갱신
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

  // 타일이 로드될 떄 호출 이벤트 (줌 레벨 변경, 지도 위치 변경)
  const onTilesLoaded = async () => {
    // 중심 좌표 로드
    const latlng = map.getCenter();
    await getPNU(dispatch, { lat: latlng.getLat(), lng: latlng.getLng() }, map.getLevel());
    // 매물 마커 로드
    const bounds = map.getBounds(); // 카카오맵의 현재 보이는 영역
    const sw = bounds.getSouthWest(); // 남서쪽
    const ne = bounds.getNorthEast(); // 북동쪽
    if (sw !== null && ne !== null) {
      const marker = await getListingMarkerList({
        min_lat: sw.getLat(),
        min_lng: sw.getLng(),
        max_lat: ne.getLat(),
        max_lng: ne.getLng(),
      });
      setListingMarkerData(Object.values(marker));
    }
    // 마지막 중심 좌표 로컬 스토리지에 저장
    localStorage.setItem('last_view_lat', latlng.getLat());
    localStorage.setItem('last_view_lng', latlng.getLng());
  };

  // 줌 레벨이 변경된 후 호출 이벤트
  const onZoomChanged = () => {
    if (map.getLevel() > 4) {
      if (currentLandMarker) {
        for (var i = 0; i < cadastralMap.length; i++) {
          cadastralMap[i].setPath(null);
        }
        currentLandMarker.setMap(null);
      }
    }
    //dispatch(setMapZoomLevel(map.getLevel()));
  };

  // 맵 클릭 이벤트
  const onMapClick = async (mouseEvent) => {
    if (map.getLevel() > 4) {
      return;
    }
    const latlng = mouseEvent.latLng;
    await getPNU(dispatch, { lat: latlng.getLat(), lng: latlng.getLng() });
  };

  // 현재 위치로 이동 버튼 로직
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

  // 지도 타입 변경 함수 (스카이뷰, 일반 지도)
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

  // 매물 마커 생성
  useEffect(() => {
    if (!map) {
      return;
    }
    var marker = {};
    for (let i = 0; i < listingMarkerData.length; i++) {
      // 이미 폴리곤 데이터에 있을 경우 패스
      if (listingMarkerData[i]['pnu'] in listingMarker) {
        continue;
      }

      // var로 변수를 선언할 경우 클로저 문제가 발생.
      // 따라서 모든 변수들을 let으로 선언하여, 클로저 문제 해결
      // 이거 해결하느라 삽질 오만번 한듯
      let listingData = listingMarkerData[i];
      let pnu = listingData.pnu;
      let address = listingData.address;
      let lat = listingData.lat;
      let lng = listingData.lng;
      let price = String(listingData.price);
      let area = Math.floor(listingData.area).toLocaleString('ko-KR');
      let coords = new kakao.maps.LatLng(listingData.lat, listingData.lng);

      let content = document.createElement('button');
      content.className = 'listing-overlay';

      let badge = document.createElement('div');
      badge.className = 'listing-badge';
      badge.textContent = '매물';

      let info = document.createElement('div');
      info.className = 'listing-info';

      let priceText = document.createElement('div');
      priceText.className = 'listing-price';
      priceText.textContent = numberFormat(price); // ex) 360억

      let areaText = document.createElement('div');
      areaText.className = 'listing-area';
      areaText.textContent = `'${area}m²`;

      info.appendChild(priceText);
      info.appendChild(areaText);
      content.appendChild(badge);
      content.appendChild(info);

      content.onclick = function () {
        dispatch(
          setCurrentLandAddress({
            pnu: pnu,
            address: address,
            lat: lat,
            lng: lng,
          }),
        );
        currentLandMarker.setMap(null);
        setAlreadyMarkerExist(true);
      };

      var listingOverlay = new kakao.maps.CustomOverlay({
        map: null,
        clickable: true,
        position: coords,
        content: content,
        yAnchor: 0,
      });

      marker[pnu] = {
        data: listingData,
        marker: listingOverlay,
      };
    }
    setListingMarker((listingMarker) => {
      return { ...listingMarker, ...marker };
    });
  }, [listingMarkerData]);

  // 매물 마커 표시
  useEffect(() => {
    if (isShowListingMarker) {
      for (let pnu in listingMarker) {
        listingMarker[pnu]['marker'].setMap(map);
      }
    } else {
      for (let pnu in listingMarker) {
        listingMarker[pnu]['marker'].setMap(null);
      }
    }
  }, [listingMarker, isShowListingMarker]);

  // 현재 선택된 매물 마커인지 확인
  useEffect(() => {
    Object.entries(listingMarker).forEach(([pnu, { marker }]) => {
      const el = marker.getContent();
      if (!el) return;

      if (currentLandAddress?.pnu === pnu) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }, [currentLandAddress, listingMarker]);

  return (
    <MapContainer id="map">
      <AddressSearchBar map={map} />
      <MapButton number={1} onClick={moveToCurrentPosition}>
        <BiCurrentLocation size="28" style={{ marginTop: '2px' }} />
      </MapButton>
      <MapButton number={2} isToggled={isSkyView} type="map" onClick={changeMapType}>
        <MdOutlineMap size="28" style={{ marginTop: '2px' }} />
      </MapButton>
      <MapButton number={3} isToggled={true} type="auction">
        경매
      </MapButton>
      <MapButton number={4} isToggled={true} type="listing" onClick={() => setShowListingMarker(!isShowListingMarker)}>
        매물
      </MapButton>
    </MapContainer>
  );
};

export default KakaoMap;
