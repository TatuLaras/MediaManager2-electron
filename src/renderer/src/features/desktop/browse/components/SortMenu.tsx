import { Check, Sort, SortDown, SortUp } from 'iconoir-react';
import { useEffect, useState } from 'react';

import '../styles/sort_menu.scss';
import { BrowseItemSortFunction } from '@renderer/shared/types/common_types';

type Props = {
    onSelectSortingFunction: (sortFunction: BrowseItemSortFunction) => void;
    onResetSortingFunction: () => void;
};

interface SortingFunction {
    name: string;
    function: BrowseItemSortFunction;
    reverse: BrowseItemSortFunction;
}

const sortingFunctions: SortingFunction[] = [
    {
        name: 'A-Z',
        function: (a, b) => (a.name < b.name ? -1 : 1),
        reverse: (a, b) => (a.name < b.name ? 1 : -1),
    },
    {
        name: 'Date scanned (newest)',
        function: (a, b) =>
            new Date(b.date_scanned).valueOf() -
            new Date(a.date_scanned).valueOf(),
        reverse: (a, b) =>
            new Date(a.date_scanned).valueOf() -
            new Date(b.date_scanned).valueOf(),
    },
    {
        name: 'Release date (newest)',
        function: (a, b) =>
            new Date(b.date).valueOf() - new Date(a.date).valueOf(),
        reverse: (a, b) =>
            new Date(a.date).valueOf() - new Date(b.date).valueOf(),
    },
    {
        name: 'Random',
        function: () => {
            return Math.random() * 2 - 1;
        },
        reverse: () => {
            return Math.random() * 2 - 1;
        },
    },
];

export default function SortMenu({
    onSelectSortingFunction,
    onResetSortingFunction,
}: Props) {
    const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
    const [currentSort, setCurrentSort] = useState<number | null>(null);
    const [reverse, setReverse] = useState<boolean>(false);

    useEffect(() => {
        if (currentSort !== null && sortingFunctions[currentSort])
            onSelectSortingFunction(sortingFunctions[currentSort].function);
        else onResetSortingFunction();
    }, [currentSort]);

    return (
        <div className={`sort-menu ${sortMenuOpen ? 'open' : ''}`}>
            <Sort
                className='icon'
                onClick={() => setSortMenuOpen((old) => !old)}
            />
            <div className='pop-up'>
                <button
                    className='direction'
                    onClick={() => setReverse((old) => !old)}
                >
                    {reverse ? <SortUp /> : <SortDown />}
                </button>
                {sortingFunctions.map((sort, i) => (
                    <div
                        className={`sort-item ${i === currentSort ? 'selected' : ''}`}
                        key={i}
                        onClick={() => {
                            if (i === currentSort) setCurrentSort(null);
                            else setCurrentSort(i);
                        }}
                    >
                        <div className='icon'>
                            {i === currentSort && <Check />}
                        </div>
                        <div className='title'>{sort.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
