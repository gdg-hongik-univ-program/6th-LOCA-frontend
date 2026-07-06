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
const KAKAO_SDK_TIMEOUT_MS = 10_000;

function loadMaps(kakao: KakaoGlobal | undefined, resolve: (kakao: KakaoGlobal) => void, reject: (error: Error) => void) {
  if (!kakao?.maps) {
    reject(new Error("Kakao Map SDK loaded without maps API."));
    return;
  }

  kakao.maps.load(() => resolve(kakao));
}

export function loadKakaoMapSdk(appKey: string): Promise<KakaoGlobal> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Kakao Map SDK can only be loaded in the browser."));
      return;
    }

    let settled = false;
    const timeout = window.setTimeout(() => {
      rejectSdk(new Error("Kakao Map SDK timed out."));
    }, KAKAO_SDK_TIMEOUT_MS);
    const resolveSdk = (kakao: KakaoGlobal) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve(kakao);
    };
    const rejectSdk = (error: Error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      reject(error);
    };

    if (window.kakao?.maps) {
      loadMaps(window.kakao, resolveSdk, rejectSdk);
      return;
    }

    const existingScript = document.getElementById(KAKAO_SDK_ID);
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        loadMaps(window.kakao, resolveSdk, rejectSdk);
      });
      existingScript.addEventListener("error", () => rejectSdk(new Error("Kakao Map SDK failed to load.")));
      return;
    }

    const script = document.createElement("script");
    script.id = KAKAO_SDK_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      loadMaps(window.kakao, resolveSdk, rejectSdk);
    };
    script.onerror = () => {
      rejectSdk(new Error("Kakao Map SDK failed to load."));
    };
    document.head.appendChild(script);
  });
}

export function getDefaultSelectedPlace(places: Place[]) {
  return places[0];
}
