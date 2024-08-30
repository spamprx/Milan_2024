function TableMobile () {
    
    return (
        <div className="bg-[#150338] relative w-screen h-[75svh] mx-12 my-16 rounded-2xl">
            <div className={`flex flex-col w-full h-full bg-[url('/src/assets/Dropdown.png')] py-4`}>
                <div className="flex-row mx-auto">
                    <span className="bg-[#B33312] px-3 py-1 rounded-lg text-white font-semibold">SPORTS</span>
                    <span className="bg-[#2C88AD] px-3 py-1 m-2 rounded-lg text-white font-semibold">CULTURALS</span>
                    <span className="bg-[#A9AB4A] px-3 py-1 rounded-lg text-white font-semibold">SCI-TECH</span>
                </div>
            </div>
        </div>
    )
}

export default TableMobile