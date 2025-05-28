import React, { useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import "./App.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function App() {
  const [formData, setFormData] = useState({
    oasUrl: "https://petstore.swagger.io/v2/swagger.json",
    baseUrl: "",
    authToken: "",
    timeout: 10000,
    retries: 3,
    methods: ["GET", "POST"],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMethodChange = (method, checked) => {
    setFormData((prev) => ({
      ...prev,
      methods: checked
        ? [...prev.methods, method]
        : prev.methods.filter((m) => m !== method),
    }));
  };

  const handleEvaluate = async () => {
    setResults(null);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/evaluate`, formData);
      setResults(response.data);
      setActiveTab("summary");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!results) return;

    const csvData = results.logs.map((log) => ({
      endpoint: log.endpoint,
      method: log.method,
      statusCode: log.statusCode,
      responseTime: log.responseTime || 0,
      timestamp: log.timestamp,
      success: log.statusCode >= 200 && log.statusCode < 400 ? "Yes" : "No",
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api-evaluation-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderConfigForm = () => (
    <div className="config-section">
      <h2>🔧 API Configuration</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="oasUrl">OpenAPI Specification URL *</label>
          <input
            id="oasUrl"
            type="text"
            value={formData.oasUrl}
            onChange={(e) => handleInputChange("oasUrl", e.target.value)}
            placeholder="https://api.example.com/openapi.json"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="baseUrl">Base URL (optional)</label>
          <input
            id="baseUrl"
            type="text"
            value={formData.baseUrl}
            onChange={(e) => handleInputChange("baseUrl", e.target.value)}
            placeholder="https://api.example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="authToken">🔐 Authentication Token (optional)</label>
          <input
            id="authToken"
            type="password"
            value={formData.authToken}
            onChange={(e) => handleInputChange("authToken", e.target.value)}
            placeholder="Bearer token for authenticated endpoints"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="timeout">⏱️ Timeout (ms)</label>
            <input
              id="timeout"
              type="number"
              value={formData.timeout}
              onChange={(e) => handleInputChange("timeout", parseInt(e.target.value))}
              min="1000"
              max="60000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="retries">🔄 Retry Attempts</label>
            <input
              id="retries"
              type="number"
              value={formData.retries}
              onChange={(e) => handleInputChange("retries", parseInt(e.target.value))}
              min="1"
              max="5"
            />
          </div>
        </div>

        <div className="form-group">
          <label>HTTP Methods to Test</label>
          <div className="methods-grid">
            {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
              <label key={method} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.methods.includes(method)}
                  onChange={(e) => handleMethodChange(method, e.target.checked)}
                />
                <span className={`method-badge method-${method.toLowerCase()}`}>{method}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          className="evaluate-btn"
          onClick={handleEvaluate}
          disabled={isLoading || !formData.oasUrl}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Evaluating API...
            </>
          ) : (
            "🚀 Start Evaluation"
          )}
        </button>
      </div>
    </div>
  );

  const renderSummary = () => {
    if (!results) return null;

    const { summary } = results;

    const successFailureChart = {
      labels: ["Successful", "Failed"],
      datasets: [
        {
          label: "Test Results",
          data: [summary.successCount, summary.failureCount],
          backgroundColor: ["#10B981", "#EF4444"],
          borderColor: ["#059669", "#DC2626"],
          borderWidth: 2,
        },
      ],
    };

    const methodBreakdownChart = {
      labels: Object.keys(summary.methodBreakdown || {}),
      datasets: [
        {
          label: "Success Rate by Method",
          data: Object.values(summary.methodBreakdown || {}).map((stats) =>
            stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(1) : 0
          ),
          backgroundColor: [
            "#3B82F6", // GET - Blue
            "#10B981", // POST - Green
            "#F59E0B", // PUT - Yellow
            "#EF4444", // DELETE - Red
            "#8B5CF6", // PATCH - Purple
          ],
          borderWidth: 2,
        },
      ],
    };

    const responseTimeChart = {
      labels: results.logs.map((log, index) => `${log.method} ${index + 1}`),
      datasets: [
        {
          label: "Response Time (ms)",
          data: results.logs.map((log) => log.responseTime || 0),
          borderColor: "#6366F1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          tension: 0.4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: {
          type: "category",
        },
        y: {
          type: "linear",
          beginAtZero: true,
        },
      },
    };

    return (
      <div className="summary-section">
        <div className="summary-header">
          <h2>📊 Evaluation Summary</h2>
          <button className="export-btn" onClick={exportToCSV}>
            📥 Export CSV
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Total Endpoints</h3>
              <p>{summary.totalEndpoints}</p>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Successful</h3>
              <p>{summary.successCount}</p>
            </div>
          </div>

          <div className="stat-card failure">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3>Failed</h3>
              <p>{summary.failureCount}</p>
            </div>
          </div>

          <div className="stat-card rate">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Success Rate</h3>
              <p>{summary.successRate ? Number(summary.successRate).toFixed(2) : "0"}%</p>
            </div>
          </div>

          {summary.averageResponseTime && (
            <div className="stat-card time">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <h3>Avg Response Time</h3>
                <p>{summary.averageResponseTime}ms</p>
              </div>
            </div>
          )}
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span>Overall Progress</span>
            <p>{summary.successRate ? Number(summary.successRate).toFixed(2) : "0"}%</p>

          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${summary.successRate}%` }}
            ></div>
          </div>
        </div>

        {/* Method Breakdown */}
        {results?.summary?.methodBreakdown ? (
          <div className="container my-4">
            <div className="card shadow-sm p-3">
              <h5 className="text-primary mb-3">API Summary</h5>
              <div className="mb-2">
                <strong>Total:</strong> {results?.summary?.total}
              </div>
              <div className="d-flex flex-wrap gap-2">
                {Object.entries(results?.summary?.methodBreakdown).map(([key, value]) => (
                  <span key={key} className="badge bg-light text-dark border border-primary px-3 py-2">
                    <strong>{key}</strong>: {value?.total}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Success vs Failure</h3>
            <div className="chart-wrapper">
              <Bar data={successFailureChart} options={chartOptions} />
            </div>
          </div>

          {Object.keys(summary.methodBreakdown || {}).length > 0 && (
            <div className="chart-container">
              <h3>Success Rate by Method</h3>
              <div className="chart-wrapper">
                <Bar data={methodBreakdownChart} options={chartOptions} />
              </div>
            </div>
          )}

          {results.logs.some((log) => log.responseTime) && (
            <div className="chart-container full-width">
              <h3>Response Times</h3>
              <div className="chart-wrapper">
                <Line data={responseTimeChart} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLogs = () => {
    if (!results) return null;

    return (
      <div className="logs-section">
        <h2>📋 Detailed Logs</h2>
        <div className="logs-container">
          {results.logs.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-header">
                <span className={`method-badge method-${log.method.toLowerCase()}`}>
                  {log.method}
                </span>
                <span className="endpoint">{log.endpoint}</span>
                <span
                  className={`status-code ${log.statusCode >= 200 && log.statusCode < 400 ? "success" : "failure"
                    }`}
                >
                  {log.statusCode || "Error"}
                </span>
                {log.responseTime && (
                  <span className="response-time">{log.responseTime}ms</span>
                )}
              </div>

              {log.request && (
                <div className="log-detail">
                  <h4>📤 Request:</h4>
                  <pre className="json-display">
                    {JSON.stringify(log.request, null, 2)}
                  </pre>
                </div>
              )}

              <div className="log-detail">
                <h4>📥 Response:</h4>
                <pre className="json-display">
                  {JSON.stringify(log.response || { error: log.error }, null, 2)}
                </pre>
              </div>

              {log.timestamp && (
                <div className="log-timestamp">
                  🕒 {new Date(log.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🚀 REST API Evaluator</h1>
          <p>Comprehensive testing and evaluation of REST APIs using OpenAPI specifications</p>
        </div>
      </header>

      <main className="main-content">
        {renderConfigForm()}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {results && (
          <div className="results-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "summary" ? "active" : ""}`}
                onClick={() => setActiveTab("summary")}
              >
                📊 Summary
              </button>
              <button
                className={`tab ${activeTab === "logs" ? "active" : ""}`}
                onClick={() => setActiveTab("logs")}
              >
                📋 Detailed Logs
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "summary" && renderSummary()}
              {activeTab === "logs" && renderLogs()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
