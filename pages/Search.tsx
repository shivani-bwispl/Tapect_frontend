import React from 'react';
import { useState, useEffect } from 'react';
import IconSearch from '@/components/Icon/IconSearch';

const Search = ({ images, onSearchResult }) => {
    const [search, setSearch] = useState<string>('');

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const searchResult = images.filter((item) => item.platform.includes(searchTerm));
        onSearchResult(searchTerm === '' ? [] : searchResult); // Pass search result or empty array to parent component
    };

    return (
        <>
            <div className=" grid w-[12vw] grid-cols-1 gap-6  pt-5">
                {/* Live Search */}
                <div id="live">
                    <div className="  mb-5  space-y-5">
                        <form className="mx-auto mb-5 w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Search Content"
                                    className="form-input h-11  rounded-full bg-white  shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                    onChange={handleSearch}
                                />

                                <button type="button" className="btn btn-primary absolute inset-y-0 m-auto flex h-9 w-9 items-center justify-center rounded-full p-0 ltr:right-1 rtl:left-1">
                                    <IconSearch className="mx-auto " />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
