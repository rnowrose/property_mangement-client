import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

/**
 * Pie Chart representation of overall expenses
 */
const ExpPieChart = (props) => {
    return (
        <div>
            <Chart
                width={'800px'}
                height={'600px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={props.exp}
                options={{
                    title: 'Expense Report',
                    backgroundColor: { fill: 'transparent' }
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )

}

export default ExpPieChart