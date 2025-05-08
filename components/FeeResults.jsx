const FeeResults = ({ results, userBridge }) => {
    const userResult = results.find(r => r.bridge.toLowerCase() === userBridge.toLowerCase())
    const otherResults = results
      .filter(r => r.bridge.toLowerCase() !== userBridge.toLowerCase())
      .sort((a, b) => a.fee - b.fee)
  
    const bestAlt = otherResults[0]
  
    return (
      <div className="mt-10 w-full max-w-2xl">
        {userResult && (
          <div className="bg-green-100 p-4 rounded-lg shadow mb-4">
            <h2 className="font-semibold text-lg text-green-700">Your Selected Bridge</h2>
            <p>{userResult.bridge}: ${userResult.fee.toFixed(4)}</p>
          </div>
        )}
  
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-3">Other Bridges:</h3>
          <ul className="space-y-2">
            {otherResults.map((r, i) => (
              <li key={i} className="flex justify-between">
                <span>{r.bridge}</span>
                <span>${r.fee.toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </div>
  
        {bestAlt && (
          <div className="mt-4 bg-blue-100 p-4 rounded-lg shadow">
            <h4 className="font-semibold text-blue-700">✅ Best Alternative:</h4>
            <p>{bestAlt.bridge}: ${bestAlt.fee.toFixed(4)}</p>
          </div>
        )}
      </div>
    )
  }
  
  export default FeeResults
  