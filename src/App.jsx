import SportsBoys from "./components/sportsBoys";
import SportsGirls from "./components/sportsGirls";
import Culti from "./components/culti";
import Techy from "./components/techy";
import {useState} from "react";

function App() {
  const [showSportsBoys, setShowSportsBoys] = useState(false);
  const [showSportsGirls, setShowSportsGirls] = useState(false);
  const [showCulti, setShowCulti] = useState(false);
  const [showTechy, setShowTechy] = useState(false);

  const NavBar = () => {
    return (
      <div className="flex justify-center mx-auto my-10">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 mx-4 rounded"
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
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 mx-4 rounded"
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
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 mx-4 rounded"
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
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 mx-4 rounded"
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
  }

  return (
    <>
      <div className="flex">
        <NavBar />
      </div>
      {showSportsBoys && <SportsBoys />}
      {showSportsGirls && <SportsGirls />}
      {showCulti && <Culti />}
      {showTechy && <Techy />}
    </>
  );
}

export default App