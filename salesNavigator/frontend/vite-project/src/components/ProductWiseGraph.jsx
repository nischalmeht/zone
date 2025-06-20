import React from 'react';

const ProductWiseGraph = ({ products = [], totalSales = "$1.2M", change = "+12%" }) => {
    const maxSale = Math.max(...products.map(p => p.totalSalesAmount));

const productChartData = products.slice(0, 5).map(p => ({
  name: p._id,
  percentage: Math.round((p.totalSalesAmount / maxSale) * 100)
}));
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Top 5 Products
            </h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#dce1e5] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal">Product Sales Contribution</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate">{totalSales}</p>
                <div className="flex gap-1">
                  <p className="text-[#637988] text-base font-normal leading-normal">Last Quarter</p>
                  <p className="text-[#078838] text-base font-medium leading-normal">{change}</p>
                </div>

                <div className="grid min-h-[180px] gap-x-4 gap-y-6 grid-cols-[auto_1fr] items-center py-3">
                  {productChartData.map((product, idx) => (
                    <React.Fragment key={idx}>
                      <p className="text-[#637988] text-[13px] font-bold leading-normal tracking-[0.015em]">{product.name}</p>
                      <div className="h-full flex-1">
                        <div
                          className="border-[#637988] bg-[#f0f3f4] border-r-2 h-full"
                          style={{ width: `${product.percentage}%` }}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWiseGraph;
