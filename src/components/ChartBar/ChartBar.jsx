import React from 'react';
import { Bar } from 'react-chartjs-2';

import './ChartBar.css'

const ChartBar = () => {

    const data = {
        labels: ['Zapelino', 'Oi', 'BRB', 'BRB Nação'],
        datasets: [
            {
                label: 'Contas abertas',
                data: [2300, 1250, 600, 1000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Contas Abertas - BOT',
            },
        },
    };

    return (
        <>
            <div className='header'>
                <h1 className='title'>Dashboard</h1>
            </div>
            <div className="line-bar">
                <Bar
                    data={data}
                    width={500}
                    height={100}
                    options={options} />
            </div>
        </>
    );
}

export default ChartBar;