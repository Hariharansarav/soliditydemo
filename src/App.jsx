import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    sourceChain: '',
    destinationChain: '',
    token: '',
    bridge: ''
  });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock results - replace with your actual model predictions
      const mockBridges = ['Hop Protocol', 'Across', 'Synapse', 'Stargate', 'cBridge'];
      const mockResults = mockBridges.map(bridge => ({
        bridge,
        fee: (Math.random() * 5 + 0.5).toFixed(4)
      }));
      
      setResults(mockResults);
    } catch (err) {
      setError('Failed to estimate fees. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const userResult = results.find(r => r.bridge.toLowerCase() === formData.bridge.toLowerCase());
  const otherResults = results.filter(r => r.bridge.toLowerCase() !== formData.bridge.toLowerCase())
    .sort((a, b) => a.fee - b.fee);

  return (
    <div className="app">
      <div className="background-animation"></div>
      
      <header className="header">
        <div className="logo-container">
          <img src="/linkx.png" alt="LinkX Logo" className="logo" />
          <span className="logo-text">LinkX</span>
        </div>
      </header>

      <main className="main-content">
        <div className="glass-card">
          <h2 className="title">Bridge Fee Estimator</h2>
          <p className="subtitle">Compare cross-chain bridge fees instantly</p>

          <form onSubmit={handleSubmit} className="estimator-form">
            <div className="input-group">
              <input
                type="text"
                name="sourceChain"
                value={formData.sourceChain}
                onChange={handleChange}
                required
                placeholder="Source Chain (e.g. Ethereum)"
                className="glowing-input"
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="destinationChain"
                value={formData.destinationChain}
                onChange={handleChange}
                required
                placeholder="Destination Chain (e.g. Polygon)"
                className="glowing-input"
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="token"
                value={formData.token}
                onChange={handleChange}
                required
                placeholder="Token (e.g. USDC)"
                className="glowing-input"
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="bridge"
                value={formData.bridge}
                onChange={handleChange}
                required
                placeholder="Preferred Bridge (e.g. Synapse)"
                className="glowing-input"
              />
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? (
                <span className="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              ) : (
                'Estimate Fees'
              )}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
        </div>

        {userResult && (
          <div className="glass-card result-card user-choice">
            <h3>Your Bridge Choice</h3>
            <div className="fee-display">
              <span className="bridge-name">{userResult.bridge}</span>
              <span className="fee-amount">${userResult.fee}</span>
            </div>
            <div className="fee-description">
              {formData.token} transfer from {formData.sourceChain} to {formData.destinationChain}
            </div>
          </div>
        )}

        {otherResults.length > 0 && (
          <div className="glass-card alternatives-section">
            <h3>Alternative Bridges</h3>
            <div className="alternatives-grid">
              {otherResults.map((result, index) => (
                <div 
                  key={result.bridge} 
                  className={`alt-bridge-card ${index === 0 ? 'best-choice' : ''}`}
                  data-tooltip={`${result.bridge} - $${result.fee}`}
                >
                  <div className="alt-bridge-name">{result.bridge}</div>
                  <div className="alt-fee-amount">${result.fee}</div>
                  {index === 0 && <div className="best-badge">Best Value</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} LinkX - Cross-chain analytics</p>
      </footer>
    </div>
  );
}

export default App;