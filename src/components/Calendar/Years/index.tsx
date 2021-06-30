import React, { useEffect, useState } from 'react';

import MonthYearPicker from '../MonthYearPicker';

type Props = {
    selectedYear: number,
    handleSelectedYear: (year: number | string | any) => void,
    startingYear: number
}

export default function Years({ selectedYear, handleSelectedYear, startingYear }: Props) {
    const [years, setYears] = useState<number[]>([]);
    const [selected, setSelected] = useState<number>(selectedYear);
    
    const getYears = () => {
        const currentYears = [];
        for (let i = 0; i < 12; i++) {
            currentYears.push(startingYear + i);
        }
        setYears([...currentYears]);
    };

    useEffect(() => {
        getYears();
    }, [startingYear]);

    useEffect(() => {
        setSelected(selectedYear);
    }, [selectedYear]);
    
    const handleYear = (index: number, year: number) => {
        handleSelectedYear(year);
    };

    return (
        <MonthYearPicker
            selectedItem={selected}
            handleSelectedItem={handleYear}
            data={years}
            disabled={[]}
        />
    );
}
