import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 15000 },
    { month: 'Mar', sales: 18000 },
    { month: 'Apr', sales: 22000 },
    { month: 'May', sales: 20000 },
    { month: 'Jun', sales: 25000 },
    { month: 'Jul', sales: 27000 },
    { month: 'Aug', sales: 30000 },
    { month: 'Sep', sales: 28000 },
    { month: 'Oct', sales: 32000 },
    { month: 'Nov', sales: 34000 },
    { month: 'Dec', sales: 40000 }
]

function MonthlySalesChart() {
    return (
        <div className="w-full h-96 bg-white rounded-2xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Sales</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MonthlySalesChart
