/* eslint-disable radix */
import { addDays, endOfMonth, format, getDaysInMonth, isBefore, startOfMonth, startOfWeek } from 'date-fns';
import React, { useState } from 'react';
import styled, {css} from 'styled-components';

type Props = {
    month: Date | number,
    handleSelectDay: (day: number | Date) => void,
    minDate?: number | Date,
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', ' Sat'];

export default function MonthDays({month, handleSelectDay, minDate}: Props) {
    const startDays = [];
    const currentDays = [];
    const endDays = [];
    let monthDays = [];

    const minimumDate = minDate || new Date();

    // console.log('Min date: ', minDate);
 
    const selectedMonth = parseInt(format(month, 'M')) - 1;
    const selectedDay = parseInt(format(month, 'd'));
    // const monthDate = new Date(2021, selectedMonth, 1);
    // const nextMonth = addMonths(month, 1);

    const numDaysInMonth = getDaysInMonth(month);
    const startofMonth = startOfMonth(month);
    const endofMonth = endOfMonth(month);

    // The values range from 1 to 7.
    const startWeekDayOfMonth = format(startofMonth, 'i');
    const endWeekDayOfMonth = format(endofMonth, 'i');

    const startDayofFirstWeek = startOfWeek(startofMonth);

    // const endDayofLastWeek = endOfWeek(new Date(endOfMonth));
    // const startDayOfWeek = format(startDayofFirstWeek, 'd');
    // const weekDayOfFirstWeek = format(startDayofFirstWeek, 'i');

    currentDays.push(startofMonth);

    // eslint-disable-next-line no-unused-expressions
    (parseInt(startWeekDayOfMonth) !== 7) && startDays.push(startDayofFirstWeek);

    if (parseInt(startWeekDayOfMonth) !== 7) {
        for (let i = 1; i < (parseInt(startWeekDayOfMonth)); i++) {
            const day = addDays(startDayofFirstWeek, i);
            startDays.push(day);
        }
    }

    for (let i = 1; i < numDaysInMonth; i++) {
        const day = addDays(startofMonth, i);
        currentDays.push(day);
    }

    const diffDays = parseInt(endWeekDayOfMonth) === 7 ? 7 : 7 - parseInt(endWeekDayOfMonth);
    
    for (let i = 1; i < diffDays; i++) {
        const day = addDays(endofMonth, i);
        endDays.push(day);
    }

    monthDays = [...startDays, ...currentDays, ...endDays];
    // console.log('Month days: ', monthDays);

    return (
        <MonthDaysWrapper>
            <MonthDaysContainer>
                <WeekDays/>
                <DaysContainer>
                    {
                        monthDays.map((day, index) => {
                            const inMonth = parseInt(format(day, 'M')) === selectedMonth + 1;
                            const isSelected = parseInt(format(day, 'd')) === selectedDay && inMonth;
                            const isDisabled = isBefore(new Date(day), new Date(minimumDate));
                            return (
                                <Day
                                    key={index}
                                    isNotMonth={!inMonth}
                                    isSelected={isSelected}
                                    isDisabled={isDisabled}
                                    onClick={() => !isDisabled && handleSelectDay(day)}
                                >{format(day, 'd')}</Day>
                            );
                        })
                    }
                </DaysContainer>
            </MonthDaysContainer>
        </MonthDaysWrapper>
    );
}

const WeekDays = () => (
    <WeekDaysContainer>
        {
            weekdays.map((day, index) => (
                <WeekDay key={index}>{day}</WeekDay>
            ))
        }
    </WeekDaysContainer>
);

type StyledProps = {
    isNotMonth: boolean,
    isSelected: boolean,
    isDisabled: boolean
}

const MonthDaysWrapper = styled.div`
    flex: 1;
    display: flex;
    height: 12.25rem;
    justify-content:center;
`;

const MonthDaysContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const WeekDaysContainer = styled.div`
    height: var(--space-20);
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const WeekDay = styled.div`
    height: 100%;
    width: 2.25rem;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: var(--space-12);
    line-height: var(--space-12);
    /* identical to box height, or 100% */

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    /* default/gray/100 */

    color: var(--color-gray-100);

`;

const DaysContainer = styled.div`
    flex: 1;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, auto);
`;

const Day = styled.div<StyledProps>`
    height: 2rem;
    width: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: var(--space-14);
    line-height: var(--space-14);

    cursor: pointer;
    color: var(--color-gray-400);
    ${props => props.isNotMonth && css`
        color: var(--color-gray-500);
    `}

    ${props => props.isSelected && css`
        background: #9E7AE7;
        border: 2px solid #9E7AE7;
        box-sizing: border-box;
        border-radius: 4px;
        color: var(--color-white);
    `}

    ${props => props.isDisabled && css`
        color: var(--color-gray-700);
    `}
 
`;
