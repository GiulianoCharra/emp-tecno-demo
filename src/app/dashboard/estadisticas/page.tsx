"use client";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const emissionsData = {
  2023: [
    {
      name: "Ene",
      total: 1.5,
      edificios: 0.5,
      vehiculos: 0.3,
      maquinaria: 0.2,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Feb",
      total: 1.4,
      edificios: 0.4,
      vehiculos: 0.3,
      maquinaria: 0.2,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Mar",
      total: 1.6,
      edificios: 0.5,
      vehiculos: 0.4,
      maquinaria: 0.2,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Abr",
      total: 1.3,
      edificios: 0.4,
      vehiculos: 0.3,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "May",
      total: 1.5,
      edificios: 0.5,
      vehiculos: 0.3,
      maquinaria: 0.2,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Jun",
      total: 1.4,
      edificios: 0.4,
      vehiculos: 0.3,
      maquinaria: 0.2,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Jul",
      total: 1.3,
      edificios: 0.4,
      vehiculos: 0.3,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Ago",
      total: 1.2,
      edificios: 0.4,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Sep",
      total: 1.1,
      edificios: 0.3,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Oct",
      total: 1.0,
      edificios: 0.3,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.2,
    },
    {
      name: "Nov",
      total: 0.9,
      edificios: 0.3,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.1,
    },
    {
      name: "Dic",
      total: 0.8,
      edificios: 0.2,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.1,
    },
  ],
  2024: [
    {
      name: "Ene",
      total: 1.2,
      edificios: 0.4,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Feb",
      total: 1.1,
      edificios: 0.3,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Mar",
      total: 1.3,
      edificios: 0.4,
      vehiculos: 0.3,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
    {
      name: "Abr",
      total: 1.0,
      edificios: 0.3,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.2,
    },
    {
      name: "May",
      total: 0.9,
      edificios: 0.3,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.1,
    },
    {
      name: "Jun",
      total: 1.1,
      edificios: 0.3,
      vehiculos: 0.2,
      maquinaria: 0.1,
      personal: 0.1,
      suministro: 0.1,
      energia: 0.3,
    },
  ],
};

export default function StatisticsComponent() {
  const [selectedYear, setSelectedYear] = useState<"2023" | "2024">("2024");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [chartData, setChartData] = useState(emissionsData["2024"]);
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);
  const [categoryTotals, setCategoryTotals] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    const filteredData = emissionsData[selectedYear].filter((item) => {
      if (!dateRange || !dateRange.from || !dateRange.to) return true;
      const itemDate = new Date(
        parseInt(selectedYear),
        [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ].indexOf(item.name),
        1
      );
      return itemDate >= dateRange.from && itemDate <= dateRange.to;
    });
    setChartData(filteredData);

    // Calculate total emissions for pie chart
    const totalEmissions = filteredData.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const pieData = [
      {
        name: "Edificios",
        value: filteredData.reduce((sum, item) => sum + item.edificios, 0),
      },
      {
        name: "Vehículos",
        value: filteredData.reduce((sum, item) => sum + item.vehiculos, 0),
      },
      {
        name: "Maquinaria",
        value: filteredData.reduce((sum, item) => sum + item.maquinaria, 0),
      },
      {
        name: "Personal",
        value: filteredData.reduce((sum, item) => sum + item.personal, 0),
      },
      {
        name: "Suministro",
        value: filteredData.reduce((sum, item) => sum + item.suministro, 0),
      },
      {
        name: "Energía",
        value: filteredData.reduce((sum, item) => sum + item.energia, 0),
      },
    ];
    setPieChartData(pieData);

    // Update category totals
    setCategoryTotals(pieData);
  }, [selectedYear, dateRange]);

  const calculateYearlyChange = () => {
    const currentYearTotal = emissionsData[selectedYear].reduce(
      (sum, item) => sum + item.total,
      0
    );
    const previousYear = selectedYear === "2024" ? "2023" : "2024";
    const previousYearTotal = emissionsData[previousYear].reduce(
      (sum, item) => sum + item.total,
      0
    );
    const change =
      ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100;
    return change.toFixed(2);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Estadísticas de Huella de Carbono
      </h1>

      <div className="flex justify-between items-center mb-4">
        <Select
          value={selectedYear}
          onValueChange={(value) => setSelectedYear(value as "2023" | "2024")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">Periodo 2023</SelectItem>
            <SelectItem value="2024">Periodo 2024</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange
          date={dateRange}
          setDate={setDateRange}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Emisiones Totales</CardTitle>
            <CardDescription>
              Total de emisiones en el periodo seleccionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {chartData.reduce((sum, item) => sum + item.total, 0).toFixed(2)}{" "}
              toneladas CO2e
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cambio Anual</CardTitle>
            <CardDescription>Comparación con el año anterior</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{calculateYearlyChange()}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Promedio Mensual</CardTitle>
            <CardDescription>Emisiones promedio por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {(
                chartData.reduce((sum, item) => sum + item.total, 0) /
                chartData.length
              ).toFixed(2)}{" "}
              toneladas CO2e
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Emisiones</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total"
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Emisiones</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Desglose de Emisiones por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={400}
            >
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="edificios"
                  stackId="a"
                  fill="#0088FE"
                />
                <Bar
                  dataKey="vehiculos"
                  stackId="a"
                  fill="#00C49F"
                />
                <Bar
                  dataKey="maquinaria"
                  stackId="a"
                  fill="#FFBB28"
                />
                <Bar
                  dataKey="personal"
                  stackId="a"
                  fill="#FF8042"
                />
                <Bar
                  dataKey="suministro"
                  stackId="a"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="energia"
                  stackId="a"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Agregamos la nueva sección para las emisiones por categoría */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Totales por Categoría</CardTitle>
            <CardDescription>
              Emisiones totales en toneladas CO2e por categoría.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-xl">
              {categoryTotals.map((category) => (
                <li key={category.name}>
                  <strong
                    style={{ color: COLORS[categoryTotals.indexOf(category)] }}
                  >
                    {category.name}:
                  </strong>{" "}
                  {category.value.toFixed(2)} toneladas CO2e
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
