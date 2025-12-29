'use client';

import { ComponentPropsWithoutRef } from "react";
import styles from "./bingo-cell.module.css";

interface BingoCellProps extends ComponentPropsWithoutRef<'div'> {
    label: string | undefined;
    isFiller: boolean;
    isSelected: boolean;
}

const BingoCell = ({ label, isFiller, isSelected, ...props }: BingoCellProps) => {
    return (
    <div className={`${styles.bingoCell} ${isFiller ? styles.filler : ''} ${isSelected ? styles.selected : ''}`} {...props}>
        {label}
    </div>
    );
}
 
export default BingoCell;