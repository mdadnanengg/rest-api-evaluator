import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./App.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [oasUrl, setOasUrl] = useState("https://petstore.swagger.io/v2/swagger.json");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleEvaluate = async () => {
    setResults(null);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/evaluate`, { oasUrl });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSummary = () => {
    if (!results) return null;

    const { summary } = results;

    const chartData = {
      labels: ["Success", "Failure"],
      datasets: [
        {
          label: "API Test Results",
          data: [summary.successCount, summary.failureCount],
          backgroundColor: ["#4CAF50", "#F44336"]
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: "category",  // Explicitly set scale type
        },
        y: {
          type: "linear",    // Explicitly set scale type
          beginAtZero: true
        }
      }
    };

    return (
      <div className="summary-section">
        <h2>Summary Report</h2>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Endpoints</h3>
            <p>{summary.totalEndpoints}</p>
          </div>
          <div className="stat-card">
            <h3>Success Rate</h3>
            <p>{summary.successRate.toFixed(2)}%</p>
          </div>
          <div className="stat-card">
            <h3>Successful</h3>
            <p>{summary.successCount}</p>
          </div>
          <div className="stat-card">
            <h3>Failures</h3>
            <p>{summary.failureCount}</p>
          </div>
        </div>

        <h3>Endpoint Details</h3>
        <table className="endpoint-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Status</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {summary.endpointStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.endpoint}</td>
                <td>{stat.method}</td>
                <td>
                  <span className={`status-badge ${stat.success ? "success" : "failure"}`}>
                    {stat.success ? "Success" : "Failure"}
                  </span>
                </td>
                <td>{stat.statusCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderLogs = () => {
    if (!results) return null;

    return (
      <div className="logs-section">
        <h2>Detailed Logs</h2>
        <div className="logs-container">
          {results.logs.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-header">
                <span className={`method-${log.method.toLowerCase()}`}>{log.method}</span>
                <span className="endpoint">{log.endpoint}</span>
                <span className={`status-code ${log.statusCode >= 200 && log.statusCode < 300 ? "success" : "failure"}`}>
                  {log.statusCode}
                </span>
              </div>
              {log.request && (
                <div className="log-detail">
                  <h4>Request:</h4>
                  <pre>{JSON.stringify(log.request, null, 2)}</pre>
                </div>
              )}
              <div className="log-detail">
                <h4>Response:</h4>
                <pre>{JSON.stringify(log.response || log.error, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>REST API Evaluator</h1>
      </header>

      <main>
        <div className="input-section">
          <input
            type="text"
            value={oasUrl}
            onChange={(e) => setOasUrl(e.target.value)}
            placeholder="Enter OAS URL"
          />
          <button onClick={handleEvaluate} disabled={isLoading}>
            {isLoading ? "Evaluating..." : "Evaluate API"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {results && (
          <>
            {renderSummary()}
            {renderLogs()}
          </>
        )}
      </main>
    </div>
  );
}

export default App;