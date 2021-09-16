import React from 'react';
import { Line } from 'react-chartjs-2';

import './ChartLine.css'

const ChartLine = () => {

    const data = {
        labels: [
            '1', '2', '3', '4', '5',
            '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15',
            '16', '17', '18', '19', '20'
        ],
        datasets: [
            {
                label: 'Quantidade de transações PIX',
                data: [
                    1500, 13000, 3700, 1700, 3700,
                    6250, 1500, 13000, 3800, 5500, 
                    3300, 3850, 1850, 12900, 3950, 
                    7800, 8200, 5500, 8250, 3650
                ],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };


    return (
        <div className="chart-line">
            <Line
                data={data}
                width={500}
                height={100}
                options={options} />
        </div>
    );
}

export default ChartLine;