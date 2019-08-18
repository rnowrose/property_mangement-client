/**
 * 
 * captialize the first letter of a specific word.
 */

const styles = theme => ({
    div:{
      display: 'flex',
      flexDirection: 'row wrap',
      padding: 20,
      width: '100%'
    },
    paperLeft:{
      flex: 1,
      height: '100%',
      margin: 10,
      textAlign: 'center',
      padding: 10,
      color:"inherit"
  
    },
    paperRight:{
      height: 600,
      flex: 4,
      margin: 10,
      textAlign: 'center',
    }
  });

  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

export {styles,capitalize}