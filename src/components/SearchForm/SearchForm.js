import React from 'react';
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/styles'

export default function SearchForm(props) {
  
  return (
    <SearchBar
    
      value={props.search}
      onChange={props.handleInputChange}

    />
  );
}

