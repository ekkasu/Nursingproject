import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#2563eb', '#22c55e', '#f59e42', '#a855f7', '#f43f5e'];

const DonutChart = ({ data, centerText }) => (
  <div style={{ position: 'relative', width: '100%', height: 220 }}>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    {centerText && (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 20
      }}>{centerText}</div>
    )}
  </div>
);

export default DonutChart; 