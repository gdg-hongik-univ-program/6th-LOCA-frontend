import type { Place } from "@/src/types/place";

export type KakaoLatLng = {
  getLat(): number;
  getLng(): number;
};

export type KakaoMapInstance = {
  setCenter(position: KakaoLatLng): void;
};

type KakaoMapOptions = {
  center: KakaoLatLng;
  level: number;
};

type KakaoMarker = {
  setMap(map: KakaoMapInstance | null): void;
};

type KakaoEventTarget = KakaoMarker;

export type KakaoGlobal = {
  maps: {
    load(callback: () => void): void;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMapInstance;
    Marker: new (options: { map: KakaoMapInstance; position: KakaoLatLng; title?: string }) => KakaoMarker;
    event: {
      addListener(target: KakaoEventTarget, type: "click", handler: () => void): void;
    };
  };
};

declare global {
  interface Window {
    kakao?: KakaoGlobal;
  }
}

const KAKAO_SDK_ID = "kakao-map-sdk";

export function loadKakaoMapSdk(appKey: string): Promise<KakaoGlobal> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Kakao Map SDK can only be loaded in the browser."));
      return;
    }

    if (window.kakao?.maps) {
      window.kakao.maps.load(() => resolve(window.kakao as KakaoGlobal));
      return;
    }

    const existingScript = document.getElementById(KAKAO_SDK_ID);
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        window.kakao?.maps.load(() => resolve(window.kakao as KakaoGlobal));
      });
      existingScript.addEventListener("error", () => reject(new Error("Kakao Map SDK failed to load.")));
      return;
    }

    const script = document.createElement("script");
    script.id = KAKAO_SDK_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao?.maps.load(() => resolve(window.kakao as KakaoGlobal));
    };
    script.onerror = () => reject(new Error("Kakao Map SDK failed to load."));
    document.head.appendChild(script);
  });
}

export function getDefaultSelectedPlace(places: Place[]) {
  return places[0];
}
