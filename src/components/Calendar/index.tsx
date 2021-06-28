import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { format, isBefore } from 'date-fns';

// Assets
import calendarUpArrow from '../../assets/svg/calendar_arrow_up.svg';
import calendarDownArrow from '../../assets/svg/calendar_arrow_down.svg';

import Years from './Years';
import MonthDays from './MonthDays';
import Months from './Months';

type Props = {
    minDate?: number | Date,
    handleDateChange: (date: Date | number | string) => void,
}

const Calendar: FunctionComponent<Props> = ({minDate, handleDateChange}) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(true);
    const [isMonthsShown, setIsMonthsShown] = useState<boolean>(false);
    const [isYearsShown, setIsYearsShown] = useState<boolean>(false);

    function parsedDate(date: number | Date, str: string) {
        return parseInt(format(date, str), 10);
    }

    const [selectedDay, setSelectedDay] = useState<number>(parseInt(format(new Date(), 'd'), 10));
    const [selectedMonth, setSelectedMonth] = useState<number>(parseInt(format(new Date(), 'M'), 10) - 1);
    const [selectedYear, setSelectedYear] = useState<number>(parseInt(format(new Date(), 'yyyy'), 10));
    const [currentDateMonth, setCurrentDateMonth] = useState<Date>(new Date(selectedYear, selectedMonth, selectedDay));

    const [startingYear, setStartingYear] = useState(parsedDate(new Date(), 'yyyy'));

    useEffect(() => {
        if (minDate) {
            const isMinDateBefore = isBefore(minDate, new Date());
            if (!isMinDateBefore) {
                const day = parsedDate(minDate, 'd');
                const month = parsedDate(minDate, 'M');
                const year = parsedDate(minDate, 'yyyy');
                setSelectedDay(day);
                setSelectedMonth(month);
                setSelectedYear(year);

                setCurrentDateMonth(new Date(day, month, year));
            }
        }
    }, [minDate]);

    useEffect(() => {
        const currentYear = parsedDate(new Date(), 'yyyy');
        const difInYears = currentYear % 10;
        if (difInYears === 0) {
            setStartingYear(currentYear);
        } else {
            setStartingYear(currentYear - difInYears);
        }
    }, []);

    useEffect(() => {
        setCurrentDateMonth(new Date(selectedYear, selectedMonth, selectedDay));
    }, [selectedDay, selectedMonth, selectedYear]);

    useEffect(() => {
        handleDateChange(currentDateMonth);
    }, [currentDateMonth]);

    const handleShownMonth = () => {
        console.log('Handle show month');
        if (isYearsShown) {
            setIsYearsShown(false);
        }
        setIsMonthsShown(!isMonthsShown);
    };

    const handleShowYear = () => {
        console.log('Handle show year');
        if (isMonthsShown) {
            setIsMonthsShown(false);
        }
        
        setIsYearsShown(!isYearsShown);
    };

    const handleCloseCalendar = () => {
        setIsCalendarOpen(false);
    };

    const getFormattedDate = (date: Date | number) => {
        const formattedDay = parsedDate(date, 'd');
        const formattedMonth = parsedDate(date, 'M') - 1;
        const formattedYear = parsedDate(date, 'yyyy');
        return {formattedDay, formattedMonth, formattedYear};
    };

    const handleSelectDay = (day: number | Date) => {
        const {formattedDay: dayValue, formattedMonth: monthValue, formattedYear: yearValue } = getFormattedDate(day);

        if (yearValue !== selectedYear) {
            setSelectedYear(yearValue);
        }
        if (monthValue !== selectedMonth) {
            setSelectedMonth(monthValue);
        }
        setSelectedDay(dayValue);
    };

    const handleSelectedYear = (year: number) => {
        // Select a year:
        //      - If the selected year is greater than the minimum year, then the year can be selected.
        //      - If the selected year is the same as the minimum year, then the selecred date (month and day) needs to be greater than the minimum.
        // - If calendar is in range mode:
        //      - The year selected must be in between the minRangeYear and the maxRangeYear
        const canSelectYear = () => {
            const minimumDate = minDate || new Date();
            const { formattedDay: minDay, formattedMonth: minMonth, formattedYear: minYear} = getFormattedDate(minimumDate);
            
            if (year > minYear) return true;
            if (year === minYear) {
                if (selectedMonth > minMonth) {
                    return true;
                }
                if (selectedMonth === minMonth) {
                    if (selectedDay > minDay || selectedDay === minDay) {
                        return true;
                    }
                }
            }
            
            return false;
        };

        const dateCondition = canSelectYear();

        if (dateCondition) {
            console.log('Selcted year: ', selectedYear);
            setSelectedYear(year);
        }
    };

    const handleSelectedMonth = (month: number) => {
        // Month can be selected if:
        //      - If the year is greater than the start year, any month can be selected.
        //      - If the year is the same as the start year, only the months greater than or equal to the start month can be selected.
        // - If calendar is in range mode:
        //      - If the year is the same as the minRangeYear, nly the months greater than or equal to the minRange month can be selected.
        //      - If the year is greater than the minRangeTe
        const minimumDate = minDate || new Date();
        const { formattedMonth: minMonth, formattedYear: minYear} = getFormattedDate(new Date(minimumDate));

        if (selectedYear > minYear) {
            setSelectedMonth(month);
        } else if (selectedYear === minYear) {
            if (minMonth <= month) {
                setSelectedMonth(month);
            }
        }
    };

    const content = () => {
        if (!isMonthsShown && !isYearsShown) {
            return (
                <MonthDays
                    month={currentDateMonth}
                    handleSelectDay={handleSelectDay}
                    minDate={minDate}
                />
            );
        }

        if (isMonthsShown) {
            return (
                <Months
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    handleSelectedMonth={handleSelectedMonth}
                />
            );
        }

        if (isYearsShown) {
            return (
                <Years
                    selectedYear={selectedYear}
                    handleSelectedYear={handleSelectedYear}
                    startingYear={startingYear}
                />
            );
        }
    };

    return (
        isCalendarOpen ?
            (
                <CalendarWrapper className="calendar-wrapper">
                    <CalendarContainer className="calendar-container">
                        <CalendarMonthContainer>
                        
                            <Arrow
                                onClick={() => handleShownMonth()}
                                src={isMonthsShown ? calendarUpArrow : calendarDownArrow}
                                style={{marginRight: '1rem'}}
                            />
                            {format(currentDateMonth, 'MMMM')}
                             
                        </CalendarMonthContainer>

                        <CalendarContent>
                            {content()}
                        </CalendarContent>

                        <CalendarFooter>
                            <CalendarYearContainer>
                                <Arrow
                                    onClick={() => handleShowYear()}
                                    src={isYearsShown ? calendarUpArrow : calendarDownArrow}
                                    style={{marginRight: '0.813rem'}}
                                />
                                {format(currentDateMonth, 'yyyy')}
                            </CalendarYearContainer>
                            <CalendarButton
                                onClick={() => handleCloseCalendar()}
                            >
                                Close
                            </CalendarButton>
                        </CalendarFooter>
            
                    </CalendarContainer>
                </CalendarWrapper>
            ) : <div/>
        
    );
};

