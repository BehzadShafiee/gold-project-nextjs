/* eslint-disable react-hooks/set-state-in-effect */

import dynamic from 'next/dynamic';
import { useAdminMainContext } from '@/utils/contexts/adminContexts/adminMainContexts';
import { ApexOptions }  from 'apexcharts';
import { getProductPriceChangesByProductIdByAxios } from '@/utils/services/admin-services/admin-services';
import { ProductPrice } from '@/utils/interfaces/admin-interfaces/product.interface';
import { useEffect, useState } from 'react';
import { convertDateToPersian, convertNumbersToPersian } from '@/assets/scripts/common/common';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboardChartComponent() {

    const {theme} = useAdminMainContext();

    const [productData , setProductData] = useState({
        product_prices: [],
        product_prices_dates: []
    });

    const handleGetSingleProductPriceChanges = async (pId : string) => {
        const result = await getProductPriceChangesByProductIdByAxios(pId);
        
        if (result.status == 200) {
            const newPrices = result.product.prices.map((p: ProductPrice) => p.calculatedPrice);
            const newDates = result.product.prices.map((p: ProductPrice) => convertDateToPersian(p.createdAt , true));

            setProductData({
                product_prices: newPrices,
                product_prices_dates: newDates
            });
        }
        
    }

    const chartFontStyle = {
        fontSize: '16px',
        fontFamily: 'yekan',
    };

    const persianNumberFormatter = (value: number): string => {
        return String(convertNumbersToPersian(value) ?? '');
    };

    const chartOptions : ApexOptions = {
        chart: {
            id: "basic-area",
            foreColor: '#d0a12b',
            fontFamily: 'yekan'
        },
        dataLabels: {
            enabled: false,
        },
        tooltip:{
            enabled: true,
            theme: theme,
            y: {
                formatter: persianNumberFormatter,
            },
            style: chartFontStyle,
        },
        xaxis: {
                categories: productData.product_prices_dates || [],
                labels: {
                style: chartFontStyle,
            },
        },
        yaxis: {
            labels: {
                style: chartFontStyle,
                formatter: persianNumberFormatter,
            },
        },
        stroke: {
            curve: 'monotoneCubic'
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
        colors: theme == 'light' ? ['#008FFB', '#00E396'] : ['#f8faf9', '#fff'],
    };

    const chartData = {
        series: [
            {
                name: 'South',
                data: productData.product_prices || []
            },
            // {
            //     name: 'North',
            //     data: [70, 50, 33, 20, 64, 17, 100, 25]
            // },
        ]
    };

    useEffect(() => {
        // this could change with a select box of products or get multiple products data at once
        handleGetSingleProductPriceChanges('69648571de8dfb7eb8c1cf5c');
    } , []);

  return (
    <>
        <Chart
            options={chartOptions}
            series={chartData.series}
            type="area"
            width="100%"
            height="400px"
        />
    </>
  )
}
