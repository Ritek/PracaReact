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

    const changePoints = (exNumber, points) => {
        if (canEdit) {
            console.log('can edit');
            let temp = JSON.stringify(test);
            temp = JSON.parse(temp);
            if (points <= temp.questions[exNumber].points) {
                temp.questions[exNumber].correct = points;
            }
            setTest(temp)
        } else console.log('cant edit');
    }

    useEffect(() => {
        console.log(test);
    }, [test])

    return (
        <div>
            {test !== undefined && id === test.author && 
                <div className="jumbotron mb-5">
                    <h3 className="mb-3">Save and mark as graded</h3>
                    <button className="btn btn-primary">Save Changes</button>
                </div>
            }

            <div>
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
