import React from 'react';
import ChartBar from '../../components/ChartBar/ChartBar';
import ChartLine from '../../components/ChartLine/ChartLine';
import Navbar from '../../components/Navbar/Navbar';

const DashboardPage = (props) => {
    return (
        <>
            <Navbar />
            <div>
                <ChartBar />
            </div>
            <div>
                <ChartLine />
            </div>
        </>
    );
}

export default DashboardPage;