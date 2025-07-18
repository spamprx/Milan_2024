import React, { useState, useEffect } from "react";
import ChartRace from "react-chart-race";
// import GooEffectLoader from "./SmallLoader";

const BlockRace = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const iframe = document.getElementById("block-race-iframe");
  //   iframe.onload = () => {
  //     setIsLoading(false);
  //   };
  // }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-full bg-transparent">
      {/* {isLoading && (
        <div className="w-full h-full">
          <GooEffectLoader />
        </div>
      )} */}
      <iframe
        id="block-race-iframe"
        src="https://flo.uri.sh/visualisation/19485377/embed"
        title="Interactive or visual content"
        className="flourish-embed-iframe"
        style={{
          width: "100%",
          height: isSmallScreen ? "300px" : "500px",
          // display: isLoading ? "none" : "block",
          display: "block",
        }}
        sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      ></iframe>
    </div>
  );
};

export default BlockRace;
