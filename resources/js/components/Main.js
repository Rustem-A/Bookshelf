import React from 'react';
import ReactDOM from 'react-dom';

import Book from './Book';
import Author from './Author';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentBookAuthors: [],
            authors: [],
            totalPriceAutorBooks: 0,
        };
    };

    componentDidMount() {
        fetch(`/api/books`)
            .then(response => {
                return response.json();
            })
            .then(items => {
            this.setState({ books: items });
            });
        fetch(`/api/authors`)
            .then(response => {
                return response.json();
            })
            .then(items => {
            this.setState({ authors: items });
            });
    };
    
    handleClickOnBook = (bookId) => (e) => {
        if (bookId) {
            fetch(`/api/books/${bookId}/authors`)
                .then(response => {
                    return response.json();
                })
                .then(authors => {
                    this.setState({ currentBookAuthors: authors });
                });
        }
    }

    handleClickOnAuthor = (authorId) => (e) => {
        if (authorId) {
            fetch(`/api/authors/${authorId}/books/total_price`)
                .then(response => {
                    return response.json();
                })
                .then(price => {
                    this.setState({ totalPriceAutorBooks: price });
                });
        }
    }

    renderAuthors() {
        return this.state.currentBookAuthors.map(author => {
            return (
                <div key={author.id}>
                    <div><h4><b>{ author.name }</b></h4></div>
                    <div  style={{color: 'blue'}}>About author:</div>
                    <div>{ author.information }</div><br/>
                </div>   
            );
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <Book books={this.state.books} getAuthors={this.handleClickOnBook}/>
                                <Author authors={this.state.authors} getTotalPrice={this.handleClickOnAuthor}/>
                            </div>
                            <div className="card-body">
                                {this.renderAuthors()}
                                {this.state.totalPriceAutorBooks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
