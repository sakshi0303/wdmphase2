import React, { useEffect, useRef, useState } from 'react';
import * as Papa from 'papaparse';
import { TelemetryData } from '../types/types';
import 'chartjs-plugin-annotation';
import { LineController, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';

ChartJS.register(LineController, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Define a custom type for your chart options
type CustomChartOptions = {
  responsive: boolean;
  maintainAspectRatio: boolean;
  scales: {
    y: {
      beginAtZero: boolean;
    };
  };
  plugins: {
    legend: {
      display: boolean;
    };
    annotation: {
      annotations: {
        type: string;
        scaleID: string;
        borderColor: string;
        borderWidth: number;
        value: string;
      }[];
    };
  };
};

const Telemetry: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);
  const [mostPopularAction, setMostPopularAction] = useState<string>('');

// ...

useEffect(() => {
  const loadTelemetryGraph = () => {
    Papa.parse<TelemetryData>('/csv/telemetry.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        const actions = results.data.map((row) => row.Action);
        const data: Record<string, number> = {};

        actions.forEach((action) => {
          data[action] = (data[action] || 0) + 1;
        });

        const actionLabels = Object.keys(data);
        const actionCounts = Object.values(data);

        let maxCount = 0;
        let popularAction = '';

        for (const action in data) {
          if (data[action] > maxCount) {
            maxCount = data[action];
            popularAction = action;
          }
        }

        setMostPopularAction(popularAction);

        const ctx = chartRef.current;

        if (ctx) {
          // Destroy the existing Chart instance if it exists
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }

          const chartOptions: CustomChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              annotation: {
                annotations: [
                  {
                    type: 'line',
                    scaleID: 'x',
                    borderColor: 'red',
                    borderWidth: 2,
                    value: mostPopularAction,
                  },
                ],
              },
            },
          };

          // Create a new Chart instance
          const newChartInstance = new ChartJS(ctx, {
            type: 'line',
            data: {
              labels: actionLabels,
              datasets: [
                {
                  label: 'Number of Events',
                  data: actionCounts,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                },
              ],
            },
            options: chartOptions as any, // Use type assertion here
          });

          // Store the new Chart instance in a ref
          chartInstanceRef.current = newChartInstance;
        } else {
          console.error('Chart canvas element not found.');
        }
      },
    });
  };

  loadTelemetryGraph();
}, [mostPopularAction]);

// ...


  return (
    <div>
      <div id="telemetryChartContainer">
        <canvas id="telemetryChart" ref={chartRef}></canvas>
      </div>
      <div className="instructor-2l-container" id="telemetry-list-container"></div>
    </div>
  );
};

export default Telemetry;
