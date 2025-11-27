import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';

const CandleQualityScoring = () => {
  const [selectedType, setSelectedType] = useState(1);
  const [tradeDirection, setTradeDirection] = useState('buy');

  const candleTypes = [
    {
      type: 1,
      name: "TYPE 1 - Perfect Alignment",
      description: "Every value read is above / below the previous one.",
      score: 5.0,
      buyPattern: "Each candle higher than the previous",
      sellPattern: "Each candle lower than the previous",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 110, high: 111, low: 104 },
        { position: 3, open: 110, close: 115, high: 116, low: 109 },
        { position: 4, open: 115, close: 120, high: 121, low: 114 }
      ],
      sellCandleData: [
        { position: 1, open: 120, close: 115, high: 121, low: 114 },
        { position: 2, open: 115, close: 110, high: 116, low: 109 },
        { position: 3, open: 110, close: 105, high: 111, low: 104 },
        { position: 4, open: 105, close: 100, high: 106, low: 99 }
      ]
    },
    {
      type: 2,
      name: "TYPE 2 - Strong Momentum",
      description: "The 2nd read value is below / above the value 1, yet the last 3 readings are nicely in a row up/down",
      score: 4.5,
      buyPattern: "M1 candle dips, but M2 and M1 candles trend strongly upward",
      sellPattern: "M1 candle rises, but M2 and M1 candles trend strongly downward",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 103, high: 107, low: 102 },
        { position: 3, open: 103, close: 110, high: 111, low: 102 },
        { position: 4, open: 110, close: 118, high: 119, low: 109 }
      ],
      sellCandleData: [
        { position: 1, open: 118, close: 113, high: 119, low: 112 },
        { position: 2, open: 113, close: 115, high: 116, low: 112 },
        { position: 3, open: 115, close: 108, high: 116, low: 107 },
        { position: 4, open: 108, close: 100, high: 109, low: 99 }
      ]
    },
    {
      type: 3,
      name: "TYPE 3 - Steady Build-up",
      description: "First 3 values in a row nicely, yet the last one stays the same as the value 3",
      score: 4.5,
      buyPattern: "Strong upward trend in first 3 candles, last candle consolidates",
      sellPattern: "Strong downward trend in first 3 candles, last candle consolidates",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 110, high: 111, low: 104 },
        { position: 3, open: 110, close: 115, high: 116, low: 109 },
        { position: 4, open: 115, close: 115, high: 117, low: 113 }
      ],
      sellCandleData: [
        { position: 1, open: 115, close: 110, high: 116, low: 109 },
        { position: 2, open: 110, close: 105, high: 111, low: 104 },
        { position: 3, open: 105, close: 100, high: 106, low: 99 },
        { position: 4, open: 100, close: 100, high: 102, low: 98 }
      ]
    },
    {
      type: 4,
      name: "TYPE 4 - Progressive Strength",
      description: "Value 2 => Value 1; Value 3 => Value 2; Value 4 => Value 3",
      score: 4.5,
      buyPattern: "Each candle equal to or higher than previous",
      sellPattern: "Each candle equal to or lower than previous",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 105, high: 107, low: 104 },
        { position: 3, open: 105, close: 110, high: 111, low: 104 },
        { position: 4, open: 110, close: 115, high: 116, low: 109 }
      ],
      sellCandleData: [
        { position: 1, open: 115, close: 110, high: 116, low: 109 },
        { position: 2, open: 110, close: 110, high: 111, low: 108 },
        { position: 3, open: 110, close: 105, high: 111, low: 104 },
        { position: 4, open: 105, close: 100, high: 106, low: 99 }
      ]
    },
    {
      type: 5,
      name: "TYPE 5 - Multi-Equal Steps",
      description: "Value 2 => Value 1; Value 3 => Value 2 & => Value 1; Value 4 => Value 3",
      score: 4.5,
      buyPattern: "Progressive strength with multiple equal levels",
      sellPattern: "Progressive weakness with multiple equal levels",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 105, high: 107, low: 104 },
        { position: 3, open: 105, close: 105, high: 108, low: 104 },
        { position: 4, open: 105, close: 112, high: 113, low: 104 }
      ],
      sellCandleData: [
        { position: 1, open: 112, close: 107, high: 113, low: 106 },
        { position: 2, open: 107, close: 107, high: 108, low: 105 },
        { position: 3, open: 107, close: 107, high: 108, low: 105 },
        { position: 4, open: 107, close: 100, high: 108, low: 99 }
      ]
    },
    {
      type: 6,
      name: "TYPE 6 - Late Consolidation",
      description: "First 3 values in a row nicely, yet the last one drops below the value 3 yet stays equal or above value 2",
      score: 4.0,
      buyPattern: "Strong start, slight pullback but holds key support",
      sellPattern: "Strong start, slight bounce but holds key resistance",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 110, high: 111, low: 104 },
        { position: 3, open: 110, close: 115, high: 116, low: 109 },
        { position: 4, open: 115, close: 112, high: 116, low: 110 }
      ],
      sellCandleData: [
        { position: 1, open: 115, close: 110, high: 116, low: 109 },
        { position: 2, open: 110, close: 105, high: 111, low: 104 },
        { position: 3, open: 105, close: 100, high: 106, low: 99 },
        { position: 4, open: 100, close: 103, high: 105, low: 99 }
      ]
    },
    {
      type: 7,
      name: "TYPE 7 - Moderate Pullback",
      description: "First 3 values in a row nicely, yet the last one drops below the value 2 yet stays equal or above value 1",
      score: 3.5,
      buyPattern: "Strong momentum followed by deeper pullback",
      sellPattern: "Strong momentum followed by deeper bounce",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 110, high: 111, low: 104 },
        { position: 3, open: 110, close: 115, high: 116, low: 109 },
        { position: 4, open: 115, close: 108, high: 116, low: 106 }
      ],
      sellCandleData: [
        { position: 1, open: 115, close: 110, high: 116, low: 109 },
        { position: 2, open: 110, close: 105, high: 111, low: 104 },
        { position: 3, open: 105, close: 100, high: 106, low: 99 },
        { position: 4, open: 100, close: 107, high: 109, low: 99 }
      ]
    },
    {
      type: 8,
      name: "TYPE 8 - No Clear Direction",
      description: "No clear pattern",
      score: 0,
      buyPattern: "Random, choppy movement",
      sellPattern: "Random, choppy movement",
      buyCandleData: [
        { position: 1, open: 100, close: 105, high: 106, low: 99 },
        { position: 2, open: 105, close: 103, high: 107, low: 101 },
        { position: 3, open: 103, close: 107, high: 108, low: 102 },
        { position: 4, open: 107, close: 104, high: 109, low: 103 }
      ],
      sellCandleData: [
        { position: 1, open: 104, close: 107, high: 109, low: 103 },
        { position: 2, open: 107, close: 105, high: 108, low: 104 },
        { position: 3, open: 105, close: 108, high: 109, low: 104 },
        { position: 4, open: 108, close: 106, high: 110, low: 105 }
      ]
    },
    {
      type: 9,
      name: "TYPE 9 - All Other Combinations",
      description: "This and any other combination",
      score: 0,
      buyPattern: "Non-qualifying pattern",
      sellPattern: "Non-qualifying pattern",
      buyCandleData: [
        { position: 1, open: 100, close: 108, high: 109, low: 99 },
        { position: 2, open: 108, close: 102, high: 110, low: 101 },
        { position: 3, open: 102, close: 105, high: 107, low: 101 },
        { position: 4, open: 105, close: 103, high: 106, low: 102 }
      ],
      sellCandleData: [
        { position: 1, open: 103, close: 95, high: 104, low: 94 },
        { position: 2, open: 95, close: 101, high: 102, low: 94 },
        { position: 3, open: 101, close: 98, high: 102, low: 97 },
        { position: 4, open: 98, close: 100, high: 101, low: 97 }
      ]
    }
  ];

  const selectedCandle = candleTypes.find(c => c.type === selectedType);
  const candleData = tradeDirection === 'buy' ? selectedCandle.buyCandleData : selectedCandle.sellCandleData;

  // Draw a single candle
  const drawCandle = (candle, index, maxPrice, minPrice, color) => {
    const chartHeight = 200;
    const priceRange = maxPrice - minPrice;
    const candleWidth = 40;
    const spacing = 60;
    const xPos = index * spacing + 40;
    
    const yHigh = ((maxPrice - candle.high) / priceRange) * chartHeight + 20;
    const yLow = ((maxPrice - candle.low) / priceRange) * chartHeight + 20;
    const yOpen = ((maxPrice - candle.open) / priceRange) * chartHeight + 20;
    const yClose = ((maxPrice - candle.close) / priceRange) * chartHeight + 20;
    
    const bodyTop = Math.min(yOpen, yClose);
    const bodyHeight = Math.abs(yClose - yOpen) || 2;
    const isBullish = candle.close >= candle.open;
    
    return (
      <g key={index}>
        {/* Wick */}
        <line
          x1={xPos + candleWidth / 2}
          y1={yHigh}
          x2={xPos + candleWidth / 2}
          y2={yLow}
          stroke={color}
          strokeWidth="2"
        />
        {/* Body */}
        <rect
          x={xPos}
          y={bodyTop}
          width={candleWidth}
          height={bodyHeight}
          fill={isBullish ? color : 'white'}
          stroke={color}
          strokeWidth="2"
        />
        {/* Position label */}
        <text
          x={xPos + candleWidth / 2}
          y={chartHeight + 50}
          textAnchor="middle"
          fontSize="12"
          fill="#64748b"
          fontWeight="600"
        >
          {candle.position === 1 ? 'M2' : candle.position === 2 ? 'M1' : candle.position === 3 ? 'M1' : 'M1'}
        </text>
        {/* Close price label */}
        <text
          x={xPos + candleWidth / 2}
          y={yClose - 5}
          textAnchor="middle"
          fontSize="10"
          fill={color}
          fontWeight="bold"
        >
          {candle.close.toFixed(0)}
        </text>
      </g>
    );
  };

  const maxPrice = Math.max(...candleData.map(c => c.high)) + 2;
  const minPrice = Math.min(...candleData.map(c => c.low)) - 2;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Candle Quality Scoring System</h1>
        <p className="text-lg text-slate-600">Identifying sustainable moves through candle pattern analysis</p>
      </div>

      {/* Trade Direction Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setTradeDirection('buy')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            tradeDirection === 'buy'
              ? 'bg-green-500 text-white shadow-lg scale-105'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp size={20} />
          BUY Pattern
        </button>
        <button
          onClick={() => setTradeDirection('sell')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            tradeDirection === 'sell'
              ? 'bg-red-500 text-white shadow-lg scale-105'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingDown size={20} />
          SELL Pattern
        </button>
      </div>

      {/* Type Selection Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {candleTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => setSelectedType(type.type)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === type.type
                ? 'bg-blue-500 border-blue-600 text-white shadow-lg scale-105'
                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
            }`}
          >
            <div className="font-bold text-lg mb-1">TYPE {type.type}</div>
            <div className="text-sm opacity-90">Score: {type.score}</div>
          </button>
        ))}
      </div>

      {/* Selected Type Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <Activity className={`${selectedCandle.score >= 4 ? 'text-green-500' : selectedCandle.score > 0 ? 'text-orange-500' : 'text-red-500'} flex-shrink-0`} size={32} />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedCandle.name}</h2>
            <p className="text-slate-600 mb-3">{selectedCandle.description}</p>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg font-bold text-xl ${
                selectedCandle.score >= 4 ? 'bg-green-100 text-green-700' :
                selectedCandle.score > 0 ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                Score: {selectedCandle.score}
              </div>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${tradeDirection === 'buy' ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="font-semibold text-slate-700 mb-2">
            {tradeDirection === 'buy' ? 'Buy' : 'Sell'} Pattern Recognition:
          </div>
          <div className="text-slate-600">
            {tradeDirection === 'buy' ? selectedCandle.buyPattern : selectedCandle.sellPattern}
          </div>
        </div>
      </div>

      {/* Candle Chart Visualization */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
          Candlestick Pattern - {tradeDirection === 'buy' ? 'Bullish' : 'Bearish'} Setup
        </h3>
        
        <div className="flex justify-center">
          <svg width="320" height="280" className="border border-slate-200 rounded-lg bg-slate-50">
            {candleData.map((candle, index) => 
              drawCandle(candle, index, maxPrice, minPrice, tradeDirection === 'buy' ? '#10b981' : '#ef4444')
            )}
            
            {/* Legend */}
            <text x="160" y="270" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
              ← Older Candles | Newer Candles →
            </text>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {candleData.map((candle, idx) => (
            <div key={idx} className="bg-slate-50 p-2 rounded">
              <div className="text-xs font-semibold text-slate-600">
                {candle.position === 1 ? 'M2 Candle' : candle.position === 2 ? 'M1 Candle (3rd)' : candle.position === 3 ? 'M1 Candle (2nd)' : 'M1 Candle (Latest)'}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                C: {candle.close} | O: {candle.open}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring Explanation */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-blue-900 mb-3 text-lg">Understanding Candle Quality:</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>M2 Candle:</strong> The older reference candle (furthest left)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>M1 Candles:</strong> The three most recent candles showing current momentum</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Score 5.0:</strong> Perfect alignment - strongest signal for sustainable move</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Score 4.0-4.5:</strong> Strong patterns with minor consolidation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Score 3.5:</strong> Moderate strength with some pullback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Score 0:</strong> No clear direction - avoid trading</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandleQualityScoring;