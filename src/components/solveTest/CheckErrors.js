import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import decode from 'jwt-decode'

import Open from './errorQuestion/Open'
import Choices from './errorQuestion/Choices'
import TrueFalse from './errorQuestion/TrueFalse'
import Blanks from './errorQuestion/Blanks'

function CheckErrors({match}) {
    const {id} = decode(sessionStorage.getItem('token'));

    const [test, setTest] = useState(undefined);
    const [canEdit, setCanEdit] = useState(false);
    const [response, setResponse] = useState({msg: undefined});
    
    useEffect(() => {
        //console.log(match.params.id);
        Axios.post('/api/tests/solvederrors', {testId: match.params.id}).then(res => {
            console.log("res:", res.data);
            setTest(res.data);

            if (id === res.data.author) setCanEdit(true);
            else setCanEdit(false);

        }).catch(error => {
            console.log(error);
        })
    }, [])

    const changePoints = (exNumber, points, max) => {
        console.log(points);
        if (canEdit) {
            let temp = JSON.stringify(test);
            temp = JSON.parse(temp);

            let cos = parseInt(points) || 0;
            if (cos <= max) temp.questions[exNumber].correct = cos;
            else temp.questions[exNumber].correct = max;
            setTest(temp)
        } else console.log('cant edit');
    }

    const saveChanges = () => {
        console.log('save changes');

        Axios.post('/api/tests/savegraded', {test: test}).then(res => {
            console.log("res:", res.data);
            setResponse({msg: res.data.msg});
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(response);
    }, [response])

    useEffect(() => {
        console.log(test);
    }, [test])

    return (
        <div>
            {response.msg !== undefined &&
                <p className="alert alert-primary">{response.msg}</p>
            }

            {test !== undefined && id === test.author && test.status !== "graded" &&
                <div className="jumbotron mb-5">
                    <h3 className="mb-3">Save and mark as graded</h3>
                    <button className="btn btn-primary" onClick={() => saveChanges()}>Save Changes</button>
                </div>
            }

            <div>
                {test !== undefined &&
                    <div className="card mb-5">
                        <div className="card-body" style={{fontSize: '24px'}}>
                            Points scored: {test.allGotPoints}<br/>
                            Max score: {test.allPossiblePoints}<br/>
                            Percentage: {((test.allGotPoints/test.allPossiblePoints)*100).toFixed(2)}%<br/>
                        </div>
                    </div>
                }

                {test !== undefined &&
                    test.questions.map((question, index) => {
                        if (question.type === "open") {
                            return <Open key={index} question={question} changePoints={changePoints} exNum={index} canEdit={canEdit}/>
                        }
                        if (question.type === "choices") {
                            return <Choices key={index} question={question} changePoints={changePoints} exNum={index} canEdit={canEdit}/>
                        }
                        if (question.type === "truefalse") {
                             return <TrueFalse key={index} question={question} changePoints={changePoints} exNum={index} canEdit={canEdit}/>
                        }
                        if (question.type === "blanks") {
                            return <Blanks key={index} question={question} changePoints={changePoints} exNum={index} canEdit={canEdit}/>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default CheckErrors
