import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import Open from './errorQuestion/Open'
import Choices from './errorQuestion/Choices'
import TrueFalse from './errorQuestion/TrueFalse'
import Blanks from './errorQuestion/Blanks'

function CheckErrors({match}) {

    const [test, setTest] = useState(undefined);
    
    useEffect(() => {
        console.log(match.params.id);
        Axios.post('/api/tests/solvederrors', {testId: match.params.id}).then(res => {
            console.log("res:", res.data);
            setTest(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        console.log(test);
    }, [test])

    return (
        <div>
            Check Errors {match.params.id}

            <div>
                {test !== undefined &&
                    test.questions.map((question, index) => {
                        if (question.type === "open") return <Open key={index} question={question}/>
                        if (question.type === "choices") return <Choices key={index} question={question}/>
                        if (question.type === "truefalse") return <TrueFalse key={index} question={question}/>
                        if (question.type === "blanks") return <Blanks key={index} question={question}/>
                    })
                }
            </div>
        </div>
    )
}

export default CheckErrors
