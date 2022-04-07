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
import TableWithPaper from "components/molecules/tableWithPaper";
import LineChartWithCounterAndPaper from "components/molecules/LineChartWithCounterAndPaper";

const recipesChoiceSelection1 = [70, 25, 50, 15, 0];
const recipesChoiceSelection2 = [30, 15, 10, 5, 20];
const personsChoiceSelection1 = [85, 25, 50];
const personsChoiceSelection2 = [55, 15, 10];
const recipeChoiceRows = [
    [{ value: "Gourmet" }, { value: "70" }, { value: "30" }, { value: "70%" }],
    [{ value: "Familiar" }, { value: "25" }, { value: "15" }, { value: "63%" }],
    [{ value: "Vegetariano" }, { value: "50" }, { value: "10" }, { value: "83%" }],
    [{ value: "Vegano" }, { value: "15" }, { value: "5" }, { value: "75%" }],
    [{ value: "Ahorro" }, { value: "0" }, { value: "20" }, { value: "0%" }],
    [{ value: "Total" }, { value: "160" }, { value: "80" }, { value: "67%" }],
];

const personsChoiceRows = [
    [{ value: "2 Personas" }, { value: "85" }, { value: "55" }, { value: "61%" }],
    [{ value: "3 Personas" }, { value: "25" }, { value: "15" }, { value: "63%" }],
    [{ value: "4 Personas" }, { value: "50" }, { value: "10" }, { value: "83%" }],
    [{ value: "Total" }, { value: "160" }, { value: "80" }, { value: "67%" }],
];

export const HomeDashboard = () => {
    return (
        <>
            {/* RECIPES TITLE */}
            <CreateDashboardTitle createButtonText="FILTRO" dashboardTitle="Métricas" handleCreateButton={() => ""} />
            <TwoBoxesRow
                firstBox={
                    <TableWithPaper
                        paperTitle={""}
                        headers={["", "Ya eligió recetas", "No eligió recetas", ""]}
                        rows={recipeChoiceRows}
                        withTotal={true}
                    />
                }
                secondBox={
                    <BarChartWithPaper
                        labels={["Gourmet", "Familiar", "Vegetariano", "Vegano", "Ahorro"]}
                        title={"Agrupado por plan"}
                        firstData={recipesChoiceSelection1}
                        secondData={recipesChoiceSelection2}
                    />
                }
            />
            <TwoBoxesRow
                firstBox={
                    <TableWithPaper
                        paperTitle={""}
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
            <TwoBoxesRow
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
            />
        </>
    );
};

export default HomeDashboard;
