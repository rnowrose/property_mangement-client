import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
      color: "#3f51b5"
    },

    header: {
        backgroundColor:'#3f51b5',
        color:'white'
    }
  });

class Loading extends Component {
    state = {
        completed: 0,
      };
    
      componentDidMount() {
        this.timer = setInterval(this.progress, 20);
      }
    
      componentWillUnmount() {
        clearInterval(this.timer);
      }
    
      progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
      };

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={true}>
       <DialogTitle id="max-width-dialog-title" className={classes.header}>
       <Typography className={classes.header}>

       Page Loading Please Wait...
       </Typography>
       </DialogTitle>
       <DialogContent align='center'>
             <CircularProgress
          className={classes.progress}
          variant="determinate"
          value={this.state.completed}
        />
        </DialogContent>
        </Dialog>

        );
    }
}

export default withStyles(styles)(Loading);