import React from "react";
import Category from "../components/Category";
import { useState } from "react";
import data1 from "../content/sports_boys_data.json";
import data2 from "../content/sports_girls_data.json";
import data3 from "../content/culti_data.json";
import data4 from "../content/techy_data.json";

function Events() {
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
    };

    return (
        <>
        <div className="flex">
            <NavBar />
        </div>
        {showSportsBoys && (
            <Category
            title={data1.title}
            blocknames={data1.blocknames}
            games={data1.games}
            points={data1.points}
            />
        )}
        {showSportsGirls && (
            <Category
            title={data2.title}
            blocknames={data2.blocknames}
            games={data2.games}
            points={data2.points}
            />
        )}
        {showCulti && (
            <Category
            title={data3.title}
            blocknames={data3.blocknames}
            games={data3.games}
            points={data3.points}
            />
        )}
        {showTechy && (
            <Category
            title={data4.title}
            blocknames={data4.blocknames}
            games={data4.games}
            points={data4.points}
            />
        )}
        </>
    );
}

export default Events;
