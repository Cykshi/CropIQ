// src/components/Panel/EarthPanel.jsx

import {
  Thermometer,
  Droplets,
  Wind,
  Leaf,
  Activity,
  Waves,
  CloudRain,
  Sprout,
  Trees,
  Flame,
} from "lucide-react";

function EarthPanel({
  earthData,
  activeLayer,
  activeTab,
}) {
  // =========================
  // EXPLAIN MY LAND
  // =========================

  if (activeTab === "explain") {
    const metrics = [
      {
        title: "Temperature",
        value:
          earthData.temperature ||
          "--",
        icon: Thermometer,
      },

      {
        title: "Humidity",
        value:
          earthData.humidity ||
          "--",
        icon: Droplets,
      },

      {
        title: "Soil pH",
        value:
          earthData.ph || "--",
        icon: Waves,
      },

      {
        title: "AQI",
        value:
          earthData.airQuality ||
          "--",
        icon: Activity,
      },

      {
        title: "Vegetation",
        value:
          earthData.vegetation ||
          "--",
        icon: Leaf,
      },

      {
        title: "Wind Speed",
        value:
          earthData.windSpeed ||
          "--",
        icon: Wind,
      },
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        
        {/* ========================= */}
        {/* RAW EARTH DATA */}
        {/* ========================= */}

        <div
          className="
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-slate-800
            rounded-3xl
            p-5
            shadow-2xl
          "
        >
          {/* HEADER */}

          <div className="mb-4">
            <h2 className="text-white text-xl font-bold">
              Raw Earth Data
            </h2>

            <p className="text-slate-400 text-xs mt-1">
              Real-time environmental
              metrics
            </p>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-3 gap-3">
            {metrics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    bg-slate-800/80
                    border
                    border-slate-700
                    rounded-2xl
                    p-3
                    hover:border-emerald-500/40
                    transition-all
                  "
                >
                  {/* TOP */}

                  <div className="flex items-center gap-2 mb-2">
                    
                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-emerald-500/10
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon
                        size={16}
                        className="text-emerald-400"
                      />
                    </div>

                    <p className="text-slate-400 text-xs">
                      {item.title}
                    </p>
                  </div>

                  {/* VALUE */}

                  <h3
                    className="
                      text-white
                      text-lg
                      font-bold
                      tracking-tight
                    "
                  >
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================= */}
        {/* HUMAN INTERPRETATION */}
        {/* ========================= */}

        <div
          className="
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-slate-800
            rounded-3xl
            p-5
            shadow-2xl
            flex
            flex-col
          "
        >
          {/* HEADER */}

          <div className="mb-4">
            <h2 className="text-white text-xl font-bold">
              Human Interpretation
            </h2>

            <p className="text-slate-400 text-xs mt-1">
              AI-powered environmental
              insights
            </p>
          </div>

          {/* INSIGHTS */}

          <div className="flex flex-col gap-3 overflow-auto">
            {earthData.interpretations?.map(
              (text, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-start
                    gap-3
                    bg-slate-800/60
                    border
                    border-slate-700
                    rounded-2xl
                    p-3
                  "
                >
                  <Leaf
                    size={18}
                    className="
                      text-emerald-400
                      mt-0.5
                      flex-shrink-0
                    "
                  />

                  <p
                    className="
                      text-slate-300
                      text-sm
                      leading-relaxed
                    "
                  >
                    {text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // HEAT
  // =========================

  if (activeLayer === "heat") {
    return (
      <LayerPanel
        title="Heat Intelligence"
        subtitle="Surface thermal analysis"
        icon={Flame}
        cards={[
          {
            icon: Thermometer,
            title: "Temperature",
            value:
              earthData.temperature,
          },

          {
            icon: Flame,
            title: "Heat Stress",
            value:
              parseFloat(
                earthData.temperature
              ) > 35
                ? "High"
                : "Moderate",
          },

          {
            icon: Wind,
            title: "Wind Cooling",
            value:
              earthData.windSpeed,
          },

          {
            icon: Leaf,
            title: "Crop Impact",
            value: "Medium",
          },
        ]}
      />
    );
  }

  // =========================
  // RAIN
  // =========================

  if (activeLayer === "rain") {
    return (
      <LayerPanel
        title="Rain Intelligence"
        subtitle="Rainfall & moisture"
        icon={CloudRain}
        cards={[
          {
            icon: Droplets,
            title: "Humidity",
            value:
              earthData.humidity,
          },

          {
            icon: CloudRain,
            title: "Rain Probability",
            value: "68%",
          },

          {
            icon: Sprout,
            title: "Soil Moisture",
            value: "Healthy",
          },

          {
            icon: Activity,
            title: "Flood Risk",
            value: "Low",
          },
        ]}
      />
    );
  }

  // =========================
  // FERTILITY
  // =========================

  if (activeLayer === "fertility") {
    return (
      <LayerPanel
        title="Soil Fertility"
        subtitle="Agricultural suitability"
        icon={Sprout}
        cards={[
          {
            icon: Waves,
            title: "Soil pH",
            value: earthData.ph,
          },

          {
            icon: Sprout,
            title: "Best Crop",
            value:
              earthData.bestCrop,
          },

          {
            icon: Trees,
            title: "Vegetation",
            value:
              earthData.vegetation,
          },

          {
            icon: Leaf,
            title: "Fertility Score",
            value: "82%",
          },
        ]}
      />
    );
  }

  // =========================
  // VEGETATION
  // =========================

  if (
    activeLayer === "vegetation"
  ) {
    return (
      <LayerPanel
        title="Vegetation Analysis"
        subtitle="Plant health intelligence"
        icon={Trees}
        cards={[
          {
            icon: Trees,
            title: "Vegetation",
            value:
              earthData.vegetation,
          },

          {
            icon: Droplets,
            title: "Moisture",
            value:
              earthData.humidity,
          },

          {
            icon: Thermometer,
            title: "Climate",
            value:
              earthData.temperature,
          },

          {
            icon: Leaf,
            title: "Growth Rate",
            value: "Healthy",
          },
        ]}
      />
    );
  }

  // =========================
  // AQI
  // =========================

  if (activeLayer === "aqi") {
    return (
      <LayerPanel
        title="Air Quality Analysis"
        subtitle="Atmospheric intelligence"
        icon={Wind}
        cards={[
          {
            icon: Activity,
            title: "AQI",
            value:
              earthData.airQuality,
          },

          {
            icon: Wind,
            title: "Wind Speed",
            value:
              earthData.windSpeed,
          },

          {
            icon: Thermometer,
            title: "Temperature",
            value:
              earthData.temperature,
          },

          {
            icon: Leaf,
            title: "Air Health",
            value:
              earthData.airQuality <
              100
                ? "Healthy"
                : "Polluted",
          },
        ]}
      />
    );
  }

  return null;
}

// =========================
// LAYER PANEL
// =========================

function LayerPanel({
  title,
  subtitle,
  icon: Icon,
  cards,
}) {
  return (
    <div
      className="
        h-full
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/70
        backdrop-blur-xl
        p-6
      "
    >
      {/* HEADER */}

      <div className="flex items-center gap-4 mb-6">
        <div
          className="
            w-16
            h-16
            rounded-3xl
            bg-emerald-500/10
            flex
            items-center
            justify-center
          "
        >
          <Icon
            size={30}
            className="text-emerald-400"
          />
        </div>

        <div>
          <h2
            className="
              text-3xl
              font-black
              text-white
            "
          >
            {title}
          </h2>

          <p className="text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* CARDS */}

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>
    </div>
  );
}

// =========================
// CARD
// =========================

function Card({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div
      className="
        bg-black/20
        border
        border-white/10
        rounded-3xl
        p-5
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="
            w-11
            h-11
            rounded-2xl
            bg-white/10
            flex
            items-center
            justify-center
          "
        >
          <Icon
            size={20}
            className="text-white"
          />
        </div>

        <p className="text-slate-300 text-sm">
          {title}
        </p>
      </div>

      <h2
        className="
          text-3xl
          font-black
          text-white
          tracking-tight
        "
      >
        {value}
      </h2>
    </div>
  );
}

export default EarthPanel;