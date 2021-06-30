import React, { useEffect, useState } from 'react';
import styled, {css} from 'styled-components';

type Props = {
    selectedItem: number | string,
    handleSelectedItem: (index: number, item: number | string | any) => void,
    data: number[] | string[],
    min?: number,
    disabled: number[],
    [x: string]: any
};

export default function MonthYearPicker({ selectedItem, handleSelectedItem, data = [], min, disabled}: Props) {
    const isItemSelected = (item: number | string) => {
        if (selectedItem === item) return true;
        return false;
    };

    const isDisabled = (index: number) => {
        if (disabled.includes(index)) return true;
        return false;
    };

    return (
        <PickerWrapper>
            <PickerContainer>
                {
                    data.map((dataItem, index) => (
                        <Item
                            key={index}
                            dataItem={dataItem}
                            isSelected={isItemSelected(dataItem)}
                            disabled={isDisabled(index)}
                            onSelect={() => handleSelectedItem(index, dataItem)}
                        />
                    ))
                }
            </PickerContainer>
        </PickerWrapper>
    );
}

type ItemProps = {
    dataItem: number | string,
    isSelected: boolean,
    disabled: boolean,
    onSelect: () => void
};
// eslint-disable-next-line arrow-body-style
const Item = ({ dataItem, isSelected, onSelect, disabled }: ItemProps) => {
    // console.log('Is selected: ', dataItem, isSelected);
    return (
        <ItemContainer
            isSelected={isSelected}
            disabled={disabled}
            onClick={() => onSelect()}
        >
            {dataItem}
        </ItemContainer>
    );
};

type StyleProps = {
    isSelected?: boolean,
    disabled? :boolean
}

const PickerWrapper = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PickerContainer = styled.div`
    /* flex: 1; */
    display: grid;
    grid-template-columns: auto auto auto auto;
    row-gap: 1rem;
    column-gap: 1rem;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between; */
`;

const ItemContainer = styled.div<StyleProps>`
    height: 3rem;
    width: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--color-gray-300);
    box-sizing: border-box;
    border-radius: 4px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: bold;
    font-size: var(--space-14);
    line-height: var(--space-14);
    /* default/gray/400 */

    color: var(--color-gray-400);
    cursor: pointer;
    ${props => props.isSelected && css`
        background: #9E7AE7;
        border: 2px solid #9E7AE7;
        color: var(--color-white);
    `}

    ${props => props.disabled && css`
        opacity: 0.5;
        cursor: not-allowed;
    `}
`;
