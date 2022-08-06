import React from 'react';
import { Route, Link } from 'react-router-dom';
import { debounce } from 'lodash';
import './App.css';
import * as BooksAPI from './utils/BooksAPI';
import EachShelf from './components/EachShelf';
import SearchBar from './components/SearchBar';

class BooksApp extends React.Component {
  state = {
    query: '',
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchResults: [],
  };

  //  shelvesLayout = [
  //   {label: 'currentlyReading', shelfName: 'Currently Reading'},
  //   {label: 'wantToRead', shelfName: 'Want To Read'},
  //   {label: 'read', shelfName: 'Read'}
  // ]

  componentDidMount() {
    BooksAPI.update({ id: 'dummy' }, 'none')
      .then((shelvesObject) => this.updateShelf(shelvesObject))
      .then(() =>
        console.log('App: component did mount, book shelves were just updated.')
      )
      .catch((e) => {
        console.log(e);
        return [];
      });
  }

  // updateShelf = (shelvesObject) => this.setState(shelvesObject)
  updateShelf = (shelvesObject) => {
    this.setState(shelvesObject);
    console.log('updateshelf!');
  };
  // used by initialization (hereabove), in BookComponent and in SearchBar

  updateQuery = (query) => {
    console.log(query);
    // this.setState({'query': query})}
    debounce(this.setState({ query: query }), 200);
  };

  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books">
          <Route
            exact
            path="/react-probooks/search/"
            render={() => (
              <div>
                <SearchBar
                  query={this.state.query}
                  updateQuery={this.updateQuery}
                  updateShelf={this.updateShelf}
                />
                <div className="search-books-results">
                  <EachShelf
                    ShelfName="Search Results"
                    updateShelf={this.updateShelf}
                    ThisShelf={this.state.searchResults}
                  />
                </div>
              </div>
            )}
          />

          <Route
            path="/react-probooks/search/:urlQuery"
            render={({ match }) => (
              <div>
                <SearchBar
                  urlQuery={match.params.urlQuery}
                  query={this.state.query}
                  updateQuery={this.updateQuery}
                  updateShelf={this.updateShelf}
                />
                <div className="search-books-results">
                  <EachShelf
                    ShelfName="Search Results"
                    updateShelf={this.updateShelf}
                    ThisShelf={this.state.searchResults}
                  />
                </div>
              </div>
            )}
          />

          <Route
            exact
            path="/react-probooks"
            render={() => (
              <div>
                <div className="list-books-content">
                  <EachShelf
                    ShelfName="Currently Reading"
                    updateShelf={this.updateShelf}
                    ThisShelf={this.state.currentlyReading}
                  />
                  <EachShelf
                    ShelfName="Want To Read"
                    updateShelf={this.updateShelf}
                    ThisShelf={this.state.wantToRead}
                  />
                  <EachShelf
                    ShelfName="Read"
                    updateShelf={this.updateShelf}
                    ThisShelf={this.state.read}
                  />
                </div>
                <div className="open-search">
                  <Link to={`/react-probooks/search/${this.state.query}`}>
                    Add a book
                  </Link>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

export default BooksApp;
