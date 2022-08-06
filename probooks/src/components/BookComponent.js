import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI'

class BookComponent extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    console.log('BookComponent: creating initial state of book with "none" state.')
    this.state = {
      id: this.props.id,
      title: '',
      authors: [''],
      imageLinks: {smallThumbnail: ''},
      shelf: 'none'
      // Initial value of 'shelf' is 'none'.
      // If book belongs to a shelf, and app is showing shelves,
      // then shelf value will be updated as soon as app.js state updates with the shelf content
      // If we are not showing the shelves, but the searchResults, then xxx
    };
  }

  componentDidMount() {
    BooksAPI
      .get(this.props.id)
      .then(res => this.setState(res))
    console.log('BookComponent did mount, state was set based on get(book), for each book.')
    }

  handleChange(event) {
    let newShelf=event.target.value
    let previousShelf=this.state.shelf  // so we can rollback the change later if API call fails
    this.setState({shelf: newShelf})   // hoping API call won't fail
    BooksAPI
      .update({'id': this.state.id}, newShelf)   // API call
      .then((shelvesObject) => this.props.updateShelf(shelvesObject))
      // NB this updates the currentlyReading, read and wantToRead shelves, but not the searchResults shelf.
      // This is why we had to do this.setState({shelf: newShelf}) a few lines earlier to manually upate the shelf state of this book
      // so that the book status is shown correctly in the searchResults shelf
      .catch(() => (this.setState({shelf: previousShelf})))        // rollback if API call failed
  }

  render(){
    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            title={this.props.id}
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${this.state.imageLinks.smallThumbnail})`
            }}>
          </div>

            <div className='book-shelf-changer'>
              <form>
                <select value={this.state.shelf} onChange={this.handleChange}>
                  <option disabled>Move to...</option>
                  <option value='currentlyReading'>Currently Reading</option>
                  <option value='wantToRead'>Want to Read</option>
                  <option value='read'>Read</option>
                  <option value='none'>None</option>
                </select>
              </form>
            </div>
        </div>
        <div className='book-title'>{this.state.title}</div>
        <div className='book-authors'>
					{ this.state.authors && this.state.authors.map( (author,index) => (<p key={index}>{author}</p>)) }
				</div>
      </div>
    )
  }
}

BookComponent.propTypes = {
  id: PropTypes.string.isRequired,
}

export default BookComponent
