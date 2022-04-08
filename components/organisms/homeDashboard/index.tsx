// Utils & config
import React from "react";

// External components

// Internal components
import CreateDashboardTitle from "../../molecules/createDsahboardTitle/createDashboardTitle";
import ThreeBoxesRow from "./threeBoxesRow";
import TwoBoxesRow from "./twoBoxesRow";
import FourBoxesRow from "./fourBoxesRow";
import BarChartWithPaper from "components/molecules/barChartWithPaper";
import LineChartWithPaper from "components/molecules/LineChartWithPaper";
import DoughnutChartWithPaper from "components/molecules/doughnutChartWithPaper";
import CounterChartWithPaper from "components/molecules/CounterChartWithPaper";
import TableWithPaper, { TableRow } from "components/molecules/tableWithPaper";
import LineChartWithCounterAndPaper from "components/molecules/LineChartWithCounterAndPaper";
import { Grid } from "@material-ui/core";

const recipesChoiceSelection1 = [70, 25, 50, 15, 0];
const recipesChoiceSelection2 = [30, 15, 10, 5, 20];
const personsChoiceSelection1 = [85, 25, 50];
const personsChoiceSelection2 = [55, 15, 10];
const recipeChoiceRows: TableRow[] = [
    [{ value: "Gourmet" }, { value: "70" }, { value: "30" }, { value: "70%" }],
    [{ value: "Familiar" }, { value: "25" }, { value: "15" }, { value: "63%" }],
    [{ value: "Vegetariano" }, { value: "50" }, { value: "10" }, { value: "83%" }],
    [{ value: "Vegano" }, { value: "15" }, { value: "5" }, { value: "75%" }],
    [{ value: "Ahorro" }, { value: "0" }, { value: "20" }, { value: "0%" }],
    [{ value: "Total" }, { value: "160" }, { value: "80" }, { value: "67%" }],
];

const personsChoiceRows: TableRow[] = [
    [{ value: "2 Personas" }, { value: "85" }, { value: "55" }, { value: "61%" }],
    [{ value: "3 Personas" }, { value: "25" }, { value: "15" }, { value: "63%" }],
    [{ value: "4 Personas" }, { value: "50" }, { value: "10" }, { value: "83%" }],
    [{ value: "Total" }, { value: "160" }, { value: "80" }, { value: "67%" }],
];
const metricsRows: TableRow[] = [
    [{ value: "Total pedidos" }, { value: "250" }, { value: "260" }, { value: "4", percentage: true, indicator: true }],
    [{ value: "Facturación (€ IVA incluido)" }, { value: "6555" }, { value: "6890" }, { value: "5", percentage: true, indicator: true }],
    [{ value: "€/pedido" }, { value: "26.22" }, { value: "26.50" }, { value: "1", percentage: true, indicator: true }],
    [{ value: "Raciones" }, { value: "1440" }, { value: "1532" }, { value: "6", percentage: true, indicator: true }],
    [{ value: "Raciones/pedido" }, { value: "5.76" }, { value: "5.89" }, { value: "2", percentage: true, indicator: true }],
    [{ value: "Total kits para cocinar" }, { value: "560" }, { value: "620" }, { value: "11", percentage: true, indicator: true }],
    [{ value: "Total planes adicionales" }, { value: "30" }, { value: "28" }, { value: "-7", percentage: true, indicator: true }],
    [{ value: "Clientes nuevos" }, { value: "10" }, { value: "12" }, { value: "20", percentage: true, indicator: true }],
    [{ value: "Leads nuevos" }, { value: "25" }, { value: "20" }, { value: "-20", percentage: true, indicator: true }],
    [{ value: "Planes cancelados" }, { value: "5" }, { value: "3" }, { value: "" }],
    [{ value: "Media semana recibida" }, { value: "23.2" }, { value: "23.6" }, { value: "" }],
    [{ value: "Clientes activos" }, { value: "350" }, { value: "372" }, { value: "" }],
    [{ value: "% Salta semana" }, { value: "29" }, { value: "30" }, { value: "" }],
];

export const HomeDashboard = () => {
    return (
        <>
            {/* RECIPES TITLE */}
            <CreateDashboardTitle createButtonText="FILTRO" dashboardTitle="Métricas" handleCreateButton={() => ""} />
            <Grid item xs={12}>
                <TableWithPaper
                    paperTitle={"Información general"}
                    headers={["", "Semana anterior", "Estimado próxima semana", ""]}
                    rows={metricsRows}
                />
            </Grid>
            <TwoBoxesRow
                firstBox={
                    <TableWithPaper
                        paperTitle={"Agrupado por personas"}
                        headers={["", "Ya eligió recetas", "No eligió recetas", ""]}
                        rows={recipeChoiceRows}
                        withTotal={true}
                    />
                }
                secondBox={
                    <BarChartWithPaper
                        labels={["Gourmet", "Familiar", "Vegetariano", "Vegano", "Ahorro"]}
                        title={"Agrupado por planes"}
                        firstData={recipesChoiceSelection1}
                        secondData={recipesChoiceSelection2}
                    />
                }
            />
            <TwoBoxesRow
                firstBox={
                    <TableWithPaper
                        paperTitle={"Agrupado por planes"}
                        headers={["", "Ya eligió recetas", "No eligió recetas", ""]}
                        rows={personsChoiceRows}
                        withTotal
                    />
                }
                secondBox={
                    <BarChartWithPaper
                        title="Agrupado por personas"
                        labels={["2 Personas", "3 Personas", "4 Personas"]}
                        firstData={personsChoiceSelection1}
                        secondData={personsChoiceSelection2}
                    />
                }
            />
            {/* <TwoBoxesRow
                firstBox={<DoughnutChartWithPaper title="Doughnut chart" />}
                secondBox={
                    <LineChartWithCounterAndPaper
                        title="Ventas totales"
                        totalCount={540420}
                        type="money"
                        subtitle="VENTAS A LO LARGO DEL TIEMPO"
                        lineChartLabels={[
                            "Enero",
                            "Febrero",
                            "Marzo",
                            "Abril",
                            "Mayo",
                            "Junio",
                            "Julio",
                            "Agosto",
                            "Septiembre",
                            "Octubre",
                            "Noviembre",
                            "Diciembre",
                        ]}
                        lineChartData={[25000, 30000, 35000, 10000, 40000, 10000, 80000, 20000, 40000, 60000, 190420]}
                        lineChartDataTitle="Ventas a lo largo del tiempo"
                        linechartDataSetTitle="Ventas"
                    />
                }
                // thirdBox={<LineChartWithPaper title="Line Chart" />}
            />
            <ThreeBoxesRow
                firstBox={<CounterChartWithPaper title={"Billed money"} count={257130} type={"money"} />}
                secondBox={<CounterChartWithPaper title={"Subscriptions count"} count={700} type={"money"} />}
                thirdBox={<CounterChartWithPaper title={"Active customers"} count={100} type={"money"} />}
            /> */}
        </>
    );
};

export default HomeDashboard;
