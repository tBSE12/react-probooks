import * as BooksAPI from '../utils/BooksAPI'

export const doSearch = (query) =>
  BooksAPI.search(query, 20)
    .then((res) => res.map((book) => (book.id)))       
    .then((res) => [...new Set(res)])                 

    .then((myArray) => ({"searchResults": myArray}))   
    .catch((e) => {
      console.log(e);
      return []})
