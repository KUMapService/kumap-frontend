import { useEffect } from 'react';

export const useKakaoMap = ({ setMap, setCurrentLandMarker, setRegionClusterer }) => {
  useEffect(() => {
    const { kakao } = window;

    const lastViewLat = localStorage.getItem('last_view_lat');
    const lastViewLng = localStorage.getItem('last_view_lng');
    const center =
      lastViewLat && lastViewLng
        ? new kakao.maps.LatLng(lastViewLat, lastViewLng)
        : new kakao.maps.LatLng(37.536172, 126.976978);

    const newMap = new kakao.maps.Map(document.getElementById('map'), {
      center,
      level: 3,
    });

    const overlay = new kakao.maps.CustomOverlay({
      map: newMap,
      position: null,
      content: '',
      yAnchor: 0,
    });

    const clusterer = new kakao.maps.MarkerClusterer({
      map: newMap,
      averageCenter: true,
      disableClickZoom: true,
      gridSize: 100,
      minLevel: 5,
      styles: [
        {
          padding: '4px 10px 4px 10px',
          background: '#FFF',
          filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.2))',
          borderRadius: '20px',
          color: '#FFF',
          textAlign: 'center',
          fontWeight: 'bold',
          zIndex: '20',
        },
      ],
    });

    setMap(newMap);
    setCurrentLandMarker(overlay);
    setRegionClusterer(clusterer);
  }, []);
};
