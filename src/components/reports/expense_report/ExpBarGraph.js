import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
/**
 * 
 * Bar Graph Representation of the overall expenses 
 */
const ExpBarGraph = (props) => {
    return (
        <div>
            <Chart
                width={'800px'}
                height={'600px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={props.exp}
                options={{
                    title: 'Total Expenses',
                    chartArea: { width: '50%' },
                    hAxis: {
                        title: 'Total Amount',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Type',
                    },
                    backgroundColor: { fill: 'transparent' }
                }}
                // For tests
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )

}

export default ExpBarGraph