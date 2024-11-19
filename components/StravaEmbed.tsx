import { useEffect } from "react";

interface StravaEmbedProps {
  type: string;
  id: string;
  style: string;
  mapHash: string;
  caption: string;
}

const StravaEmbed: React.FC<StravaEmbedProps> = ({
  type,
  id,
  style,
  mapHash,
  caption,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/strava-embed.js"; // Correct local path
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="strava-embed-placeholder"
        data-embed-type={type}
        data-embed-id={id}
        data-style={style}
        data-map-hash={mapHash}
        data-caption={caption}
      />
      <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#DDD" }}>{caption}</p>
    </div>
  );
};

export default StravaEmbed;
