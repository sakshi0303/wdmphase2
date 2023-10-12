import '../assets/css/styles.css'; // Assuming the path to your styles.css
import { ChartDataType } from '../types/types';
import React, { useEffect, useState } from 'react';
import { BarChart } from "./chart";
import { Header, Footer } from './HeaderFooter';
import { LogEntry } from '../types/types'

const Operations: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: ['Errors', 'Successful Requests', 'Active Sessions'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#FFD6D6', '#D6E5FF', '#DAF4C4'],
      borderColor: ['#FFD6D6', '#D6E5FF', '#DAF4C4'],
      borderWidth: 1
    }]
  });

  const [logsData, setLogsData] = useState<Array<LogEntry>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/csv/logs.csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').slice(1);
        const parsedLogs = rows.map(row => {
          const [Timestamp, Message] = row.split(',');
          return { Timestamp, Message };
        });

        // Process the logs
        let errorCount = 0;
        let successCount = 0;
        let sessions = 0;
        let inSession = false;

        parsedLogs.forEach(log => {
          if (log.Message.startsWith("Error")) {
            errorCount++;
          } else if (log.Message.startsWith("Request processed successfully")) {
            successCount++;
          }

          if (log.Message === "Server restarted") {
            if (inSession) {
              sessions++;
              inSession = false;
            }
          } else {
            inSession = true;
          }
        });

        // Update the chart data
        setChartData({
          labels: ['Errors', 'Successful Requests', 'Active Sessions'],
          datasets: [{
            data: [errorCount, successCount, sessions],
            backgroundColor: ['#CD5C5C', '#C1E0FF', '#B8E986'],
            borderColor: ['#CD5C5C', '#C1E0FF', '#B8E986'],
            borderWidth: 1
          }]
        });

        setLogsData(parsedLogs);
      });
  }, []);

  return (
    <div className="App">
      
      <Header />
      
        <div>
          <BarChart chartData={chartData} title="Operational Metrics" header="Operational Metrics" />

        </div>
        <div className="instructor-2l-container" id="operational-logs-container">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="log-search-bar"
          />
          <table className="csv-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {logsData.filter(log => log.Message.toLowerCase().includes(searchTerm.toLowerCase()) || log.Timestamp.includes(searchTerm)).map((log, index) => (
                <tr key={index}>
                  <td>{log.Timestamp}</td>
                  <td>{log.Message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Footer />
        </div>
      </div>
  
  );
};

export default Operations;
