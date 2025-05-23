import React, { useState } from 'react';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data7Days = [
    { day: 'Mon', food: 400, mart: 240 },
    { day: 'Tue', food: 300, mart: 139 },
    { day: 'Wed', food: 200, mart: 980 },
    { day: 'Thu', food: 278, mart: 390 },
    { day: 'Fri', food: 189, mart: 480 },
    { day: 'Sat', food: 239, mart: 380 },
    { day: 'Sun', food: 349, mart: 430 },
];

const data30Days = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    food: Math.floor(Math.random() * 500 + 100),
    mart: Math.floor(Math.random() * 500 + 100),
}));

const SaleChart = () => {
    const [range, setRange] = useState(7);
    const data = range === 7 ? data7Days : data30Days;

    return (
        <div className="p-4 bg-white rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Sales Overview</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => setRange(7)}
                        className={`${range === 7 ? 'font-bold' : ''}`}
                    >
                        Last 7 Days
                    </button>
                    <button
                        onClick={() => setRange(30)}
                        className={`${range === 30 ? 'font-bold' : ''}`}
                    >
                        Last 30 Days
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="food" name="Food Sales (₹)" stroke="#8884d8" />
                    <Line type="monotone" dataKey="mart" name="Mart Sales (₹)" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SaleChart