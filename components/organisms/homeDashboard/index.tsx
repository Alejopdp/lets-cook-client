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
            <ThreeBoxesRow
                firstBox={<DoughnutChartWithPaper title="Doughnut chart" />}
                secondBox={<LineChartWithPaper title="Line Chart" />}
                thirdBox={<LineChartWithPaper title="Line Chart" />}
            />
            <FourBoxesRow
                firstBox={<CounterChartWithPaper title={"Billed money"} count={5400000} />}
                secondBox={<CounterChartWithPaper title={"Cancelled money"} count={110523} />}
                thirdBox={<CounterChartWithPaper title={"Subscriptions count"} count={700} />}
                fourthBox={<CounterChartWithPaper title={"Active customers"} count={100} />}
            />
        </>
    );
};

export default HomeDashboard;
