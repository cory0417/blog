import React from "react";

interface RideWithGPSProps {
  type: string;
  id: string;
  caption: string;
  metricUnits?: boolean;
  sampleGraph?: boolean;
  hideSurface?: boolean;
}

const RideWithGPSEmbed: React.FC<RideWithGPSProps> = ({
  type,
  id,
  caption,
  metricUnits = true,
  sampleGraph = true,
  hideSurface = true,
}) => {
  const src = `https://ridewithgps.com/embeds?type=${type}&id=${id}&metricUnits=${metricUnits}&sampleGraph=${sampleGraph}&hideSurface=${hideSurface}`;

  return (
    <div style={{ textAlign: "center" }}>
      <iframe
        src={src}
        style={{
          width: "100%",
          minWidth: "10%",
          maxWidth: "100%",
          height: "100%",
          aspectRatio: "1 / 1",
          display: "block",
        }}
        title={caption}
      ></iframe>
      <p style={{marginTop: "2%", fontSize: "1rem", color: "#FFF"}}>
        {caption}
      </p>
    </div>
  );
};

export default RideWithGPSEmbed;
