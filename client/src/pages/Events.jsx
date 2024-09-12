import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import GraphMobile from "../components/GraphMobile";
import Filter from "../components/CategoryFilter";

function Events() {
  const [showSportsBoys, setShowSportsBoys] = useState(true);
  const [showSportsGirls, setShowSportsGirls] = useState(false);
  const [showCulti, setShowCulti] = useState(false);
  const [showTechy, setShowTechy] = useState(false);
  const [cultiData, setCultiData] = useState(null);
  const [sportsGirlsData, setSportsGirlsData] = useState(null);
  const [sportsBoysData, setSportsBoysData] = useState(null);
  const [techyData, setTechyData] = useState(null);
  const [isMobile,setIsMobile] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [categories, setCategories] = useState([
    "Sports Boys",
    "Sports Girls",
    "Culturals",
    "Sci-Tech",
  ]);
  const [blocks,setBlocks] = useState(["Select All"]);

  useEffect(() => {
    setDataFetched(sportsBoysData && sportsGirlsData && techyData && cultiData);
  },[sportsBoysData, sportsGirlsData, techyData, cultiData]);

  const handleCategoriesChange = (selectedCategory) => {
    setCategories(selectedCategory);
  };

  const handleBlocksChange = (selectedBlock) => {
    setBlocks(selectedBlock);
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
      }
    };

    fetchSportsGirlsData();
  }, []);

  useEffect(() => {
    const fetchSportsBoysData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwAkBZpkZAA3RR7yhglhaY0MynyTb7x6RB8aRtDyG0C8rLZxHLlvy1qx838hl3Ys96M/exec"
        );
        if (!response.ok) {
          throw new Error("HTTP error! status: ${response.status}");
        }
        const result = await response.json();
        console.log("Fetched boys sports data:", result);
        setSportsBoysData(result);
      } catch (error) {
        console.error("Error fetching sports boys data:", error);
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
      }
    };
    fetchTechyData();
  }, []);

  const NavBar = () => {
    return (
      <div className="flex justify-center mx-auto my-10">
        <button
          className="bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 mx-4 rounded-lg"
          onClick={() => {
            setShowSportsBoys(true);
            setShowSportsGirls(false);
            setShowCulti(false);
            setShowTechy(false);
          }}
        >
          Sports Boys
        </button>
        <button
          className="bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 mx-4 rounded-lg"
          onClick={() => {
            setShowSportsBoys(false);
            setShowSportsGirls(true);
            setShowCulti(false);
            setShowTechy(false);
          }}
        >
          Sports Girls
        </button>
        <button
          className="bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 mx-4 rounded-lg"
          onClick={() => {
            setShowSportsBoys(false);
            setShowSportsGirls(false);
            setShowCulti(true);
            setShowTechy(false);
          }}
        >
          Culti
        </button>
        <button
          className="bg-[#6539BA] text-[#D1CCB6] font-extrabold py-2 px-4 mx-4 rounded-lg"
          onClick={() => {
            setShowSportsBoys(false);
            setShowSportsGirls(false);
            setShowCulti(false);
            setShowTechy(true);
          }}
        >
          Techy
        </button>
      </div>
    );
  };

  return (
    <>
      {isMobile && dataFetched && (
        <div className="flex gap-8 flex-col scale-90 justify-center">
          <div className="flex flex-row justify-center">
            <Filter options={techyData.blocks} onCategoryChange={handleBlocksChange} title="SELECT BLOCK" isSingle={true}/>
            <Filter
              options={[
                "Sports Boys",
                "Sports Girls",
                "Culturals",
                "Sci-Tech",
              ]}
              onCategoryChange={handleCategoriesChange}
              title="SELECT TYPE"
            />
          </div>
          <GraphMobile
            blocknames={techyData.blocks}
            categories={categories}
            sportsBoysData={sportsBoysData}
            sportsGirlsData={sportsGirlsData}
            cultiData={cultiData}
            techyData={techyData}
          />
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