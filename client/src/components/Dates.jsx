import React from "react";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  eachDayOfInterval,
  endOfMonth,
  isEqual,
  isSameMonth,
  isToday,
  add,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dates({
  currentMonth,
  setCurrentMonth,
  selectedDay,
  setSelectedDay,
  games,
  calendarRef,
  userPreferredGames,
  preferredTeams,
}) {
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function hasPreferredEvent(day) {
    return games.some(
      (game) =>
        isEqual(game.date, day) &&
        (userPreferredGames.includes(game.title) ||
          preferredTeams.some((team) => game.teams.includes(team)) ||
          game.teams.toLowerCase().includes("all blocks"))
    );
  }

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth ,{ weekStartsOn: 1 }),
    end: endOfMonth(firstDayCurrentMonth),
  });

  return (
    <div
      className="md:max-w-md px-6 mx-auto md:col-span-3 mb-4 bg-[#160631]/[0.85] p-4 rounded-3xl lg:translate-y-16 lg:-translate-x-16 "
      ref={calendarRef}
    >
       <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-white pb-2">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-xs bg-[#c3de16]/[0.2] rounded-2xl leading-6 text-center text-white font-semibold">
        <div className="my-2">M</div>
        <div className="my-2">T</div>
        <div className="my-2">W</div>
        <div className="my-2">TH</div>
        <div className="my-2">F</div>
        <div className="col-span-2 flex bg-yellow-500 text-black justify-around p-2 rounded-2xl">
          <span>S</span>
          <span>S</span>
        </div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day)],
              "py-1.5"
            )}
          >
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                isToday(day) && "text-rose-500",
                isEqual(day, selectedDay) && "text-white font-bold",
                !isEqual(day, selectedDay) && isToday(day) && "text-white",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-white font-semibold",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-500",
                isEqual(day, selectedDay) && isToday(day) && "bg-yellow-500",
                isEqual(day, selectedDay) && !isToday(day) && "bg-yellow-500 text-black",
                !isEqual(day, selectedDay) && "hover:bg-yellow-500",
                (isEqual(day, selectedDay) || isToday(day)) && "font-bold",
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
            {hasPreferredEvent(day) && (
              <div className="w-1 h-1 mx-auto mt-1 rounded-full bg-yellow-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
