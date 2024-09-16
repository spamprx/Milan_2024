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
  const [dataFetched, setDataFetched] = useState(false);
  const [categories, setCategories] = useState([
    "SPORTS-BOYS",
    "SPORTS-GIRLS",
    "CULTURALS",
    "SCI-TECH",
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDataFetched(sportsBoysData && sportsGirlsData && techyData && cultiData);
  }, [sportsBoysData, sportsGirlsData, techyData, cultiData]);

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
  }, [isMobile]);

  useEffect(() => {
    const fetchCultiData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzv0WclMXfbGduO4HDJN2fvQtGLehXLBNY3DSzj01eTV39AP7abqVqxPHHrUy3jTACl/exec"
        );
        if (!response.ok) {
          throw new Error("HTTP error! status: ${response.status}");
        }
        const result = await response.json();
        console.log("Fetched culti data:", result);
        setCultiData(result);
      } catch (error) {
        console.error("Error fetching culti data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCultiData();
  }, []);

  useEffect(() => {
    const fetchSportsGirlsData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzVrI_JnIFYZdgO3MCG1oY966K4x56DyLCMiZj3zpc1Ry7Lv0sZdRV9JiLUnZPi4MUz/exec"
        );
        if (!response.ok) {
          throw new Error("HTTP error! status: ${response.status}");
        }
        const result = await response.json();
        console.log("Fetched girls sports data:", result);
        setSportsGirlsData(result);
      } catch (error) {
        console.error("Error fetching girls sports data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSportsGirlsData();
  }, []);

  useEffect(() => {
    const fetchSportsBoysData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycby3D4yrP5M2xRoadR7oSVauTj01hNRDHAhR-eZURWzeHSFlj9cT8B2x_G65w99y_wcCgw/exec"
        );
        if (!response.ok) {
          throw new Error("HTTP error! status: ${response.status}");
        }
        const result = await response.json();
        console.log("Fetched boys sports data:", result);
        setSportsBoysData(result);
      } catch (error) {
        console.error("Error fetching sports boys data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSportsBoysData();
  }, []);

  useEffect(() => {
    const fetchTechyData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbx6Rbwmvzxh79ZK1BUqd_0nllGRg_k827VhcHH1YorEjMIXgrQ4Sar_L27UskZT478Q/exec"
        );
        if (!response.ok) {
          throw new Error("HTTP error! status: ${response.status}");
        }
        const result = await response.json();
        console.log("Fetched techy data:", result);
        setTechyData(result);
      } catch (error) {
        console.error("Error fetching techy data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTechyData();
  }, []);

  const NavBar = () => {
    return (
      <div className="max-w-7xl flex justify-between w-[44rem] mx-auto my-10">
        <button
          className="w-36 text-xs lg:text-sm bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 rounded-lg"
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
          className="w-36 text-xs lg:text-sm bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 rounded-lg"
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
          className="w-36 text-xs lg:text-sm bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 rounded-lg"
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
          className="w-36 text-xs lg:text-sm bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 rounded-lg"
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
      {isMobile && dataFetched && (
        <div className="mt-8 relative flex flex-col justify-center items-center">
          <div className="absolute top-0 z-30 flex flex-row items-center justify-center">
            <Filter
              options={["Sports Boys", "Sports Girls", "Culti", "Sci-Tech"]}
              onCategoryChange={handleCategoriesChange}
              title="SELECT TYPE"
            />
          </div>
          <div className="w-full mt-24">
            <GraphMobile
              blocknames={techyData.blocks}
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
        <>
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
        </>
      )}
    </>
  );
}

export default Events;
