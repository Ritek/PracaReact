import React, {useState, useEffect} from 'react'

import Axios from 'axios'

import decode from 'jwt-decode'

import ShowTests from './ShowTests'

function TestList() {
    const {id} = decode(sessionStorage.getItem('token'));

    const [list, setList] = useState([]);
    const [search, setSearch] = useState({content: ""});

    useEffect(() => {
        Axios.post('/api/tests/gettests', {id: id}).then(res => {
            console.log(res.data);
            setList(res.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleSearch = (event) => {
        setSearch({content: event.target.value});
    }

    const handleTags = (value) => {
        setSearch({content: value});
    }

    return (
        <div>
            <div className="card mb-4">
                <h1>Your tests</h1>
                <div className="card-body">
                    <input type="text" className="form-control mb-1" onChange={(e) => handleSearch(e)} 
                    value={search.content} placeholder="Type here to filter list by test name or it's tags" />
                </div>
            </div>

            {list.length !== 0 &&
                <ShowTests initial={list} search={search.content} handleTags={handleTags}/>
            }
        </div>
    )
}

export default TestList
