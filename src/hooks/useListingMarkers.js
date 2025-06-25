import { useEffect, useRef } from 'react';
import { numberFormat } from '@utils/formatter';
import { setCurrentLandAddress } from '@store/actions/land';

export const useListingMarkers = ({ map, dispatch, listingMarkerData, showListing }) => {
  const markerMapRef = useRef({});

  useEffect(() => {
    if (!map) return;

    const markerMap = {};

    listingMarkerData.forEach((listing) => {
      if (markerMapRef.current[listing.pnu]) return;

      const el = document.createElement('button');
      el.className = 'listing-overlay';

      const badge = document.createElement('div');
      badge.className = 'listing-badge';
      badge.textContent = '매물';

      const info = document.createElement('div');
      info.className = 'listing-info';

      const priceText = document.createElement('div');
      priceText.className = 'listing-price';
      priceText.textContent = numberFormat(String(listing.price));

      const areaText = document.createElement('div');
      areaText.className = 'listing-area';
      areaText.textContent = `'${Math.floor(listing.area).toLocaleString()}m²`;

      info.append(priceText, areaText);
      el.append(badge, info);

      el.onclick = () => {
        dispatch(setCurrentLandAddress({ ...listing }));
      };

      const overlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(listing.lat, listing.lng),
        content: el,
        yAnchor: 0,
        clickable: true,
      });

      markerMap[listing.pnu] = { marker: overlay, data: listing };
      markerMap[listing.pnu].marker.setMap(showListing ? map : null);
    });

    markerMapRef.current = { ...markerMapRef.current, ...markerMap };
  }, [map, listingMarkerData]);

  useEffect(() => {
    Object.values(markerMapRef.current).forEach(({ marker }) => {
      marker.setMap(showListing ? map : null);
    });
  }, [showListing, map]);

  return markerMapRef;
};
