export default function SearchBar() {
    return(
        <>
            <div className={'flex gap-2  border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'}>
                <div>anywhere</div>
                <div className={'border-l border-gray-300 '}/>
                <div>anyweek</div>
                <div className={'border-l border-gray-300'}/>
                <div>add guests</div>
                <button className={'bg-primary rounded-full text-white p-1'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </button>
            </div>
        </>
    )
}