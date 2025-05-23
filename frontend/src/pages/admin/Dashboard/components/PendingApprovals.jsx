import { Card, Button, Progress, Tag } from 'antd';
import { RiUserReceivedLine, RiCheckDoubleLine, RiCloseCircleLine } from 'react-icons/ri';
import { motion } from 'motion/react';

const vendors = [
    {
        id: 1,
        businessName: "Fresh Foods Co.",
        location: "New York, USA",
        submitted: "2024-03-15",
        status: "documents",
        businessType: "Grocery",
        progress: 35
    },
    {
        id: 2,
        businessName: "Tech Gadgets Ltd.",
        location: "London, UK",
        submitted: "2024-03-18",
        status: "verification",
        businessType: "Electronics",
        progress: 65
    },
    {
        id: 3,
        businessName: "Urban Fashion",
        location: "Paris, France",
        submitted: "2024-03-20",
        status: "review",
        businessType: "Apparel",
        progress: 90
    },
];

export default function PendingApprovals() {
    const statusConfig = {
        documents: { color: "orange", text: "Documents Review" },
        verification: { color: "blue", text: "Background Check" },
        review: { color: "purple", text: "Final Approval" }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card
                title={
                    <div className="flex items-center gap-3">
                        <RiUserReceivedLine className="text-xl text-blue-600" />
                        <span className="text-lg font-semibold">Vendor Approvals</span>
                        <Tag className="ml-2" color="orange">{vendors.length} Pending</Tag>
                    </div>
                }
                className="shadow-lg hover:shadow-xl transition-shadow"
            >
                <div className="space-y-6">
                    {vendors.map((vendor, index) => (
                        <motion.div
                            key={vendor.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="p-4 border rounded-xl hover:border-blue-200 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">{vendor.businessName}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Tag color="geekblue">{vendor.businessType}</Tag>
                                            <span className="text-gray-500 text-sm">
                                                {vendor.location}
                                            </span>
                                        </div>
                                        <div className="mt-3 flex items-center gap-4">
                                            <Progress
                                                percent={vendor.progress}
                                                strokeColor="#3b82f6"
                                                showInfo={false}
                                                className="w-40"
                                            />
                                            <Tag color={statusConfig[vendor.status].color}>
                                                {statusConfig[vendor.status].text}
                                            </Tag>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            type="primary"
                                            icon={<RiCheckDoubleLine />}
                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                            onClick={() => console.log("Approve", vendor.id)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            danger
                                            icon={<RiCloseCircleLine />}
                                            className="flex items-center gap-2"
                                            onClick={() => console.log("Reject", vendor.id)}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                    <span>Submitted: {vendor.submitted}</span>
                                    <a href={`/vendors/${vendor.id}`} className="text-blue-600">
                                        View Details →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <Button
                        type="link"
                        icon={<RiUserReceivedLine className="align-middle" />}
                        className="text-blue-600 font-semibold"
                    >
                        View All Vendor Applications
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
}