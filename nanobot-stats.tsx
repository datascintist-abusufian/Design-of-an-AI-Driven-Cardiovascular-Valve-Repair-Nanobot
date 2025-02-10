import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ErrorBar,
  ResponsiveContainer
} from 'recharts';

const NanobotStatsChart = () => {
  const data = [
    {
      category: "Navigation\nEfficiency",
      value: 92,
      error: 2.1,
      color: "#3B82F6"  // Blue
    },
    {
      category: "Biomarker\nDetection",
      value: 95,
      error: 1.8,
      color: "#10B981"  // Green
    },
    {
      category: "Repair\nAccuracy",
      value: 89,
      error: 2.5,
      color: "#8B5CF6"  // Purple
    }
  ];

  const CustomBar = (props) => {
    const { x, y, width, height, color } = props;
    const radius = 8;
    return (
      <path 
        d={`
          M${x + radius},${y}
          h${width - 2 * radius}
          a${radius},${radius} 0 0 1 ${radius},${radius}
          v${height - radius}
          h-${width}
          v-${height - radius}
          a${radius},${radius} 0 0 1 ${radius}-${radius}
          z
        `}
        fill={color}
        opacity={0.85}
      />
    );
  };

  const renderCustomBarLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <g>
        <rect
          x={x + width/2 - 24}
          y={y - 32}
          width="48"
          height="24"
          rx="12"
          fill="#1F2937"
          fillOpacity="0.9"
        />
        <text
          x={x + width/2}
          y={y - 16}
          fill="#FFFFFF"
          textAnchor="middle"
          className="font-bold text-sm"
        >
          {`${value}%`}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <p className="font-bold mb-2">{label.replace('\n', ' ')}</p>
          <p className="text-sm">Value: {payload[0].value}%</p>
          <p className="text-sm">CI: ±{payload[0].payload.error}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg">
      <div className="text-center font-bold text-2xl mb-8 text-gray-800">
        Statistical Analysis of Nanobot Performance
      </div>
      <div className="h-96 bg-white rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 40, right: 40, left: 60, bottom: 40 }}
            barSize={80}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 14, fill: "#4B5563", fontWeight: 500 }}
              interval={0}
              height={60}
              axisLine={{ stroke: '#9CA3AF' }}
            />
            <YAxis
              domain={[80, 100]}
              ticks={[80, 85, 90, 95, 100]}
              tick={{ fontSize: 14, fill: "#4B5563" }}
              axisLine={{ stroke: '#9CA3AF' }}
              label={{
                value: "Percentage (%)",
                angle: -90,
                position: "insideLeft",
                offset: 15,
                fontSize: 16,
                fontWeight: 500,
                fill: "#4B5563"
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              shape={<CustomBar />}
              label={renderCustomBarLabel}
            >
              {data.map((entry, index) => (
                <ErrorBar
                  key={`error-${index}`}
                  dataKey="error"
                  width={40}
                  strokeWidth={2}
                  stroke="#1F2937"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-sm text-gray-600 mt-6 bg-white p-3 rounded-lg">
        Error bars represent 95% confidence intervals
      </div>
    </div>
  );
};

export default NanobotStatsChart;