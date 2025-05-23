import { Statistic, Row, Col, Card } from 'antd'

export default function QuickStats() {
    return (
        <Card className="shadow-sm">
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Active Vendors" value={45} />
                </Col>
                <Col span={12}>
                    <Statistic title="Pending Shops" value={3} />
                </Col>
                <Col span={12} className="mt-4">
                    <Statistic title="Total Products" value={1200} />
                </Col>
                <Col span={12} className="mt-4">
                    <Statistic title="Today's Orders" value={56} />
                </Col>
            </Row>
        </Card>
    )
}