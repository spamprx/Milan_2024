import React, { useState, useEffect } from "react";
import ChartRace from "react-chart-race";

const BlockRace = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-full bg-transparent">
      <iframe
        src="https://flo.uri.sh/visualisation/19448569/embed"
        title="Interactive or visual content"
        className="flourish-embed-iframe"
        style={{ width: "100%", height: "600px" }}
        sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      ></iframe>
    </div>
  );
};

export default BlockRace;
