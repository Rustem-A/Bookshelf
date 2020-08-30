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
            booksWithoutAuthors: [],
            activeButton: false,
            activeBooks: false,
            activeAuthors: false,
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
        fetch(`/api/books/without_authors`)
            .then(response => {
                return response.json();
            })
            .then(items => {
            this.setState({ booksWithoutAuthors: items });
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
                this.setState({activeButton: false, activeBooks: true, activeAuthors: false});
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
                this.setState({activeButton: false, activeBooks: false, activeAuthors: true});
        }
    };

    handleClickOnButton = (e) => {
        this.setState({activeButton: !this.state.activeButton, activeBooks: false, activeAuthors: false});
    };

    renderAuthors() {
        if (this.state.currentBookAuthors.length !== 0) {
        return this.state.currentBookAuthors.map(author => {
            return (
                <div key={author.id}>
                    <div><h4><b>{ author.name }</b></h4></div>
                    <div  style={{color: 'blue'}}>About author:</div>
                    <div>{ author.information }</div><br/>
                </div>   
            );
        })
    } else {
        return <h5>This book does not have an assigned authors</h5>
    }
    }
    renderBooksWithoutAuthors() {
        return this.state.booksWithoutAuthors.map(book => {
            return (
                <h5 key={book.id}><p>{ book.title }</p></h5>  
            );
        })
    }
    render() {
        const {books} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <Book books={books} getAuthors={this.handleClickOnBook}/>
                                <Author authors={this.state.authors} getTotalPrice={this.handleClickOnAuthor}/>
                                <div className="card-body">
                                    <div className="card">
                                        <div className="btn-group">
                                            <button onClick={this.handleClickOnButton} type="button" className="btn btn-primary">Show books without authors</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div >
                                    {this.state.activeBooks? this.renderAuthors(): ''}
                                </div>
                                <div >
                                    {this.state.activeAuthors? <p>All books by this author cost <b>{this.state.totalPriceAutorBooks}</b> rubles</p>: ''}
                                </div>
                                <div >
                                    {this.state.activeButton? this.renderBooksWithoutAuthors(): ''}
                                </div>
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
