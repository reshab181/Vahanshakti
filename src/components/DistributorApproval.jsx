import React, { useState } from 'react';
 export const DistributorApproval = () => {
    const [approvalData, setApprovalData] = useState([
        {
            id: 1,
            entityName: 'Distributor 1',
            entityCode:'hfytdfytfyf',
            kycgstpan: 'ABC123XYZ',
            status: 'Pending'
        },
        {
            id: 2,
            entityName: 'MMI',
            entityCode:'tftdfdyfe',
            kycgstpan: 'PQR456LMN',
            status: 'Approved'
        },
        {
            id: 3,
            entityName: 'edekjdweud',
            entityCode:'tftdfdyfe',
            kycgstpan: 'nnewndwe',
            status: 'Approved'
        },
        {
            id: 4,
            entityName: 'Chandan',
            entityCode:'tedebw',
            kycgstpan: 'nnknenewn',
            status: 'Pending'
        },
        // Add more approval data as needed
    ]);
    return (
        <div className="distributor-approval-table">
            <h2>Distributor Approval Data</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>entity name</th>
                        <th>entity code</th>
                        <th>kycgstpan</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {approvalData.map(data => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.entityName}</td>
                            <td>{data.entityCode}</td>
                            <td>{data.kycgstpan}</td>
                            <td>{data.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};