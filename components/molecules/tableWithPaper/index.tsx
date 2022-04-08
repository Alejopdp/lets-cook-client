// Utils & Config
import React, { ReactChild, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ArrowUpward, ArrowDownward, CallMade, ArrowForward } from "@material-ui/icons";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    cells: {
        padding: theme.spacing(0.5),
        paddingRight: theme.spacing(1),
    },
    cellStyle: {
        // paddingLeft: theme.spacing(6),
        // paddingRight: theme.spacing(5)
    },

    totalRow: {
        borderTop: "5px solid #e0e0e0",
    },
}));

interface TableCell {
    value: string;
    percentage?: boolean;
    indicator?: boolean;
}

export type TableRow = TableCell[];

interface TableWithPaperProps {
    paperTitle: string;
    headers: string[];
    rows: TableRow[];
    withTotal?: boolean;
}

const TableWithPaper = ({ headers, rows, paperTitle, withTotal }: TableWithPaperProps) => {
    const { table, cellStyle, totalRow } = useStyles();

    const getCellValue = (cell: TableCell): string => {
        let finalString = cell.value;

        if (cell.percentage) finalString = `${finalString}%`;

        return finalString;
    };

    const getIndicatorIcon = (cell: TableCell): ReactChild => {
        const style = { marginRight: 8 };
        const value = parseInt(cell.value);
        if (value < 0) return <ArrowDownward style={{ ...style, color: "red" }} />;
        if (value < 4) return <ArrowForward style={{ ...style, color: "#f1c232" }} />;
        if (value < 5) return <CallMade style={{ ...style, color: "#f1c232" }} />;

        return <ArrowUpward style={{ ...style, color: "#00A555" }} />;
    };

    return (
        <PaperWithTitleContainer flex={true} title={paperTitle} fullWidth={true} fontSize={20}>
            <TableContainer component={Paper}>
                <Table className={table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell className={cellStyle}>
                                    <Typography variant="subtitle1">{header}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} className={withTotal && index === rows.length - 1 ? totalRow : ""}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex} className={cellStyle}>
                                        <Typography
                                            variant="body1"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontWeight: withTotal && index === rows.length - 1 ? 700 : 400,
                                            }}
                                        >
                                            {cell.indicator ? getIndicatorIcon(cell) : <></>} {getCellValue(cell)}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PaperWithTitleContainer>
    );
};

export default TableWithPaper;
