import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentLandAddress } from '@store/actions/land';
import { LAND_TYPE } from '@constants/map';
import { numberFormat } from '@utils/formatter';
import { toast } from 'react-toastify';
import { getRegionMarkerData } from '@api/region';

export const useRegionMarkers = ({ map, regionClusterer }) => {
  const dispatch = useDispatch();
  const regionMarkersRef = useRef([]);

  const fetchRegionMarkers = async () => {
    if (!map || !regionClusterer) return;

    try {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const response = await getRegionMarkerData({
        min_lat: sw.getLat(),
        min_lng: sw.getLng(),
        max_lat: ne.getLat(),
        max_lng: ne.getLng(),
        zoom: map.getLevel(),
      });
      console.log(response);
      const regionList = response || [];
      const newMarkers = [];
      console.log(regionList);

      for (let i = 0; i < Object.keys(regionList).length; i++) {
        const regionItem = regionList[i];
        console.log(regionItem);
        const latlng = new window.kakao.maps.LatLng(regionItem.lat, regionItem.lng);

        const content = document.createElement('button');
        content.className = 'region-overlay';
        content.setAttribute('data-pnu', regionItem.pnu);
        content.setAttribute('data-region', regionItem.region);
        content.setAttribute('data-price', regionItem.avg_predict_land_price);
        content.setAttribute('data-ratio', regionItem.price_ratio);

        const regionBlock = document.createElement('div');
        regionBlock.className = regionItem.price_ratio < 100 ? 'region-low-block' : 'region-high-block';
        content.appendChild(regionBlock);

        const regionTitle = document.createElement('span');
        regionTitle.className = 'region-title';
        regionTitle.appendChild(document.createTextNode(regionItem.region));
        regionBlock.appendChild(regionTitle);

        const regionPrice = document.createElement('span');
        regionPrice.className = 'region-price';
        regionPrice.appendChild(
          regionItem.avg_predict_land_price !== 0
            ? document.createTextNode(numberFormat(regionItem.avg_predict_land_price.toString()))
            : document.createTextNode(' - '),
        );
        content.appendChild(regionPrice);

        const regionRatio = document.createElement('span');
        regionRatio.className = regionItem.price_ratio < 100 ? 'region-low-ratio' : 'region-high-ratio';
        regionRatio.appendChild(
          regionItem.avg_predict_land_price !== 0
            ? document.createTextNode(regionItem.price_ratio + '%')
            : document.createTextNode(''),
        );
        content.appendChild(regionRatio);

        content.onclick = () => {
          dispatch(
            setCurrentLandAddress({
              pnu: regionItem.pnu,
              address: regionItem.region,
              type: LAND_TYPE.REGION_LAND_UNLOAD,
            }),
          );
        };

        const overlay = new window.kakao.maps.CustomOverlay({
          position: latlng,
          content,
          yAnchor: 0,
          clickable: true,
        });

        newMarkers.push(overlay);
      }

      regionMarkersRef.current.forEach((m) => m.setMap(null));
      regionMarkersRef.current = newMarkers;

      console.log(newMarkers);

      regionClusterer.clear();
      regionClusterer.addMarkers(newMarkers);
    } catch (error) {
      toast.error('지역 마커 데이터를 불러오지 못했습니다.');
      console.error(error);
    }
  };

  return { fetchRegionMarkers, regionMarkersRef };
};
