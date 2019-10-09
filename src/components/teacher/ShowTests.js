import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function ShowTests(props) {
    const initial = props.initial;

    const [filtered, setFiltered] = useState(initial);;

    useEffect(() => {
        console.log("search", props.search);
        console.log('initial:', initial);
        if (props.search === "") {
            console.log("EMPY!");
            setFiltered(initial);
        }
        else {
            let temp = [];
            for (let i=0;i<initial.length;i++) {
                var re = new RegExp(props.search, 'i');
                if (initial[i].name.toString().match(re) || initial[i].tags.toString().match(re)) {
                    temp.push(initial[i]);
                }
            }
            setFiltered(temp);
        }
    }, [props.search]);

    const searchTag = (value) => {
        console.log('value:', value.tag.toString());
        props.handleTags(value.tag);
    }

    return (
        <div>
            {
                filtered.map((test, index) => (
                    <div key={index} className="card">
                        <div className="card-body"> 
                            <h3 className="text-left">Name: {test.name}</h3>
                            <div>
                                {
                                    test.tags.map((tag, index2) => (
                                        <div key={index2} className="badge badge-primary m-1" style={{cursor: 'pointer'}} value={tag} 
                                            onClick={() => searchTag({tag})}><h4>{tag}</h4>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="card-footer text-right">
                            <p>{test.id}</p>
                            <Link to={`/user/edittest/${test.id}`} className="btn btn-primary mr-2">Edit</Link>
                            {/* <button className="btn btn-primary mr-1">Edit</button> */}
                            <button className="btn btn-danger" onClick={() => props.deleteTest(test.id, index)}>Delete</button>
                        </div>
                    </div>
                )) 
            }
        </div>
    )
}

export default ShowTests
