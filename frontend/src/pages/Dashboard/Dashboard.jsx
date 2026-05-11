// src/pages/Dashboard/Dashboard.jsx

import { useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";

import SearchBar from "../../components/Search/SearchBar";

import MapView from "../../components/Map/MapView";

import EarthPanel from "../../components/Panel/EarthPanel";

function Dashboard() {
  // =========================
  // SEARCH
  // =========================

  const [
    searchLocation,
    setSearchLocation,
  ] = useState("");

  // =========================
  // ACTIVE TAB
  // =========================

  const [
    activeTab,
    setActiveTab,
  ] = useState("explain");

  // =========================
  // ACTIVE LAYER
  // =========================

  const [
    activeLayer,
    setActiveLayer,
  ] = useState(null);

  // =========================
  // EARTH DATA
  // =========================

  const [earthData, setEarthData] =
    useState({
      temperature: "--",

      humidity: "--",

      ph: "--",

      airQuality: "--",

      vegetation: "--",

      windSpeed: "--",

      bestCrop: "--",

      interpretations: [],
    });

  return (
    <div
      className="
        h-screen
        bg-slate-950
        text-white
        flex
        overflow-hidden
      "
    >
      {/* SIDEBAR */}

      <Sidebar
        activeLayer={activeLayer}
        setActiveLayer={
          setActiveLayer
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN */}

      <main
        className="
          flex-1
          p-6
          flex
          flex-col
          gap-4
          overflow-hidden
        "
      >
        {/* MAP */}

        <div
          className="
            relative
            h-[58%]
            min-h-[420px]
          "
        >
          {/* SEARCH */}

          <SearchBar
            searchLocation={
              searchLocation
            }
            setSearchLocation={
              setSearchLocation
            }
          />

          {/* MAP */}

          <MapView
            setEarthData={
              setEarthData
            }
            searchLocation={
              searchLocation
            }
            activeLayer={
              activeLayer
            }
          />
        </div>

        {/* PANEL */}

        <div className="flex-1 min-h-0">
          <EarthPanel
            earthData={earthData}
            activeLayer={
              activeLayer
            }
            activeTab={activeTab}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;