import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import GraphMobile from "../components/GraphMobile";
import Filter from "../components/CategoryFilter";
import Loading from "./Loading.jsx";

function Events() {
  const [showSportsBoys, setShowSportsBoys] = useState(true);
  const [showSportsGirls, setShowSportsGirls] = useState(false);
  const [showCulti, setShowCulti] = useState(false);
  const [showTechy, setShowTechy] = useState(false);
  const [cultiData, setCultiData] = useState(null);
  const [sportsGirlsData, setSportsGirlsData] = useState(null);
  const [sportsBoysData, setSportsBoysData] = useState(null);
  const [techyData, setTechyData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTwoFetched, setFirstTwoFetched] = useState(false);

  useEffect(() => {
    const checkFirstTwoFetched = () => {
      return sportsBoysData && sportsGirlsData;
    };

    if (checkFirstTwoFetched()) {
      setFirstTwoFetched(true);
    }
  }, [sportsBoysData, sportsGirlsData]);

  useEffect(() => {
    if (firstTwoFetched && techyData && cultiData) {
      setIsLoading(false);
    }
  }, [firstTwoFetched, techyData, cultiData]);

  const handleCategoriesChange = (selectedCategory) => {
    setCategories(selectedCategory);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setter(result);
      } catch (error) {
        console.error(`Error fetching data:`, error);
      }
    };

    fetchData(
      "https://script.google.com/macros/s/AKfycbzv0WclMXfbGduO4HDJN2fvQtGLehXLBNY3DSzj01eTV39AP7abqVqxPHHrUy3jTACl/exec",
      setCultiData
    );
    fetchData(
      "https://script.google.com/macros/s/AKfycbzVrI_JnIFYZdgO3MCG1oY966K4x56DyLCMiZj3zpc1Ry7Lv0sZdRV9JiLUnZPi4MUz/exec",
      setSportsGirlsData
    );
    fetchData(
      "https://script.google.com/macros/s/AKfycby3D4yrP5M2xRoadR7oSVauTj01hNRDHAhR-eZURWzeHSFlj9cT8B2x_G65w99y_wcCgw/exec",
      setSportsBoysData
    );
    fetchData(
      "https://script.google.com/macros/s/AKfycbx6Rbwmvzxh79ZK1BUqd_0nllGRg_k827VhcHH1YorEjMIXgrQ4Sar_L27UskZT478Q/exec",
      setTechyData
    );

    setIsLoading(true);
  }, []);

  const NavBar = () => {
    return (
      <div className="max-w-6xl flex justify-between mx-8 my-10">
        <button
          className="w-40 lg:w-44 text-sm lg:text-base bg-[#6539BA] text-[#D1CCB6] font-extrabold p-4 rounded-xl"
          onClick={() => {
            setShowSportsBoys(true);
            setShowSportsGirls(false);
            setShowCulti(false);
            setShowTechy(false);
          }}
        >
          SPORTS-BOYS
        </button>
        <button
          className="w-40 lg:w-44 text-sm lg:text-base bg-[#6539BA] text-[#D1CCB6] font-extrabold p-4 rounded-xl"
          onClick={() => {
            setShowSportsBoys(false);
            setShowSportsGirls(true);
            setShowCulti(false);
            setShowTechy(false);
          }}
        >
          SPORTS-GIRLS
        </button>
        <button
          className="w-40 lg:w-44 text-sm lg:text-base bg-[#6539BA] text-[#D1CCB6] font-extrabold p-4 rounded-xl"
          onClick={() => {
            setShowSportsBoys(false);
            setShowSportsGirls(false);
            setShowCulti(true);
            setShowTechy(false);
          }}
        >
          CULTURALS
        </button>
        <button
          className="w-40 lg:w-44 text-sm lg:text-base bg-[#6539BA] text-[#D1CCB6] font-extrabold p-4 rounded-xl"
          onClick={() => {
            setShowSportsBoys(false);
            setShowSportsGirls(false);
            setShowCulti(false);
            setShowTechy(true);
          }}
        >
          SCI-TECH
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isMobile && (
        <div className="mt-8 relative flex flex-col justify-center items-center">
          <div className="absolute top-0 z-30 flex flex-row items-center justify-center">
            <Filter
              options={["SPORTS-BOYS", "SPORTS-GIRLS", "CULTURALS", "SCI-TECH"]}
              onCategoryChange={handleCategoriesChange}
              title="SELECT TYPE"
            />
          </div>
          <div className="w-full mt-24">
            <GraphMobile
              blocknames={techyData?.blocks}
              categories={categories}
              sportsBoysData={sportsBoysData}
              sportsGirlsData={sportsGirlsData}
              cultiData={cultiData}
              techyData={techyData}
            />
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="max-w-6xl mx-auto">
          <NavBar />
          {showSportsBoys && sportsBoysData && (
            <Category
              title={sportsBoysData.title}
              blocknames={sportsBoysData.blocks}
              games={sportsBoysData.eventNames}
              points={sportsBoysData.scores}
            />
          )}
          {showSportsGirls && sportsGirlsData && (
            <Category
              title={sportsGirlsData.title}
              blocknames={sportsGirlsData.blocks}
              games={sportsGirlsData.eventNames}
              points={sportsGirlsData.scores}
            />
          )}
          {showCulti && cultiData && (
            <Category
              title={cultiData.title}
              blocknames={cultiData.blocks}
              games={cultiData.eventNames}
              points={cultiData.scores}
            />
          )}
          {showTechy && techyData && (
            <Category
              title={techyData.title}
              blocknames={techyData.blocks}
              games={techyData.eventNames}
              points={techyData.scores}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Events;