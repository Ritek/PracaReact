import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios'

import './testQuestions/style.css'

import Open from './testQuestions/Open'
import Choices from './testQuestions/Choices'
import TrueFalse from './testQuestions/Subquestions'
import Blanks from './testQuestions/Blanks'

import Timer from '../student/Timer'

function SolveTest({match}) {
    const [test, setTest] = useState({time: undefined});

    const testRef = useRef(undefined);
    testRef.current = undefined;

    const updateTest = (newQuestion, index) => {
        //console.log('update Test');

        let copy = Array.from(test.questions);
        copy[index] = newQuestion;
        
        setTest({...test, questions: copy});
    }

    const getTest = () => {
        Axios.post('/api/tests/solvetest', {testId: match.params.id}).then(res => {
            console.log("res:", res.data);
            setTest(res.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const sendSolved = () => {
        //console.log("!!!!!", testRef.current);
        Axios.post('/api/tests/savesolved', {test: testRef.current}).then(res => {
            console.log(res.body);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getTest();
    }, []);

    useEffect(() => {
        if (test.time !== undefined) {
            console.log('prepare timout ====>');

            let timer = setTimeout(() => {
                sendSolved();
                alert('Times up!');
            }, [test.time * 60000]);
    
            return () => {
                clearTimeout(timer);
            }
        }
    }, [test.time])

    useEffect(() => {
        console.log("test >", test);
        testRef.current = test;
    }, [test.questions])

    return (
        <div>
            <div className="mb-4">
                {test.time !== undefined &&
                    <Timer time={test.time}/>
                }
            </div>

            { test.questions !== undefined &&
                test.questions.map((question, index) => (
                    <div key={index} className="text-left" style={{marginBottom: "70px"}}>
                        <h4>{question.points}p</h4>
                        <h5 className="mb-4">{question.instruction}</h5>

                        {question.type === "open" &&
                            <Open question={question} questionNum={index} updateTest={updateTest}/>
                        }
                        {question.type === "choices" &&
                            <Choices question={question} questionNum={index} updateTest={updateTest}/>
                        }
                        {question.type === "truefalse" &&
                            <TrueFalse question={question} questionNum={index} updateTest={updateTest}/>
                        }
                        {question.type === "blanks" &&
                            <Blanks question={question} questionNum={index} updateTest={updateTest}/>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default SolveTest
