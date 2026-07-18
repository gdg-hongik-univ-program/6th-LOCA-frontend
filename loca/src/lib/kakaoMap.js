const KAKAO_SDK_ID = "kakao-map-sdk";
const KAKAO_SDK_TIMEOUT_MS = 10_000;

function loadMaps(kakao, resolve, reject) {
  if (!kakao?.maps) {
    reject(new Error("Kakao Map SDK loaded without maps API."));
    return;
  }

  kakao.maps.load(() => resolve(kakao));
}

export function loadKakaoMapSdk(appKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Kakao Map SDK can only be loaded in the browser."));
      return;
    }

    let settled = false;
    const timeout = window.setTimeout(() => {
      rejectSdk(new Error("Kakao Map SDK timed out."));
    }, KAKAO_SDK_TIMEOUT_MS);
    const resolveSdk = (kakao) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve(kakao);
    };
    const rejectSdk = (error) => {
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
      existingScript.addEventListener("error", () =>
        rejectSdk(new Error("Kakao Map SDK failed to load.")),
      );
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

export function getDefaultSelectedPlace(places) {
  return places[0];
}
