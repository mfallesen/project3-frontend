import React from 'react';
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/styles'



const useStyles = makeStyles({
  searchbarRoot: {
    marginLeft: 'auto',
    marginTop: 15,
  },
})

export default function SearchForm(props) {
  const classes = useStyles();
  return (
    <SearchBar
    className={classes.searchbarRoot}
      value={props.search}
      onChange={props.handleInputChange}

    />
  );
}

