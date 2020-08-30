import React from 'react';

const Author = (props) => {
    console.log(props)
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Authors
                                    </button>
                                    <div className="dropdown-menu">
                                        {props.authors.map(author => {
                                            return (
                                                <a key={author.id} onClick={props.getTotalPrice(author.id)} className="dropdown-item" href="#">{author.name}</a>
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

export default Author;