import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionItems, getProductItems } from '../store/slice/saleSlice';
import Button from './Button';

// Lazy loading charts for better performance
const D3WaveChart = React.lazy(() => import('./D3WaveChart'));
const ProductWiseGraph = React.lazy(() => import('./ProductWiseGraph'));
const RegionSalesBarChart = React.lazy(() => import('./RegionSalesBarChart'));

const tabs = [
    { id: "month", label: "Month Wise" },
    { id: "product", label: "Product Wise" },
    { id: "region", label: "Region Wise" },
];

const Dashboard = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("month");

    const { totalSales, loading, Yearwise = [], last12MonthSales = [], Product = [], RigeonWise = [] } = useSelector((state) => state.sale);

    useEffect(() => {
        dispatch(getAllAuctionItems());
        dispatch(getProductItems());
    }, [dispatch]);

    const formattedData = last12MonthSales.map(d => ({
        year: d.year,
        month: d.month,
        sales: d.totalAmount,
    }));

    const formatCurrency = (val) => `₹ ${val?.toLocaleString('en-IN') || 0}`;
    const formatPercent = (val) => `${val > 0 ? '+' : ''}${val}%`;

    return (
        <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <div className="flex min-w-72 flex-col gap-3">
                        <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight">Sales Overview</p>
                        <p className="text-[#637988] text-sm font-normal leading-normal">Analyze sales performance across different dimensions</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 p-4">
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f3f4]">
                        <p className="text-[#111518] text-base font-medium leading-normal">Total Sales</p>
                        <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight">
                            {formatCurrency(totalSales)}
                        </p>
                        <p className="text-[#078838] text-base font-medium leading-normal">+10%</p>
                    </div>

                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f3f4]">
                        <p className="text-[#111518] text-base font-medium leading-normal">Month-over-Month Change</p>
                        <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight">+5.2%</p>
                        <p className="text-[#078838] text-base font-medium leading-normal">+5.2%</p>
                    </div>

                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f3f4]">
                        <p className="text-[#111518] text-base font-medium leading-normal">Average Order Value</p>
                        <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight">₹125</p>
                        <p className="text-[#e73508] text-base font-medium leading-normal">-2%</p>
                    </div>
                </div>

                <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Sales Trend</h2>

                <div className="flex flex-wrap gap-4 px-4 py-6">
                    {Yearwise.map((item, index) => (
                        <div className="flex min-w-72 flex-1 flex-col gap-2" key={index}>
                            <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate">Year: {item.year}</p>
                            <p className="text-[#111518] text-base font-medium leading-normal">{formatCurrency(item.totalSales)}</p>
                            <div className="flex gap-1">
                                <p className="text-[#637988] text-base font-normal leading-normal">Last 12 Months</p>
                                <p className="text-[#078838] text-base font-medium leading-normal">+5.2%</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-[#8b3dff] bg-white hover:bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-2.5 ${
                                activeTab === tab.id ? 'border border-[#8b3dff]' : ''
                            }`}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>

                <Suspense fallback={<div className="p-6 text-sm text-gray-500">Loading chart...</div>}>
                    {activeTab === 'month' && (
                        <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                            <D3WaveChart salesData={formattedData} />
                            <div className="flex justify-around">
                                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"].map(month => (
                                    <p key={month} className="text-[#637988] text-[13px] font-bold leading-normal tracking-[0.015em]">
                                        {month}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'product' && (
                        <div className="flex flex-1 flex-col gap-8 py-4">
                            <ProductWiseGraph products={Product} />
                        </div>
                    )}

                    {activeTab === 'region' && (
                        <div className="flex flex-col gap-2 rounded-lg border border-[#dce1e5] p-6 min-w-72 flex-1">
                            <p className="text-[#111518] text-base font-medium">Sales by Region</p>
                            <p className="text-[#111518] text-[32px] font-bold leading-tight truncate">₹4.0M</p>
                            <div className="flex gap-1">
                                <p className="text-[#637988] text-base">Last Quarter</p>
                                <p className="text-[#078838] text-base font-medium">+8%</p>
                            </div>
                            <div className="min-h-[180px] mt-2">
                                <RegionSalesBarChart data={RigeonWise} />
                            </div>
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default Dashboard;
