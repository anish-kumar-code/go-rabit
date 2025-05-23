import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Food', value: 600 },
    { name: 'Grocery', value: 400 }
];

const COLORS = ['#00C49F', '#FF8042'];

function ServiceWiseVendorChart() {
    return (
        <div className="w-full p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Vendor</h2>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} className="cursor-pointer" />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
export default ServiceWiseVendorChart;