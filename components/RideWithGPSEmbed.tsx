import React from 'react';

interface RideWithGPSProps {
  type: string;
  id: string;
  caption: string;
  metricUnits?: boolean;
  sampleGraph?: boolean;
  hideSurface?: boolean;
  height?: string;
}

const RideWithGPSEmbed: React.FC<RideWithGPSProps> = ({
                                                        type,
                                                        id,
                                                        caption,
                                                        metricUnits = true,
                                                        sampleGraph = true,
                                                        hideSurface = true,
                                                        height = "650px",
                                                      }) => {
  const src = `https://ridewithgps.com/embeds?type=${type}&id=${id}&metricUnits=${metricUnits}&sampleGraph=${sampleGraph}&hideSurface=${hideSurface}`;

  return (
    <div style={{textAlign: "center"}}>
      <iframe
        src={src}
        style={{width: "1px", minWidth: "100%", height, border: "none"}}
        title={caption}
      ></iframe>
      <p style={{
        marginTop: "8px",
        fontSize: "0.9rem",
        color: "#DDD"
      }}>{caption}</p>
    </div>

)
  ;
};

export default RideWithGPSEmbed;