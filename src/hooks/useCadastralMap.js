import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { getCadastralMap } from '@api/geo';
import palette from '@constants/styles';

/**
 * 토지 지적도를 그리는 커스텀 훅
 * @param {*} map 지도 객체
 * @param {*} currentLandAddress 현재 토지 주소 (AddressSchema)
 * @returns
 */
export const useCadastralMap = (map, currentLandAddress) => {
  const cadastralMapRef = useRef([]);

  useEffect(() => {
    if (!map || !currentLandAddress?.pnu) return;

    cadastralMapRef.current.forEach((polygon) => polygon.setMap(null));

    const fetchCadastral = async () => {
      try {
        const { polygons } = await getCadastralMap({ pnu: currentLandAddress.pnu });
        const newPolygons = [];

        polygons.forEach((level1) =>
          level1.forEach((level2) =>
            level2.forEach((pathCoords) => {
              const path = pathCoords.map(([lng, lat]) => new window.kakao.maps.LatLng(lat, lng));
              const polygon = new window.kakao.maps.Polygon({
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
            }),
          ),
        );

        cadastralMapRef.current = newPolygons;
        console.log('aaa');
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchCadastral();
  }, [map, currentLandAddress]);

  return cadastralMapRef;
};
