/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import MonthYearPicker from '../MonthYearPicker';

type Props = {
    selectedMonth: number,
    handleSelectedMonth: (month: number) => void,
    [x: string]: any
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Months({ selectedMonth, handleSelectedMonth }: Props) {
    const [selected, setSelected] = useState<string>('');

    useEffect(() => {
        setSelected(months[selectedMonth]);
    }, []);

    const handleMonth = (index: number) => {
        handleSelectedMonth(index);
    };
    
    return (
        <MonthYearPicker
            data={months}
            handleSelectedItem={handleMonth}
            selectedItem={selected}
        />
    );
}
