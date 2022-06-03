// Utils & config
import React, { useMemo, useState } from "react";

// External components
import { CircularProgress } from "@material-ui/core";

// Internal components
import CreateDashboardTitle from "../../molecules/createDsahboardTitle/createDashboardTitle";
import TwoBoxesRow from "./twoBoxesRow";
import BarChartWithPaper from "components/molecules/barChartWithPaper";
import TableWithPaper, { TableRow } from "components/molecules/tableWithPaper";
import { Grid } from "@material-ui/core";
import useMetrics from "hooks/useMetrics";

const personsChoiceSelection1 = [85, 25, 50];
const personsChoiceSelection2 = [55, 15, 10];

const personsChoiceRows: TableRow[] = [
    [{ value: "2 Personas" }, { value: "85" }, { value: "55" }, { value: "61%" }],
    [{ value: "3 Personas" }, { value: "25" }, { value: "15" }, { value: "63%" }],
    [{ value: "4 Personas" }, { value: "50" }, { value: "10" }, { value: "83%" }],
    [{ value: "Total" }, { value: "160" }, { value: "80" }, { value: "67%" }],
];

export const HomeDashboard = () => {
    const { metrics, refreshMetrics, isLoading } = useMetrics();
    const [isUpdateing, setIsUpdating] = useState(false);

    const metricsRows: TableRow[] = useMemo(() => {
        return [
            [
                { value: "Total pedidos" },
                { value: metrics.currentWeekOrdersQty },
                { value: metrics.nextWeekOrdersQty },
                { value: metrics.ordersQtyPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Facturación (€ IVA incluido)" },
                { value: metrics.currentWeekBilledAmount, isMoney: true },
                { value: metrics.nextWeekBilledAmount, isMoney: true },
                { value: metrics.billedAmountPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "€/pedido" },
                { value: metrics.currentWeekBilledAmountAvg, isMoney: true },
                { value: metrics.nextWeekBilledAmountAvg, isMoney: true },
                { value: metrics.billedAmountAvgPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Raciones" },
                { value: metrics.currentWeekNumberOfPersons },
                { value: metrics.nextWeekNumberOfPersons },
                { value: metrics.numberOfPersonsPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Raciones/pedido" },
                { value: metrics.currentWeekNumberOfPersonsAvg },
                { value: metrics.nextWeekNumberOfPersonsAvg },
                { value: metrics.numberOfPersonsAvgPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Total kits para cocinar" },
                { value: metrics.currentWeekKitsForCooking },
                { value: metrics.nextWeekKitsForCooking },
                { value: metrics.kitsForCookingPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Total planes adicionales" },
                { value: metrics.currentWeekAdditionalOrdersQty },
                { value: metrics.nextWeekAdditionalOrdersQty },
                { value: metrics.additionalOrdersQtyPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Clientes nuevos" },
                { value: metrics.currentWeekNewCustomersQty },
                { value: metrics.nextWeekNewCustomersQty },
                { value: metrics.newCustomersQtyPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Leads nuevos" },
                { value: metrics.currentWeekNewLeads },
                { value: metrics.nextWeekNewLeads },
                { value: metrics.newLeadsPercentage, percentage: true, indicator: true },
            ],
            [
                { value: "Planes cancelados" },
                { value: metrics.currentWeekCancelledSubscriptionsQty },
                { value: metrics.nextWeeekCancelledSubscriptionsQty },
                { value: "" },
            ],
            [
                { value: "Media semana recibida" },
                { value: metrics.currentWeekhalfWeekReceived },
                { value: metrics.nextWeekHalfWeekReceived },
                { value: "" },
            ],
            [
                { value: "Clientes activos" },
                { value: metrics.currentWeekActiveCustomers },
                { value: metrics.nextWeekActiveCustomers },
                { value: "" },
            ],
            [{ value: "% Salta semana" }, { value: metrics.currentWeekSkippedAvg }, { value: metrics.nextWeekSkippedAvg }, { value: "" }],
        ];
    }, [metrics]);

    const recipesChoiceRows: TableRow[] = useMemo(() => {
        const tableRows: TableRow[] = Object.entries(metrics.chosenRecipesGroupedByPlan).map(([plan, data]) => {
            return [
                { value: plan },
                { value: data.chosenRecipes },
                { value: data.notChosenRecipes },
                { value: data.percentage, percentage: true },
            ];
        });

        const totalRow: TableRow = tableRows.reduce(
            (acc, row) => [
                { value: "Total" },
                { value: (acc[1].value as number) + (row[1].value as number) },
                { value: (acc[2].value as number) + (row[2].value as number) },
            ],
            [{ value: "Total" }, { value: 0 }, { value: 0 }]
        );

        return [
            ...tableRows,
            [
                ...totalRow,
                {
                    value: Math.ceil(
                        ((totalRow[1].value as number) / ((totalRow[1].value as number) + (totalRow[2].value as number))) * 100
                    ),
                    percentage: true,
                },
            ],
        ];
    }, [metrics]);

    const recipesChoiceRowsByNumberOfPersons: TableRow[] = useMemo(() => {
        const tableRows: TableRow[] = Object.entries(metrics.chosenRecipesGroupedByNumberOfPersons).map(([numberOfPersons, data]) => {
            return [
                { value: parseInt(numberOfPersons) === 1 ? "1 Persona" : `${numberOfPersons} Personas` },
                { value: data.chosenRecipes },
                { value: data.notChosenRecipes },
                { value: data.percentage, percentage: true },
            ];
        });

        const totalRow: TableRow = tableRows.reduce(
            (acc, row) => [
                { value: "Total" },
                { value: (acc[1].value as number) + (row[1].value as number) },
                { value: (acc[2].value as number) + (row[2].value as number) },
            ],
            [{ value: "Total" }, { value: 0 }, { value: 0 }]
        );

        return [
            ...tableRows,
            [
                ...totalRow,
                {
                    value: Math.ceil(
                        ((totalRow[1].value as number) / ((totalRow[1].value as number) + (totalRow[2].value as number))) * 100
                    ),
                    percentage: true,
                },
            ],
        ];
    }, [metrics]);

    // TO DO: This causes 3 renders
    const updateMetrics = async () => {
        setIsUpdating(true);
        await refreshMetrics();
        setIsUpdating(false);
    };

    return (
        <>
            {/* RECIPES TITLE */}
            <CreateDashboardTitle
                createButtonText="ACTUALIZAR"
                dashboardTitle="Métricas"
                handleCreateButton={updateMetrics}
                isButtonDisabled={isUpdateing}
                showCreateButton={true}
            />
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
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
                                paperTitle={"Agrupado por planes"}
                                headers={["", "Ya eligió recetas", "No eligió recetas", ""]}
                                rows={recipesChoiceRows}
                                withTotal={true}
                            />
                        }
                        secondBox={
                            <BarChartWithPaper
                                labels={recipesChoiceRows.map((row) => row[0].value as string)}
                                title={"Agrupado por planes"}
                                firstData={recipesChoiceRows.map((row) => row[1].value as number)}
                                secondData={recipesChoiceRows.map((row) => row[2].value as number)}
                            />
                        }
                    />
                    <TwoBoxesRow
                        firstBox={
                            <TableWithPaper
                                paperTitle={"Agrupado por personas"}
                                headers={["", "Ya eligió recetas", "No eligió recetas", ""]}
                                rows={recipesChoiceRowsByNumberOfPersons}
                                withTotal
                            />
                        }
                        secondBox={
                            <BarChartWithPaper
                                title="Agrupado por personas"
                                labels={["2 Personas", "3 Personas", "4 Personas"]}
                                firstData={recipesChoiceRowsByNumberOfPersons.map((row) => row[1].value as number)}
                                secondData={recipesChoiceRowsByNumberOfPersons.map((row) => row[2].value as number)}
                            />
                        }
                    />
                </>
            )}
        </>
    );
};

export default HomeDashboard;