export default Calendar;

const CalendarWrapper = styled.div`
    height: 20rem;
    width: 20rem;
`;

const CalendarContainer = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--space-16) 1.375rem;
    background: linear-gradient(180deg, 
        rgba(67, 76, 82, 0.4) 0%, 
        rgba(67, 75, 82, 0.4) 4.14%, 
        rgba(67, 75, 82, 0.4) 8.28%, 
        rgba(66, 74, 81, 0.4) 12.41%, 
        rgba(65, 73, 80, 0.4) 16.55%, 
        rgba(64, 72, 78, 0.4) 20.69%, 
        rgba(63, 70, 76, 0.4) 24.83%, 
        rgba(61, 68, 74, 0.4) 28.97%, 
        rgba(59, 66, 72, 0.4) 33.1%, 
        rgba(58, 64, 70, 0.4) 37.24%, 
        rgba(56, 63, 68, 0.4) 41.38%, 
        rgba(55, 61, 67, 0.4) 45.52%, 
        rgba(54, 60, 66, 0.4) 49.66%, 
        rgba(54, 60, 65, 0.4) 53.79%, 
        rgba(53, 59, 64, 0.4) 57.93%, 
        rgba(53, 59, 64, 0.4) 62.07%),
        #353B40;
    box-shadow: 0px 4px 4px rgba(86, 86, 86, 0.17);
    border-radius: 4px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: bold;
`;

const CalendarMonthContainer = styled.div`
    height: 1.5rem;
    width: 100%;

    font-size: var(--space-24);
    line-height: var(--space-24);

    display: flex;
    align-items: center;

    color: var(--color-white);
`;

const CalendarContent = styled.div`
    flex: 1;
    /* margin-top: 1.875rem; */
    /* max-height: 12.25rem; */
`;

const CalendarFooter = styled.div`
    height: 1.25rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    align-items: center;

    flex-shrink: 1;
`;

const CalendarYearContainer = styled.div`
    font-size: var(--space-20);
    line-height: var(--space-20);

    display: flex;
    align-items: center;

    color: var(--color-gray-100);
`;

const Arrow = styled.img`
    width: var(--space-24);
    cursor: pointer;
`;

const CalendarButton = styled.button`
    padding: 0;
    margin: 0;
    background: none;
    border:0;
    outline: none;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: var(--font-16);
    line-height: var(--font-16);
    /* identical to box height, or 100% */

    display: flex;
    align-items: center;
    text-align: center;

    /* default/gray/500 */

    color: var(--color-gray-500);
    cursor: pointer;
`;
