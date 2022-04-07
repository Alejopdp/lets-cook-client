// Utils & Config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { translateFrequency } from "../../../../helpers/i18n/i18n";
import { visuallyHidden } from "@material-ui/utils";

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TablePagination from "@material-ui/core/TablePagination";
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

interface TableWithPaperProps {
    paperTitle: string;
    headers: string[];
    rows: { value: string }[][];
    withTotal?: boolean;
}

const TableWithPaper = ({ headers, rows, paperTitle, withTotal }: TableWithPaperProps) => {
    const { table, cellStyle, totalRow } = useStyles();

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
                                {row.map((cell, index) => (
                                    <TableCell key={index} className={cellStyle}>
                                        <Typography variant="body1">{cell.value}</Typography>
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
