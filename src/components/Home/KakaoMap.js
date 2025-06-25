// using kakao map
const { kakao } = window;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdOutlineMap } from 'react-icons/md';
import { toast } from 'react-toastify';

import { getPNU } from '@api/geo';
import { getListingMarkerList } from '@api/listing';
import AddressSearchBar from '@components/Home/AddressSearchBar';
import { LAND_TYPE } from '@constants/map';
import { setCurrentLandAddress } from '@store/actions/land';
import { useKakaoMap } from '@hooks/useKakaoMap';
import { useCadastralMap } from '@hooks/useCadastralMap';
import { useListingMarkers } from '@hooks/useListingMarkers';
import { useRegionMarkers } from '@hooks/useRegionMarkers';
import { MapContainer, MapButton } from '@styles/Home/KakaoMap/KakaoMap.styles';
import '@styles/Home/KakaoMap/KakaoMap.css';
import { ZOOM_LEVEL } from '@constants/map';

const KakaoMap = () => {
  // 전역 변수 관리
  const dispatch = useDispatch();
  const currentLandAddress = useSelector((state) => state.land.currentLandAddress);
  // 지도 변수
  const [map, setMap] = useState(null);
  const [isSkyView, setSkyView] = useState(false);
  const [isShowListingMarker, setShowListingMarker] = useState(true);
  // 오버레이 마커
  const [currentLandMarker, setCurrentLandMarker] = useState(null);
  //const [regionMarker, setRegionMarker] = useState(null);
  const [regionClusterer, setRegionClusterer] = useState(null);
  // 그 외 변수
  const [listingMarkerData, setListingMarkerData] = useState([]); // 토지 매물 마커 데이터 (카카오맵 마커 X)
  const [isAlreadyMarkerExist, setAlreadyMarkerExist] = useState(false); // 해당 토지에 이미 마커가 있는지 확인하는 변수 (매물, 경매)

  // 카카오맵 초기화 훅
  useKakaoMap({ setMap, setCurrentLandMarker, setRegionClusterer });
  const cadastralMapRef = useCadastralMap(map, currentLandAddress);
  const listingMarkerRef = useListingMarkers({
    map,
    dispatch,
    listingMarkerData,
    showListing: isShowListingMarker,
  });
  const { fetchRegionMarkers, regionMarkersRef } = useRegionMarkers({
    map,
    regionClusterer,
  });
  console.log(regionClusterer, regionMarkersRef);

  useEffect(() => {
    if (!map) {
      return;
    }
    currentLandMarker.setMap(map);
    // 이벤트 리스너 추가
    kakao.maps.event.addListener(map, 'click', onMapClick);
    kakao.maps.event.addListener(map, 'tilesloaded', onTilesLoaded);
    kakao.maps.event.addListener(map, 'zoom_changed', onZoomChanged);
    // 이벤트 리스너 제거
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

    // 현재 토지 마커 표시
    console.log(listingMarkerRef.current);
    if (currentLandAddress.pnu.length === 19) {
      if ((!isAlreadyMarkerExist || !isShowListingMarker) && !(currentLandAddress?.pnu in listingMarkerRef.current)) {
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
    }
    setAlreadyMarkerExist(false);
  }, [currentLandAddress]);

  // 클러스터링 객체가 변경될 때 실행되는 코드
  useEffect(() => {
    if (!regionClusterer || !map) {
      return;
    }
    console.log(regionClusterer);
    // add EventListener
    kakao.maps.event.addListener(regionClusterer, 'clustered', function (clusters) {
      try {
        for (let i = 0; i < clusters.length; i++) {
          const cls = clusters[i];
          const overlay = cls.getClusterMarker().getContent();
          const markers = cls.getMarkers();
          const count = markers.length - 1;
          const content = markers[0].getContent();

          overlay.innerHTML = `
                        <span class="region-cluster-text">${content.getAttribute('data-region')} 외</span>
                        <span class="region-cluster-highlight-text">${count}</span>
                    `;
        }
      } catch (error) {
        console.log(error);
      }
    });

    kakao.maps.event.addListener(regionClusterer, 'clusterclick', function (cluster) {
      const markers = cluster.getMarkers();
      const count = markers.length - 1;

      const pnus = markers.map((marker) => marker.getContent().getAttribute('data-pnu'));
      const regions = markers.map((marker) => marker.getContent().getAttribute('data-region'));
      const prices = markers.map((marker) => marker.getContent().getAttribute('data-price'));
      const ratios = markers.map((marker) => marker.getContent().getAttribute('data-ratio'));
      // 데이터 표시 로직 추가 (예: alert, console.log, 또는 UI 업데이트)
      const _landAddress = {
        type: LAND_TYPE.CLUSTERER_LAND,
        address: `${markers[0].getContent().getAttribute('data-addr')} 외 ${count}`,
        region: regions,
        pnu: pnus,
        price: prices,
        ratio: ratios,
      };
      dispatch(setCurrentLandAddress(_landAddress));
    });
  }, [regionClusterer]);

  // 타일이 로드될 떄 호출 이벤트 (줌 레벨 변경, 지도 위치 변경)
  const onTilesLoaded = async () => {
    // 중심 좌표 로드
    const latlng = map.getCenter();
    await getPNU(dispatch, { lat: latlng.getLat(), lng: latlng.getLng() }, map.getLevel());
    // 마커 로드
    const bounds = map.getBounds(); // 카카오맵의 현재 보이는 영역
    const sw = bounds.getSouthWest(); // 남서쪽
    const ne = bounds.getNorthEast(); // 북동쪽
    if (sw !== null && ne !== null) {
      if (ZOOM_LEVEL.LOW.includes(map.getLevel())) {
        // 매물 마커 로드
        const marker = await getListingMarkerList({
          min_lat: sw.getLat(),
          min_lng: sw.getLng(),
          max_lat: ne.getLat(),
          max_lng: ne.getLng(),
        });
        setListingMarkerData(Object.values(marker));
      } else {
        // 지역 마커 불러오기
        fetchRegionMarkers();
      }
    }
    // 마지막 중심 좌표 로컬 스토리지에 저장
    localStorage.setItem('last_view_lat', latlng.getLat());
    localStorage.setItem('last_view_lng', latlng.getLng());
    console.log(regionClusterer);
  };

  // 줌 레벨이 변경된 후 호출 이벤트
  const onZoomChanged = () => {
    console.log(cadastralMapRef.current);
    if (map.getLevel() > 4) {
      if (currentLandMarker) {
        cadastralMapRef.current.forEach((polygon) => polygon.setMap(null));
        currentLandMarker.setMap(null);
      }
      // 매물 마커 표시
      Object.values(listingMarkerRef.current).forEach(({ marker }) => {
        marker.setMap(null);
      });
    } else if (map.getLevel() <= 4) {
      // 매물 마커 숨기기
      Object.values(listingMarkerRef.current).forEach(({ marker }) => {
        marker.setMap(isShowListingMarker ? map : null);
      });
      // 지역 마커 불러오기
      fetchRegionMarkers();
    }
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
