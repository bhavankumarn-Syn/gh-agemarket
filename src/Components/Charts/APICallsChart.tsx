import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const APICallsChart = () => {
    const series = [
        {
            name: "Sales",
            data: [2400, 1400, 3800, 2900, 4800, 3200, 2100],
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },

        stroke: {
            curve: "smooth",
            width: 3,
        },

        markers: {
            size: 5,
        },

        grid: {
            borderColor: "#e5e7eb",
            strokeDashArray: 4,
        },

        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },

        yaxis: {
            min: 0,
            max: 6000,
            tickAmount: 4,
        },

        colors: ["#2563eb"],
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 250,
                    },
                },
            },
        ],
    };

    return (
        <div style={{ width: "100%" }}>
            <Chart options={options} series={series} type="line" height={300} />
        </div>
    );
};

export default APICallsChart;