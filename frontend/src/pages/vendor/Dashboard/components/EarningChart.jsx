import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const earnings7Days = [
    { day: 'Mon', revenue: 240 },
    { day: 'Tue', revenue: 139 },
    { day: 'Wed', revenue: 980 },
    { day: 'Thu', revenue: 390 },
    { day: 'Fri', revenue: 480 },
    { day: 'Sat', revenue: 380 },
    { day: 'Sun', revenue: 430 },
];

const earnings30Days = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    revenue: Math.floor(Math.random() * 800 + 200),
}));

const EarningChart = () => {
    const [range, setRange] = useState(7);
    const data = range === 7 ? earnings7Days : earnings30Days;

    return (
        <div className="p-4 bg-white rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Daily Earnings</h2>
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
                <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue (₹)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default EarningChart