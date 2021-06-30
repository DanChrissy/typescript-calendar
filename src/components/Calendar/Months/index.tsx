/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import MonthYearPicker from '../MonthYearPicker';

type Props = {
    selectedMonth: number,
    handleSelectedMonth: (month: number) => void,
    minMonth: number,
    disabled: number[],
    [x: string]: any
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Months({ selectedMonth, handleSelectedMonth, minMonth, disabled }: Props) {
    const [selected, setSelected] = useState<string>('');
    useEffect(() => {
        setSelected(months[selectedMonth]);
    }, [selectedMonth]);

    const handleMonth = (index: number) => {
        handleSelectedMonth(index);
    };

    console.log('Disabled months: ', disabled);
    
    return (
        <MonthYearPicker
            data={months}
            handleSelectedItem={handleMonth}
            selectedItem={selected}
            min={minMonth}
            disabled={disabled}
        />
    );
}
