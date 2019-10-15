import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import decode from 'jwt-decode'

import './testQuestions/style.css'

import Open from './testQuestions/Open'
import Choices from './testQuestions/Choices'
import Subquestions from './testQuestions/Subquestions'

function SolveTest({match}) {
    const {id} = decode(sessionStorage.getItem('token'));
    const [test, setTest] = useState({});

    const handleTextChange = (event, questionNum) => {
        console.log(event.target.value);
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`
        test.questions[questionNum].answer = event.target.value;
        //setTest({...test, questions[questionNum].answer})
    } 

    const updateTest = (newQuestion, index) => {
        console.log('update Test');
        let copy = [...test.questions];
        copy[index] = newQuestion;
        setTest({...test, questions: copy});
    }

    useEffect(() => {
        console.log(match.params.id);

        Axios.post('/api/tests/solvetest', {id: id, testId: match.params.id}).then(res => {
            console.log("res:", res.data);
            setTest(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        console.log("test", test);
    }, [test.questions])

    return (
        <div>
            { test.questions !== undefined &&
                test.questions.map((question, index) => (
                    <div key={index} className="text-left" style={{marginBottom: "70px"}}>
                        <h4>{question.points}p</h4>
                        <h5>{question.instruction}</h5>

                        {question.type === "open" &&
                            <Open question={question} questionNum={index} updateTest={updateTest}/>
                        }
                        {question.type === "choices" &&
                            <Choices choices={question.choices}/>
                        }
                        {question.type === "truefalse" &&
                            <Subquestions subquestions={question.subquestions}/>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default SolveTest
