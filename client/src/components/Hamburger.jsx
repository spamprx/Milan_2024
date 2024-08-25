function Hamburger () {
    return (
        <div className=" relative flex flex-col gap-1 w-fit h-fit">
            <div className="flex flex-row gap-1">
                <div className="bg-amber-400 w-6 rounded-[4px] h-4"></div>
                <div className="bg-gray-400 w-3 rounded-[4px] h-4"></div>
            </div>
            <div className="flex flex-row gap-1">
                <div className="bg-gray-400 w-3 rounded-[4px] h-4"></div>
                <div className="bg-amber-400 w-6 rounded-[4px] h-4"></div>
            </div>
        </div>
    )
}

export default Hamburger