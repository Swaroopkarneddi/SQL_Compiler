import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableSchema, setTableSchema] = useState(null);
  const [tableSamples, setTableSamples] = useState(null);
  const [lastQuery, setLastQuery] = useState("");
  const [showLastQueryPopup, setShowLastQueryPopup] = useState(false);

  const API_BASE = "http://127.0.0.1:8000/api";

  useEffect(() => {
    fetchTables();
  }, []);

  // Auto-select first table when tables are loaded
  useEffect(() => {
    if (tables.length > 0 && !selectedTable) {
      fetchTableDetails(tables[0]);
    }
  }, [tables]);

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tables/`);
      setTables(response.data.tables);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  const executeQuery = async () => {
    if (!query.trim()) {
      setError("Please enter a SQL query");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    // Store the current query as the last executed query
    setLastQuery(query.trim());

    try {
      const response = await axios.post(`${API_BASE}/execute/`, {
        query: query.trim(),
      });

      if (response.data.message) {
        setResults({ message: response.data.message });
      } else {
        setResults(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error executing query");
    } finally {
      setLoading(false);
    }
  };

  const fetchTableDetails = async (tableName) => {
    try {
      const response = await axios.get(
        `${API_BASE}/table/${tableName}/?limit=5`
      );
      setTableSchema(response.data.schema);
      setTableSamples(response.data.samples);
      setSelectedTable(tableName);
    } catch (err) {
      setError(
        `Error fetching table details: ${
          err.response?.data?.error || err.message
        }`
      );
    }
  };

  const insertTableName = (tableName) => {
    setQuery((prev) => prev + (prev ? ", " : "") + tableName);
  };

  const clearQuery = () => {
    setQuery("");
    setResults(null);
    setError("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>SQL Compiler</h1>
        <p>Execute SQL queries and explore your database</p>
      </header>

      <div className="main-container">
        {/* Database Browser Sidebar */}
        <div className="sidebar">
          {/* Tables Box */}
          <div className="sidebar-box">
            <div className="sidebar-section">
              <h3>Database Tables</h3>
              <div className="table-list">
                {tables.map((table) => (
                  <div
                    key={table}
                    className={`table-item ${
                      selectedTable === table ? "active" : ""
                    }`}
                    onClick={() => fetchTableDetails(table)}
                  >
                    <span className="table-icon">📊</span>
                    {table}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Table Box */}
          <div className="sidebar-box">
            {selectedTable && (
              <div className="sidebar-section">
                <h3>Table: {selectedTable}</h3>
                {tableSchema && (
                  <div className="schema-info">
                    <h4>Schema</h4>
                    <div className="schema-list">
                      {tableSchema.map((column, index) => (
                        <div key={index} className="schema-item">
                          <span className="column-name">{column.name}</span>
                          <span className="column-type">{column.type}</span>
                          {column.pk && <span className="primary-key">PK</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tableSamples && (
                  <div className="sample-data">
                    <h4>Sample Data</h4>
                    <div className="sample-table">
                      <table>
                        <thead>
                          <tr>
                            {Object.keys(tableSamples[0] || {}).map((key) => (
                              <th key={key}>{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableSamples.map((row, index) => (
                            <tr key={index}>
                              {Object.values(row).map((value, idx) => (
                                <td key={idx}>{value}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Query Interface */}
        <div className="main-content">
          <div className="query-section">
            <div className="query-header">
              <h2>SQL Query Editor</h2>
              <div className="query-actions">
                <button
                  className="btn btn-primary"
                  onClick={executeQuery}
                  disabled={loading}
                >
                  {loading ? "Executing..." : "Execute Query"}
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => setShowLastQueryPopup(true)}
                  disabled={!lastQuery}
                >
                  Show Last Query
                </button>
                <button className="btn btn-secondary" onClick={clearQuery}>
                  Clear
                </button>
              </div>
            </div>

            <div className="query-input-container">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your SQL query here...&#10;Example: SELECT * FROM fruits WHERE qty > 0;"
                className="query-input"
                rows="8"
              />
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {results && (
              <div className="results-section">
                <h3>Query Results</h3>
                {results.message ? (
                  <div className="success-message">
                    <span className="success-icon">✅</span>
                    {results.message}
                  </div>
                ) : (
                  <div className="results-table">
                    <div className="results-info">
                      <span>Columns: {results.columns?.length || 0}</span>
                      <span>Rows: {results.rows?.length || 0}</span>
                    </div>
                    <table className="results-table-content">
                      <thead>
                        <tr>
                          {results.columns?.map((column, index) => (
                            <th key={index}>{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.rows?.map((row, index) => (
                          <tr key={index}>
                            {results.columns?.map((column, colIndex) => (
                              <td key={colIndex}>{row[column]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Last Query Popup */}
      {showLastQueryPopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowLastQueryPopup(false)}
        >
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Last Executed Query</h3>
              <button
                className="popup-close"
                onClick={() => setShowLastQueryPopup(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-body">
              <pre className="last-query-text">{lastQuery}</pre>
            </div>
            <div className="popup-footer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setQuery(lastQuery);
                  setShowLastQueryPopup(false);
                }}
              >
                Use This Query
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowLastQueryPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
