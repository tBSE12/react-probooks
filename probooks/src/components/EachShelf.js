import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BookComponent from './BookComponent'

class EachShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.ShelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.ThisShelf.map((id) => (
              <li key={id}>
                <BookComponent
                  updateShelf={this.props.updateShelf}
                  id={id}/>
              </li>
            ))
          }
          </ol>
      </div>
    </div>
    )
  }
}

EachShelf.propTypes = {
  ShelfName: PropTypes.string.isRequired,
  ThisShelf: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default EachShelf
