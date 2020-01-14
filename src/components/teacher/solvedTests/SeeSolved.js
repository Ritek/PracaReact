import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import ShowSolved from './ShowSolved'

import {Redirect} from 'react-router-dom'

function SeeSolved() {

    const [gradedTests, setGradedTests] = useState([]);
    const [awaitTests, setAwaitTests] = useState([]);

    const [redirect, setRedirect] = useState({logic: false, id: undefined});

    const makeRedirect = (id) => {
        console.log('id:', id);
        setRedirect({logic: true, id: id});
    }

    useEffect(() => {
        Axios.post('/api/tests/getallsolved').then(res => {
            console.log("responce", res.data);
            setGradedTests(res.data.gradedTests)
            setAwaitTests(res.data.awaitTests)
        }).catch(error => {
            console.log(error);
        });
    }, [])

    return (
        <div>
            {redirect.logic === true && redirect.id !== undefined &&
                <Redirect to={`/user/checkgraded/${redirect.id}`} />
            }

            <h3 className="text-left">Graded tests</h3>
            {
                gradedTests !== undefined && 
                <ShowSolved solvedTests={gradedTests} makeRedirect={makeRedirect}/>
            }

            {gradedTests.length == 0 &&
                <div className="jumbotron">
                    <h1>No graded tests.</h1>
                </div>
            }

            <div className="mb-5"></div>

            <h3 className="text-left">Tests awaiting grade</h3>
            {
                awaitTests !== undefined && 
                <ShowSolved solvedTests={awaitTests} makeRedirect={makeRedirect}/>
            }

            {awaitTests.length == 0 &&
                <div className="jumbotron">
                    <h1>No tests to grade.</h1>
                </div>
            }
        </div>
    )
}

export default SeeSolved
