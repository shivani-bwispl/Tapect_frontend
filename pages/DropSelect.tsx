import React from 'react';
import Link from 'next/link';
import Dropdown from '../components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';

const options = ['Option 1', 'Option 2', 'Option 3'];

const DropSelect = () => {
    const handleSelect = (selectedOption) => {
        console.log('Selected option:', selectedOption);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-2 ">
                <div id="basic">
                    <div>
                        <div className="dropdown">
                        <Dropdown
    options={options}
    onSelect={handleSelect}
    offset={[10, 10]}
    placement="bottom-start"
    btnClassName="btn btn-outline-primary dropdown-toggle"
    button={
        <>
            select Align
            <span>
                <IconCaretDown className="inline-block ltr:ml-1 rtl:mr-1" />
            </span>
        </>
    }
>
    <ul className="!min-w-[170px]">
        <li>
            <button type="button">Action</button>
        </li>
        <li>
            <button type="button">Another action</button>
        </li>
        <li>
            <button type="button">Something else here</button>
        </li>
        <li>
            <button type="button">Separated link</button>
        </li>
    </ul>
</Dropdown>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropSelect;
