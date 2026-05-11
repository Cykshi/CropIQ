import { Search, MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";

function SearchBar({ setSearchLocation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] =
    useState(false);

  // =========================
  // SEARCH LOCATIONS
  // =========================

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    async function searchLocations() {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );

        const data =
          await response.json();

        setResults(data);
      } catch (error) {
        console.log(
          "Search Error:",
          error
        );
      }
    }

    const timeout = setTimeout(() => {
      searchLocations();
    }, 350);

    return () =>
      clearTimeout(timeout);
  }, [query]);

  return (
    <div
      style={{
        position: "absolute",

        top: "15px",

        left: "10px",

        zIndex: 2000,

        width: "380px",
      }}
    >
      {/* SEARCH BUBBLE */}
      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "10px",

          background:
            "rgba(15, 23, 42, 0.82)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          borderRadius: "999px",

          padding:
            "12px 18px",

          backdropFilter:
            "blur(18px)",

          WebkitBackdropFilter:
            "blur(18px)",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.45)",
        }}
      >
        {/* SEARCH ICON */}
        <Search
          size={17}
          style={{
            color: "#4ade80",

            flexShrink: 0,
          }}
        />

        {/* INPUT */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);

            setShowResults(true);
          }}
          placeholder="Search any place on Earth..."
          style={{
            background: "transparent",

            border: "none",

            outline: "none",

            width: "100%",

            color: "#f8fafc",

            fontSize: "14px",

            fontWeight: "500",

            fontFamily:
              "Inter, sans-serif",
          }}
        />

        {/* CLEAR */}
        {query && (
          <button
            onClick={() => {
              setQuery("");

              setResults([]);

              setSearchLocation("");

              setShowResults(false);
            }}
            style={{
              background: "none",

              border: "none",

              cursor: "pointer",

              padding: 0,

              display: "flex",

              alignItems: "center",

              color: "#94a3b8",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* DROPDOWN */}
      {showResults &&
        results.length > 0 && (
          <div
            style={{
              marginTop: "10px",

              background:
                "rgba(15, 23, 42, 0.96)",

              border:
                "1px solid rgba(255,255,255,0.06)",

              borderRadius: "20px",

              overflow: "hidden",

              backdropFilter:
                "blur(20px)",

              WebkitBackdropFilter:
                "blur(20px)",

              boxShadow:
                "0 12px 50px rgba(0,0,0,0.45)",

              maxHeight: "320px",

              overflowY: "auto",
            }}
          >
            {results.map((place) => (
              <button
                key={place.place_id}
                onClick={() => {
                  setSearchLocation(
                    place.display_name
                  );

                  setQuery(
                    place.display_name
                  );

                  setShowResults(false);
                }}
                style={{
                  width: "100%",

                  display: "flex",

                  alignItems: "flex-start",

                  gap: "10px",

                  padding:
                    "14px 16px",

                  background: "none",

                  border: "none",

                  borderBottom:
                    "1px solid rgba(255,255,255,0.04)",

                  cursor: "pointer",

                  textAlign: "left",

                  transition:
                    "background 0.15s ease",

                  color: "#f8fafc",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                <MapPin
                  size={15}
                  style={{
                    color: "#4ade80",

                    marginTop: "2px",

                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontSize: "12px",

                    lineHeight: "1.5",

                    color: "#e2e8f0",
                  }}
                >
                  {place.display_name}
                </span>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}

export default SearchBar;