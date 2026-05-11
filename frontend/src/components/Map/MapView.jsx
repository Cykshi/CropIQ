import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMapEvents,
  useMap,
} from "react-leaflet";

import {
  useState,
  useEffect,
} from "react";

import {
  Map,
  Satellite,
  Mountain,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

// =========================
// FETCH EARTH DATA
// =========================

async function fetchEarthData(
  lat,
  lng,
  setEarthData
) {
  try {
    // WEATHER

    const weatherResponse =
      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );

    const weatherData =
      await weatherResponse.json();

    // AQI

    const airResponse =
      await fetch(
        `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${
          import.meta.env
            .VITE_WAQI_API_KEY
        }`
      );

    const airData =
      await airResponse.json();

    // VALUES

    const temperature =
      weatherData?.current
        ?.temperature_2m ?? "--";

    const humidity =
      weatherData?.current
        ?.relative_humidity_2m ??
      "--";

    const windSpeed =
      weatherData?.current
        ?.wind_speed_10m ?? "--";

    const airQuality =
      typeof airData?.data?.aqi ===
      "number"
        ? airData.data.aqi
        : "--";

    // MOCK DATA

    const ph = (
      Math.random() * 2 +
      5.5
    ).toFixed(1);

    const vegetationStates = [
      "Healthy",
      "Moderate",
      "Dry",
    ];

    const crops = [
      "Rice",
      "Wheat",
      "Cotton",
      "Sugarcane",
      "Millets",
    ];

    const vegetation =
      vegetationStates[
        Math.floor(
          Math.random() *
            vegetationStates.length
        )
      ];

    const bestCrop =
      crops[
        Math.floor(
          Math.random() *
            crops.length
        )
      ];

    // INTERPRETATIONS

    const interpretations = [
      `Current temperature is ${temperature}°C.`,

      `Humidity level is ${humidity}%.`,

      `Wind speed is ${windSpeed} km/h.`,

      `Current AQI is ${airQuality}.`,

      `${bestCrop} appears suitable under these environmental conditions.`,
    ];

    // UPDATE

    setEarthData({
      lat: lat.toFixed(4),

      lng: lng.toFixed(4),

      temperature: `${temperature}°C`,

      humidity: `${humidity}%`,

      windSpeed: `${windSpeed} km/h`,

      ph,

      airQuality,

      vegetation,

      bestCrop,

      interpretations,
    });
  } catch (error) {
    console.log(
      "Earth Data Error:",
      error
    );
  }
}

// =========================
// SEARCH LOCATION
// =========================

function FlyToLocation({
  searchLocation,
  setEarthData,
  setMarkerPosition,
}) {
  const map = useMap();

  useEffect(() => {
    if (!searchLocation) return;

    async function searchPlace() {
      try {
        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`
          );

        const data =
          await response.json();

        if (data.length > 0) {
          const lat = parseFloat(
            data[0].lat
          );

          const lon = parseFloat(
            data[0].lon
          );

          map.flyTo([lat, lon], 10, {
            duration: 2,
          });

          setMarkerPosition([
            lat,
            lon,
          ]);

          fetchEarthData(
            lat,
            lon,
            setEarthData
          );
        }
      } catch (error) {
        console.log(
          "Search Error:",
          error
        );
      }
    }

    searchPlace();
  }, [
    searchLocation,
    map,
    setEarthData,
    setMarkerPosition,
  ]);

  return null;
}

// =========================
// MAP CLICK
// =========================

function LocationMarker({
  setEarthData,
  markerPosition,
  setMarkerPosition,
}) {
  useMapEvents({
    async click(e) {
      const { lat, lng } =
        e.latlng;

      setMarkerPosition([
        lat,
        lng,
      ]);

      fetchEarthData(
        lat,
        lng,
        setEarthData
      );
    },
  });

  return markerPosition === null ? null : (
    <Marker position={markerPosition}>
      <Popup>
        Earth Intelligence Analysis
      </Popup>
    </Marker>
  );
}

// =========================
// MAIN MAP
// =========================

function MapView({
  setEarthData,
  searchLocation,
  activeLayer,
}) {
  const [
    markerPosition,
    setMarkerPosition,
  ] = useState(null);

  // MAP TYPE

  const [mapType, setMapType] =
    useState("street");

  const mapLayers = {
    street:
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

    terrain:
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  };

  return (
    <div
      className="
        relative
        w-full
        h-full
        rounded-3xl
        overflow-hidden
        border
        border-slate-800
        shadow-2xl
      "
    >
      {/* ========================= */}
      {/* CINEMATIC RAIN ATMOSPHERE */}
      {/* ========================= */}

      {activeLayer === "rain" && (
        <>
          <div
            className="
              absolute
              inset-0
              pointer-events-none
            "
            style={{
              zIndex: 1000,

              background:
                "linear-gradient(to bottom, rgba(80,150,255,0.18), rgba(0,40,120,0.20))",

              mixBlendMode:
                "screen",
            }}
          />

          <div
            className="
              absolute
              inset-0
              pointer-events-none
            "
            style={{
              zIndex: 1001,

              background:
                "radial-gradient(circle at center, transparent 40%, rgba(0,0,40,0.35) 100%)",
            }}
          />
        </>
      )}



      {/* ========================= */}
      {/* MAP SWITCHER */}
      {/* ========================= */}

      <div
        className="
          absolute
          top-4
          right-4
          z-[2000]
          flex
          items-center
          gap-2
          bg-black/40
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          p-2
          shadow-2xl
        "
      >
        {[
          {
            key: "street",
            icon: Map,
            label: "Street",
          },

          {
            key: "satellite",
            icon: Satellite,
            label: "Satellite",
          },

          {
            key: "terrain",
            icon: Mountain,
            label: "Terrain",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() =>
                setMapType(item.key)
              }
              className={`
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                transition-all

                ${
                  mapType === item.key
                    ? "bg-emerald-500 text-black shadow-lg"
                    : "text-white hover:bg-white/10"
                }
              `}
            >
              <Icon size={16} />

              <span>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================= */}
      {/* MAP */}
      {/* ========================= */}

      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full z-0"
      >
        {/* BASE MAP */}

        <TileLayer
          url={mapLayers[mapType]}
        />

        {/* ========================= */}
        {/* RAIN */}
        {/* ========================= */}

        {activeLayer === "rain" && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${
              import.meta.env
                .VITE_OPENWEATHER_API_KEY
            }`}
            opacity={1}
            zIndex={500}
          />
        )}

        {/* ========================= */}
        {/* HEAT */}
        {/* ========================= */}

        {activeLayer === "heat" && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${
              import.meta.env
                .VITE_OPENWEATHER_API_KEY
            }`}
            opacity={1}
            zIndex={500}
          />
        )}

        {/* ========================= */}
        {/* AQI */}
        {/* ========================= */}

        {activeLayer === "aqi" && (
          <TileLayer
            url={`https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${
              import.meta.env
                .VITE_WAQI_API_KEY
            }`}
            opacity={1}
            zIndex={500}
          />
        )}

      

        {/* ZOOM */}

        <ZoomControl position="bottomright" />

        {/* SEARCH */}

        <FlyToLocation
          searchLocation={
            searchLocation
          }
          setEarthData={
            setEarthData
          }
          setMarkerPosition={
            setMarkerPosition
          }
        />

        {/* CLICK */}

        <LocationMarker
          setEarthData={
            setEarthData
          }
          markerPosition={
            markerPosition
          }
          setMarkerPosition={
            setMarkerPosition
          }
        />
      </MapContainer>
    </div>
  );
}

export default MapView;