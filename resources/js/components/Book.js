import React from 'react';

const Main = (props) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Books
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Action</a>
                                        {props.books.map(book => {
                                            return (
                                                <a key={book.id} onClick={props.mainAuthors(book.id)} className="dropdown-item" href="#">{book.title}</a>
                                            );
                                        })}
                                    </div>
                                </div>
                                {}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;