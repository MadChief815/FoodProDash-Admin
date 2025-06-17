import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
    { x: 5000, y: 22 },
    { x: 8000, y: 28 },
    { x: 10000, y: 90 },
    { x: 15000, y: 48 },
    { x: 20000, y: 64 },
    { x: 25000, y: 42 },
    { x: 30000, y: 46 },
    { x: 35000, y: 21 },
    { x: 40000, y: 25 },
    { x: 45000, y: 60 },
    { x: 50000, y: 50 },
    { x: 55000, y: 46 },
    { x: 60000, y: 48 },
];

const SalesDetailsChart = () => (
    <div style={{
        backgroundColor: "var(--Neutral10)",
        borderRadius: '1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        padding: '1.25rem',
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
        }}>
            <div className='B24N100'>Sales Details</div>
            <label>
                <select
                    className='SB12N60'
                    style={{
                        border: '1px solid #D6D6D6',
                        borderRadius: '0.5rem',
                        padding: '0.5625rem',
                        outline: 'none',
                    }}
                >
                    <option>October</option>
                    <option>November</option>
                </select>
            </label>
        </div>

        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <XAxis
                    dataKey="x"
                    tickFormatter={(x) => `${x / 1000}k`}
                    stroke="#999"
                    tick={({ x, y, payload }) => (
                        <text
                            x={x}
                            y={y}
                            dy={16}
                            textAnchor="middle"
                            fill="var(--Neutral60)"
                            className="B12N60"
                        >
                            {`${payload.value / 1000}k`}
                        </text>
                    )}
                />
                <YAxis
                    domain={[0, 100]}
                    tickFormatter={(y) => `${y}%`}
                    stroke="#999"
                    tick={({ x, y, payload }) => (
                        <text
                            x={x}
                            y={y}
                            dy={4}
                            textAnchor="end"
                            fill="var(--Neutral60)"
                            className="B12N60"
                        >
                            {`${payload.value}%`}
                        </text>
                    )}
                />
                <Tooltip contentStyle={{ backgroundColor: '#3B82F6', color: '#fff', border: 'none' }} />
                <Area type="linear" dataKey="y" stroke="#3B82F6" fill="url(#colorBlue)" dot={{ stroke: '#3B82F6', fill: '#3B82F6', r: 4 }} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default SalesDetailsChart;