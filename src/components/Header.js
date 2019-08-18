import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonLink from './ButtonLink';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Grid from '@material-ui/core/Grid';

const headerStyle = {
    backgroundColor: "#3f51b5",
    fontSize: "20px",
    color: "white",
    position: "fixed",
    height: "60px",
    width: "100%"
  };
  
  const phantomStyle = {
    display: "block",
    height: "50px",
    width: "100%"
  };
  
export default class Header extends Component {

    render() {
        return (
            <Grid style={phantomStyle}  >

            <AppBar style={headerStyle}>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Property Management
                    </Typography>
                    &nbsp; &nbsp; &nbsp; 
                
                    <ButtonLink href="/" color="inherit">
                    <DashboardIcon />
                    Properties
                    </ButtonLink>
                    <ButtonLink href="/supplies_expense" color="inherit">
                    <AccountBalanceIcon />
                    Expenses
                    </ButtonLink>
                    <ButtonLink href="/expense_report"color="inherit">
                    <BarChartIcon />
                    Reports
                    </ButtonLink>
                  
                    

                        
           
                </Toolbar>
            </AppBar>
            </Grid>
        );
    }
}