// src/components/Sidebar/Sidebar.jsx

import {
  Sparkles,
  Layers3,
  Flame,
  CloudRain,
  Sprout,
  Wind,
  ShieldAlert,
  Clock3,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";

function Sidebar({
  activeLayer,
  setActiveLayer,
  activeTab,
  setActiveTab,
}) {
  // =========================
  // STATES
  // =========================

  const [
    showEarthLayers,
    setShowEarthLayers,
  ] = useState(true);

  // =========================
  // MAIN BUTTON
  // =========================

  function MainButton({
    icon: Icon,
    title,
    subtitle,
    value,
    iconColor,
  }) {
    const isActive =
      activeTab === value;

    return (
      <button
        onClick={() => {
          setActiveTab(value);

          setActiveLayer(null);
        }}
        className={`
          w-full
          flex
          items-center
          gap-3
          px-4
          py-4
          rounded-3xl
          border
          transition-all
          duration-200

          ${
            isActive
              ? "bg-emerald-500 border-emerald-400 shadow-xl shadow-emerald-500/20 text-black"
              : "bg-slate-900 border-slate-800 text-white hover:bg-slate-800"
          }
        `}
      >
        {/* ICON */}

        <div
          className={`
            w-11
            h-11
            rounded-2xl
            flex
            items-center
            justify-center

            ${
              isActive
                ? "bg-black/10"
                : "bg-slate-800"
            }
          `}
        >
          <Icon
            size={20}
            className={
              isActive
                ? "text-black"
                : iconColor
            }
          />
        </div>

        {/* TEXT */}

        <div className="text-left">
          <p className="font-semibold text-sm">
            {title}
          </p>

          <p
            className={`
              text-xs

              ${
                isActive
                  ? "text-black/70"
                  : "text-slate-400"
              }
            `}
          >
            {subtitle}
          </p>
        </div>
      </button>
    );
  }

  // =========================
  // EARTH LAYER BUTTON
  // =========================

  function LayerButton({
    icon: Icon,
    label,
    value,
  }) {
    const isActive =
      activeLayer === value;

    return (
      <button
        onClick={() => {
          setActiveTab("layers");

          setActiveLayer(value);
        }}
        className={`
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          transition-all
          duration-200
          text-sm
          font-medium

          ${
            isActive
              ? "bg-blue-950 border border-blue-700 text-blue-200"
              : "text-black/80 hover:bg-black/5"
          }
        `}
      >
        <Icon size={17} />

        <span>{label}</span>
      </button>
    );
  }

  // =========================
  // EARTH ACTIVE
  // =========================

  const earthActive =
    activeTab === "layers";

  // =========================
  // MAIN
  // =========================

  return (
    <aside
      className="
        w-[280px]
        h-full
        bg-slate-950
        border-r
        border-slate-800
        p-4
        flex
        flex-col
        gap-3
      "
    >
      {/* ========================= */}
      {/* LOGO */}
      {/* ========================= */}

      <div
        className="
          px-2
          py-4
          mb-2
        "
      >
        <h1
          className="
            text-3xl
            font-black
            tracking-tight
            text-white
          "
        >
          CropIQ
        </h1>

        <p
          className="
            text-slate-400
            text-xs
            mt-1
          "
        >
          Earth Intelligence System
        </p>
      </div>

      {/* ========================= */}
      {/* EXPLAIN MY LAND */}
      {/* ========================= */}

      <MainButton
        icon={Sparkles}
        title="Explain My Land"
        subtitle="AI-powered land insights"
        value="explain"
        iconColor="text-emerald-400"
      />

      {/* ========================= */}
      {/* EARTH LAYERS */}
      {/* ========================= */}

      <div
        className={`
          border
          rounded-3xl
          overflow-hidden
          transition-all
          duration-200

          ${
            earthActive
              ? "bg-emerald-500 border-emerald-400 shadow-xl shadow-emerald-500/20"
              : "bg-slate-900 border-slate-800"
          }
        `}
      >
        {/* HEADER */}

        <button
          onClick={() => {
            setShowEarthLayers(
              !showEarthLayers
            );

            setActiveTab("layers");
          }}
          className="
            w-full
            flex
            items-center
            justify-between
            px-4
            py-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            {/* ICON */}

            <div
              className={`
                w-11
                h-11
                rounded-2xl
                flex
                items-center
                justify-center

                ${
                  earthActive
                    ? "bg-black/10"
                    : "bg-slate-800"
                }
              `}
            >
              <Layers3
                size={20}
                className={
                  earthActive
                    ? "text-black"
                    : "text-blue-400"
                }
              />
            </div>

            {/* TEXT */}

            <div className="text-left">
              <p
                className={`
                  text-sm
                  font-semibold

                  ${
                    earthActive
                      ? "text-black"
                      : "text-white"
                  }
                `}
              >
                Earth Layers
              </p>

              <p
                className={`
                  text-xs

                  ${
                    earthActive
                      ? "text-black/70"
                      : "text-slate-400"
                  }
                `}
              >
                Heat • Rain • AQI 
              </p>
            </div>
          </div>

          {/* ARROW */}

          {showEarthLayers ? (
            <ChevronDown
              size={18}
              className={
                earthActive
                  ? "text-black"
                  : "text-white"
              }
            />
          ) : (
            <ChevronRight
              size={18}
              className={
                earthActive
                  ? "text-black"
                  : "text-white"
              }
            />
          )}
        </button>

        {/* DROPDOWN */}

        <div
          className={`
            transition-all
            duration-300
            overflow-hidden

            ${
              showEarthLayers
                ? "max-h-[500px] opacity-100 p-3 pt-0"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="flex flex-col gap-2">
            <LayerButton
              icon={Flame}
              label="Heat"
              value="heat"
            />

            <LayerButton
              icon={CloudRain}
              label="Rain"
              value="rain"
            />

            <LayerButton
              icon={Wind}
              label="AQI"
              value="aqi"
            />

            
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* RISK ZONE */}
      {/* ========================= */}

      <MainButton
        icon={ShieldAlert}
        title="Risk Zone"
        subtitle="Flood • Heat • Drought"
        value="risk"
        iconColor="text-red-400"
      />

      {/* ========================= */}
      {/* TIME LAPSE */}
      {/* ========================= */}

      <MainButton
        icon={Clock3}
        title="Time Lapse"
        subtitle="Observe environmental change"
        value="timelapse"
        iconColor="text-cyan-400"
      />

      {/* ========================= */}
      {/* SPACE */}
      {/* ========================= */}

      <div className="flex-1" />

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <div
        className="
          text-xs
          text-slate-500
          px-2
        "
      >
        CropIQ v2.0
      </div>
    </aside>
  );
}

export default Sidebar;