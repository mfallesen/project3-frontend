import React from 'react';
import SearchBar from 'material-ui-search-bar';
import './SearchForm.css';


export default function SearchForm(props){

    return (
        <SearchBar
          value={props.search}
          onChange={props.handleInputChange}
          
        />
      );
}

