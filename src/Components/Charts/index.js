import React from 'react';
import { Line, Pie } from '@ant-design/charts';
import "./style.css";

function ChartComponent({ sortedTransaction }) {
    let chart;
    let pieChart;

    let sortedLineData = sortedTransaction.map((val) => {
        return { date: val.date, amount: val.amount }
    });

    const config = {
        data: sortedLineData,
        width: 550,
        height: 300,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    //pie chart
    const sortedPieData = sortedTransaction.map((val) => {
        return { amount: val.amount, type: val.tag }
    });

    const pieConfig = {
        data: sortedPieData,
        width: 550,
        height: 300,
        angleField: 'amount',
        colorField: 'type',
        radius: 0.8,
        label: {
            text: 'amount',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    };

    return (
        <div className='chart-wrapper'>
            <div>
                <h2>Your Analytics</h2>
                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
            <div>
                <h2>Your Spends</h2>
                <Pie {...pieConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
            </div>
        </div>
    );
};

export default ChartComponent;