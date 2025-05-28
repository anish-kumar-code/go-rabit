import { Row, Col, Button } from 'antd';
import OrderDetails from '../components/OrderDetails';
import OrderInvoice from '../components/OrderInvoice';
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';

const OrderDetailsPage = () => {
    const contentRef = useRef(null);

    const handlePrint = useReactToPrint({
        // Switch this line based on your version:
        // For v2.x: 
        contentRef: contentRef,
        // For v3.x: content: () => contentRef.current,
        // content: () => contentRef.current,
        documentTitle: 'Order_Invoice',
        onAfterPrint: () => console.log('Print successful!'),
    });


    return (
        <Row gutter={16} className="p-4">
            <Col xs={24} lg={12}>
                <OrderDetails />
            </Col>
            {/* <Col xs={24} lg={12}>
                <div ref={contentRef}>
                    <OrderInvoice />
                </div>
                <Button
                    type="primary"
                    onClick={handlePrint}
                    className="mt-4"
                >
                    Print Invoice
                </Button>
            </Col> */}
        </Row>
    )
};

export default OrderDetailsPage;