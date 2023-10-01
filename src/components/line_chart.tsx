import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { ChartData, ChartDataset } from 'chart.js';

type DataSet = ChartDataset<"line", number[]>;
type LineChartData = ChartData<"line", number[], string>;

type LineChartProps = {
    chartData: LineChartData;
    title?: string;
    header?: string;
};

const LineChart: React.FC<LineChartProps> = ({ chartData, title, header }) => {
    const chartRef = useRef(null);

    function getGradientColor(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
        gradient.addColorStop(1, 'rgba(75, 192, 192, 0.05)');
        return gradient;
    }

    // If we have a canvas context available, modify the dataset to use the gradient
    if (chartRef.current && chartData.datasets) {
        const ctx = (chartRef.current as any).getContext('2d');
        chartData.datasets[0].backgroundColor = getGradientColor(ctx);
    }

    function getHeader(): string {
        return `${header ?? 'LineChart'}`;
    }

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{getHeader()}</h2>
            <Line
                ref={chartRef}
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title ?? "Users Gained between 2016-2020"
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                precision: 0
                            }
                        }
                    },
                    elements: {
                        point: {
                            radius: 6,
                            hoverRadius: 8,
                            hoverBorderColor: 'white',
                            borderWidth: 2
                        }
                    },
                    animation: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: true
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest'
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
}

export default LineChart;
