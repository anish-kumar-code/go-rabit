import { Col, Row } from 'antd';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer } from 'recharts'

const data = [
    { month: 'Jan', revenue: 4000, orders: 2400 },
    { month: 'Feb', revenue: 3000, orders: 1398 },
    { month: 'Mar', revenue: 9800, orders: 4000 },
    // Add more data...
];

const categoryData = [
    { name: 'Food', value: 400 },
    { name: 'Grocery', value: 300 },
    { name: 'Electronics', value: 300 },
];

export default function DashboardCharts() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Business Analytics</h2>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <div className="h-64">
                        <h4 className="mb-2">Revenue Trend</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <div className="h-64">
                        <h4 className="mb-2">Order Analytics</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <Bar dataKey="orders" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>

                <Col span={24}>
                    <div className="h-64">
                        <h4 className="mb-2">Category Distribution</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={80} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </div>
    )
}