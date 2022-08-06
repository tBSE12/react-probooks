import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as Utils from '../utils/Utils'

class SearchBar extends Component {

  componentDidMount(){
    if (this.props.urlQuery && (this.props.urlQuery !== this.props.query)) {
      this.props.updateQuery(this.props.urlQuery)}
  }

  componentDidUpdate(prevProps, prevState){
    console.log('SearchBar: component did update, will doSearch if conditions met')
    if ((this.props.query && (prevProps.query !== this.props.query))) {
      console.log("calling doSearch");
      Utils.doSearch(this.props.query.trim())
      .then((shelvesObject) => this.props.updateShelf(shelvesObject))
    }
    else {console.log("didn't doSearch...")}
  }

  render() {
    return (
        <div className="search-books">
          <div className='search-books-bar'>
            <Link
              to='/'
              className='close-search' >Close</Link>
            <div className='search-books-input-wrapper'>
              <input
                type='text'
                placeholder='Search by title or author'
                value={this.props.query}
                onChange={(event) => (this.props.updateQuery(event.target.value))}/>
            </div>
          </div>
        </div>
      )
    }
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  urlQuery: PropTypes.string,
  updateQuery: PropTypes.func.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default SearchBar