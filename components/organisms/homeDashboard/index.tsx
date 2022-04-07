// Utils & config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

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

const recipesChoiceSelection1 = [70, 25, 50, 15, 0];
const recipesChoiceSelection2 = [30, 15, 10, 5, 20];
const personsChoiceSelection1 = [85, 25, 50];
const personsChoiceSelection2 = [55, 15, 10];

export const HomeDashboard = () => {
    return (
        <>
            {/* RECIPES TITLE */}
            <CreateDashboardTitle createButtonText="FILTRO" dashboardTitle="Métricas" handleCreateButton={() => ""} />
            <TwoBoxesRow
                firstBox={<LineChartWithPaper title={"Line chart"} />}
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
                secondBox={
                    <BarChartWithPaper
                        title="Agrupado por personas"
                        labels={["2 Personas", "3 Personas", "4 Personas"]}
                        firstData={personsChoiceSelection1}
                        secondData={personsChoiceSelection2}
                    />
                }
                firstBox={<LineChartWithPaper title="Line Chart" />}
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
