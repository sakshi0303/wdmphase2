/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: chart.tsx
    
*/
import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from 'chart.js';
import { ChartEvent } from "chart.js/dist/core/core.plugins";

type LineChartData = ChartData<"line", number[], string>;
type BarChartData = ChartData<"bar", number[], string>;
type PieChartData = ChartData<'pie', number[], string>;

type BarChartProps = {
    chartData: BarChartData;
    title?: string;
    header?: string;
    onBarClick?: (label: string) => void; // Add an onClick event handler
    options?: ChartOptions; // Add the options prop
};



type LineChartProps = {
    chartData: LineChartData;
    title?: string;
    header?: string;
};

type PieChartProps = {
    chartData: PieChartData;
    title?: string;
    header?: string;
};

export const PieChart: React.FC<PieChartProps> = ({ chartData, title, header }) => {
    function getHeader(): string {
        return `${header ?? 'PieChart'}`;
    }

    const chartContainerStyle = {
        width: '60%',
        height: '400px',
        margin: '0 auto',
    };

    return (
        <div className="chart-container" style={chartContainerStyle}>
            <h2 style={{ textAlign: 'center' }}>{getHeader()}</h2>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title ?? 'Pie Chart',
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                }}
            />
        </div>
    );
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

export const BarChart: React.FC<BarChartProps> = ({ chartData, title, header, onBarClick }) => {
    function getHeader(): string {
        return `${header ?? 'BarChart'}`;
    }

    const chartContainerStyle = {
        width: '60%',
        height: '400px',
        margin: '0 auto',
    };

    // Handle bar click event and call the provided onBarClick handler
    const handleBarClick = (event: ChartEvent, elements: any[]) => {
        if (elements && elements.length > 0 && onBarClick) {
            const label = chartData.labels?.[elements[0].index];
            onBarClick(label ?? 'default');
        }
    };

    return (
        <div className="chart-container" style={chartContainerStyle}>
            <h2 style={{ textAlign: 'center' }}>{getHeader()}</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title ?? 'Users Gained between 2016-2020',
                        },
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                precision: 0,
                            },
                        },
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
                            borderWidth: 1,
                        },
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutCubic',
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    onClick: handleBarClick, // Attach the click event handler
                }}
            />
        </div>
    );
};