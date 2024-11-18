import { useEffect } from "react";

interface StravaEmbedProps {
  type: string;
  id: string;
  style: string;
  mapHash: string;
  fromEmbed: boolean;
}

const StravaEmbed: React.FC<StravaEmbedProps> = ({
  type,
  id,
  style,
  mapHash,
  fromEmbed,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="strava-embed-placeholder"
      data-embed-type={type}
      data-embed-id={id}
      data-style={style}
      data-map-hash={mapHash}
      data-from-embed={fromEmbed}
    />
  );
};

export default StravaEmbed;
