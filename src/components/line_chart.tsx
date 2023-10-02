import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { ChartData, ChartDataset } from 'chart.js';

type DataSet = ChartDataset<"line", number[]>;
type LineChartData = ChartData<"line", number[], string>;
type BarChartData = ChartData<"bar", number[], string>;

type BarChartProps = {
    chartData: BarChartData;
    title?: string;
    header?: string;
};

type LineChartProps = {
    chartData: LineChartData;
    title?: string;
    header?: string;
};

export const LineChart: React.FC<LineChartProps> = ({ chartData, title, header }) => {

    function getHeader(): string {
        return `${header ?? 'LineChart'}`;
    }

    const chartContainerStyle = {
        width: '60%',
        height: '400px',
        margin: '0 auto'
    };

    return (
        <div className="chart-container" style={chartContainerStyle}>
            <h2 style={{ textAlign: "center" }}>{getHeader()}</h2>
            <Line
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
                        line: {
                            tension: 0.4,
                            fill: true,  // Ensure the area below the line is filled
                            backgroundColor: (context) => {
                                const chart = context.chart;
                                const ctx = chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                                gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
                                gradient.addColorStop(1, 'rgba(75, 192, 192, 0.05)');
                                return gradient;
                            }
                        },
                        point: {
                            radius: 6,
                            hoverRadius: 8,
                            hoverBorderColor: 'white',
                            borderWidth: 2
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutCubic'
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest'
                    },
                    responsive: true,
                    maintainAspectRatio: true
                }}
            />
        </div>
    );
}

export const BarChart: React.FC<BarChartProps> = ({ chartData, title, header }) => {

    function getHeader(): string {
        return `${header ?? 'BarChart'}`;
    }

    const chartContainerStyle = {
        width: '60%',
        height: '400px',
        margin: '0 auto'
    };

    return (
        <div className="chart-container" style={chartContainerStyle}>
            <h2 style={{ textAlign: "center" }}>{getHeader()}</h2>
            <Bar
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
                        bar: {
                            backgroundColor: (context) => {
                                const chart = context.chart;
                                const ctx = chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                                gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
                                gradient.addColorStop(1, 'rgba(75, 192, 192, 0.05)');
                                return gradient;
                            },
                            borderWidth: 1
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutCubic'
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest'
                    },
                    responsive: true,
                    maintainAspectRatio: true
                }}
            />
        </div>
    );
};
