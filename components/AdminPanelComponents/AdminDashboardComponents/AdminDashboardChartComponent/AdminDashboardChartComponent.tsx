
import dynamic from 'next/dynamic';
import { useAdminMainContext } from '@/utils/contexts/adminContexts/adminMainContexts';
import { ApexOptions }  from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboardChartComponent() {

    const {theme} = useAdminMainContext();

    const chartOptions : ApexOptions = {
            chart: {
                id: "basic-area",
                foreColor: '#d0a12b',
            },
            dataLabels: {
                enabled: false,
            },
            tooltip:{
                enabled: true,
                theme: theme,
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: 'North',
                data: [70, 50, 33, 20, 64, 17, 100, 25]
        },
        ]
    };

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
