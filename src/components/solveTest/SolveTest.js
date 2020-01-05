import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'

import './testQuestions/style.css'

import Open from './testQuestions/Open'
import Choices from './testQuestions/Choices'
import TrueFalse from './testQuestions/Subquestions'
import Blanks from './testQuestions/Blanks'

import Timer from './testQuestions/Timer'
import decode from 'jwt-decode';

function SolveTest({match}) {
    const [test, setTest] = useState({time: undefined});
    const [redirect, setRedirect] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [delay, setDelay] = useState(1000);

    const [timer, setTimer] = useState(undefined);

    const testRef = useRef(undefined);
    testRef.current = undefined;

    const timerRef = useRef(undefined);
    timerRef.current = undefined;

    const updateTest = (newQuestion, index) => {
        //console.log('update Test');

        let copy = Array.from(test.questions);
        copy[index] = newQuestion;
        
        setTest({...test, questions: copy});
    }

    const getTest = () => {
        Axios.post('/api/tests/solvetest', {testId: match.params.id}).then(res => {
            console.log("res:", res.data);

            if (!sessionStorage.getItem('testToken')) {
                sessionStorage.setItem('testToken', res.data.testToken);
            }

            setTest(res.data.test);

        }).catch(error => {
            console.log(error);
        })
    }

    const sendSolved = () => {
        if (!isTeacher) {
            let test = testRef.current;
            for (let i=0;i<test.questions.length;i++) {
                if (test.questions[i].picture !== undefined) {
                    test.questions[i].picture = "";
                    test.questions[i].image64 = "";
                }
            }

            console.log("XXX", test);

            Axios.post('/api/tests/savesolved', {test: test}).then(res => {
                console.log(res.body);
            }).catch(error => {
                //console.log(error);
            });

            console.log('Attemp uploaded');
            setRedirect(true);
        }
        sessionStorage.removeItem('testToken');
        sessionStorage.removeItem('timer');
    }

    const stopTimer = () => {
        if (delay === 1000) setDelay(0);
        else setDelay(1000);
    }

    useEffect(() => {
        getTest();
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('timer')) {
            let temp = (sessionStorage.getItem('timer')) / 60000;
            setTimer(temp);
        }else if (test.time !== undefined) {
            setTimer(test.time);
        }
    }, [test.time])

    useEffect(() => {
        let token = decode(sessionStorage.getItem('token'));
        if (test.author !== undefined && test.author === token.id) {
            setIsTeacher(true);
        }
    }, [test.author])

    useEffect(() => {
        if (test.time !== undefined && isTeacher === false) {
            console.log('prepare timout ====>');

            let timer = setTimeout(() => {
                sendSolved();
            }, [test.time * 60000]);
            timerRef.current = timer;
    
            return () => {
                clearTimeout(timer);
            }
        }
    }, [test.time, isTeacher])

    useEffect(() => {
        console.log("test >", test);
        testRef.current = test;
    }, [test.questions])

    useEffect(() => {
        console.log("window name", window.name);
    }, [window.name])

    return (
        <div>
            {isTeacher === true &&
                <button className="btn btn-success print-button" 
                    style={{position: 'fixed', right: '20px', bottom: '20px'}}
                    onClick={() => window.print()}
                    >Print
                </button>
            }

            {redirect === true && isTeacher === false &&
                <Redirect to='/user/studentdashboard' />
            }

            {redirect === true && isTeacher === true &&
                <Redirect to='/user/teacherdashboard' />
            }

            <div className="mb-4 timer-div">
                {timer !== undefined && isTeacher !== undefined &&
                    <Timer time={timer} delay={delay} sendSolved={sendSolved} isTeacher={isTeacher}/>
                }

                <button className="btn btn-danger" onClick={() => sendSolved(true)}>Save and exit</button>

                {isTeacher === true &&
                    <button className="btn btn-primary ml-2" onClick={() => stopTimer()}>Stop Timer</button>
                }
            </div>

            <div style={{marginTop: '50px', marginBottom: '40px'}}>
                {test.name !== undefined &&
                    <h1>{test.name}</h1>
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
