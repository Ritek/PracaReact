import React from 'react'
import {Link} from 'react-router-dom'

function ShowSingleTest(props) {
    return (
        <div className="card mb-5">
            <div className="card-body"> 
                <h3 className="text-left">Name: {props.test.name}</h3>
                <div className="mb-4">
                    {
                        props.test.tags.map((tag, index2) => (
                            <div key={index2} className="badge badge-primary m-1" style={{cursor: 'pointer'}} value={tag} 
                                onClick={() => props.searchTag({tag})}><h4>{tag}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="card-footer text-right">
                <Link to={`/user/edittest/${props.test._id}`} className="btn btn-primary mr-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => props.deleteTest(props.test._id)}>Delete</button>
            </div>
        </div>
    )
}

export default ShowSingleTest
