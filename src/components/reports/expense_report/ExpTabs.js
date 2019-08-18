import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ExpBarGraph from './ExpBarGraph'
import ExpPieChart from './ExpPieChart'
import { withStyles } from '@material-ui/core/styles';
import DateRange from '../DateRange';

/**
 * Tabs to diffent display of expense report also including the filter component
 */
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


const ExpTabs = (props) => {
    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={props.value}
                    onChange={props.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Pie Chart" />
                    <Tab label="Bar Graph" />
                    <Tab label="Spreadsheet" />
                </Tabs>
                <DateRange
                    from_date={props.from_date}
                    to_date={props.to_date}
                    handleFromDate={props.handleFromDate}
                    handleToDate={props.handleToDate}
                    submitInfo={props.submitInfo}
                    title="Enter Date Range for Expense Amount"

                />

                {props.value === 0 && <TabContainer><ExpPieChart exp={props.pie_exp} /></TabContainer>}
                {props.value === 1 && <TabContainer><ExpBarGraph exp={props.bar_exp} /></TabContainer>}
                {props.value === 2 && <TabContainer>{props.table}</TabContainer>}
            </AppBar>

        </div>
    )

}

export default withStyles(styles)(ExpTabs)