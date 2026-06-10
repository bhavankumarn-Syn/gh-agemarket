import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const VoiceInteractionsChart = () => {
    const series = [
        {
            name: "Sales",
            data: [450, 380, 620, 510, 800, 430, 290],
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },

        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "75%",
            },
        },

        dataLabels: {
            enabled: false,
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
            max: 800,
            tickAmount: 4,
        },

        colors: ["#10b981"], // green color like image
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
            <Chart options={options} series={series} type="bar" height={320} />
        </div>
    );
};

export default VoiceInteractionsChart;