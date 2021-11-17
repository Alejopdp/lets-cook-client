import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { presentNumberWithHashtagAndDotSeparator } from "helpers/utils/utils";

const OrdersDenseTable = (props) => {
    const router = useRouter();

    return (
        <TableContainer component={Paper} elevation={0}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {props.columns.map((column) => (
                            <TableCell align={column.align}>{column.text}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">
                                {row.number && row.number !== 0 ? presentNumberWithHashtagAndDotSeparator(row.number) : row.id}
                            </TableCell>
                            <TableCell align="left">{row.planName}</TableCell>
                            <TableCell align="left">{row.planVariant}</TableCell>
                            <TableCell align="left">{row.frequency}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => router.push({ pathname: "/ordenes/detalle-orden", query: { id: row.id } })}>
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersDenseTable;
