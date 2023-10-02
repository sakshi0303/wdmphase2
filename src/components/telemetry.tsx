import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { LineChart } from "./line_chart";
import { Header, Footer } from './HeaderFooter';

Chart.register(CategoryScale);

type Telemetry = {
  Action: string;
  ComponentName: string;
  How: string;
};

const Telemetry: React.FC = () => {
  const sampleTelemetry: Telemetry[] = [
    { Action: "click", ComponentName: "button-login", How: "click" },
    { Action: "hover", ComponentName: "menu-dropdown", How: "hover" },
    { Action: "click", ComponentName: "link-home", How: "click" }
  ];

  function processData(data: Telemetry[]) {
    return data.reduce((acc, curr) => {
      if (acc[curr.Action]) {
        acc[curr.Action]++;
      } else {
        acc[curr.Action] = 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }

  const initialChartData = {
    labels: Object.keys(processData(sampleTelemetry)),
    datasets: [
      {
        label: "Action Counts",
        data: Object.values(processData(sampleTelemetry)),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const [chartDataState, setChartDataState] = useState(initialChartData);
  const [telemetryDataState, setTelemetryDataState] = useState(sampleTelemetry);

  useEffect(() => {
    fetch('/csv/telemetry.csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n');
        const telemetryData = rows.slice(1).map(row => {
          const [Action, ComponentName, How] = row.split(',');
          return { Action, ComponentName, How };
        });
        setTelemetryDataState(telemetryData);
        const newChartData = {
          labels: Object.keys(processData(telemetryData)),
          datasets: [
            {
              label: "Action Counts",
              data: Object.values(processData(telemetryData)),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              borderWidth: 1,
            },
          ],
        };
        setChartDataState(newChartData);
      });
  }, []);

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '20px auto',
    border: '1px solid #ddd'
};

const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: '#f2f2f2',
    color: 'black'
};

const tableCellStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px'
};

  return (
    <div className="App">
      <Header />
      <LineChart chartData={chartDataState} title='UX actions' header='Telemetry' />

      {/* Telemetry Data Table */}
      <table style={tableStyle}>
        <thead>
          <tr style={tableHeaderStyle}>
            <th style={tableCellStyle}>Action</th>
            <th style={tableCellStyle}>Component Name</th>
            <th style={tableCellStyle}>How</th>
          </tr>
        </thead>
        <tbody>
          {telemetryDataState.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{item.Action}</td>
              <td style={tableCellStyle}>{item.ComponentName}</td>
              <td style={tableCellStyle}>{item.How}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Footer />
    </div>
  );
};

export default Telemetry;
