import React, {useState, useEffect} from 'react'
import Toast from 'react-bootstrap/Toast'
import {Link} from 'react-router-dom'

import Open from '../../testSchemas/open'
import TrueFalse from '../../testSchemas/TrueFalse'
import Choices from '../../testSchemas/Choices'
import Blanks from '../../testSchemas/Blanks'

import TestDetails from '../../testSchemas/TestDetails'
import ModalTest from '../../testSchemas/ModalTest'

import Axios from 'axios'
import decode from 'jwt-decode'

//import update from 'immutability-helper';

function CreateTest({match}) {
    // State
    const [test, setTest] = useState({
        name: "", 
        tags: "",
        access: [],
        questions: []
    });

    // Modal
    const [showSave, setShowSave] = useState(false);
    const handleShowSave = () => setShowSave(true);

    const [showModal, setShowModal] = useState(false);
    const handleModalShow = () => setShowModal(true);

    const [showToast, setShowToast] = useState({show: false, msg: ""});

    const handleChange = (index, object) => {
        let arr = [...test.questions];
        arr[index] = object;
        setTest({...test, questions: arr});
    }

    const handleDelete = (index) => {
        let arr = [...test.questions];
        if (arr.length === 1) arr = [];
        else arr.splice(index, 1);
        setTest({...test, questions: arr});

        //console.log('handle delete');
    }

    const handleReorder = (direction, oldPos) => {
        let newPos;
        if (direction === "up") newPos = oldPos-1;
        else newPos = oldPos+1; 

        if (newPos === -1) newPos = 0;
        if (newPos === test.questions.length) newPos = test.questions.length-1;

        let copyArr = [...test.questions];

        [copyArr[oldPos], copyArr[newPos]] = [copyArr[newPos], copyArr[oldPos]];
        setTest({...test, questions: copyArr});

        //console.log('handle reorder');
    }

    const changeDetails = (name, tags, access) => {
        setTest({...test, name: name, tags: tags, access: access});
    }

    const clearTest = () => {
        setTest({name: "", tags: "",access: [], questions: []});
    }

    const saveTest = () => {
        //console.log('Saving test');
        const {id} = decode(sessionStorage.getItem('token'));
        let url = "";
        let msg = "Test successfuly saved!";

        let fd = new FormData;
        fd.append('test', JSON.stringify(test));
        
        if (match.params.id === undefined && test.author === undefined) {
            //console.log('New Test');
            url = '/api/tests/createtest';
        }
        else if (test.author !== id) {
            //console.log('New Test');
            url = '/api/tests/createtest';
        }
        else {
            //console.log('Update Test');
            url = '/api/tests/edittest';
            msg = "Test successfuly updated!";
        }
        
        Axios.post(url, fd).then(res => {
            //console.log('server response:', res);
            setTest({...test, author: id});
            setShowToast({show: true, msg: msg});
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log("new state", test);
        //let temp = test;
        let temp = JSON.parse(JSON.stringify(test));
        for (let i=0;i<temp.questions.length;i++) {
            if (temp.questions[i].image64 !== undefined) {
                delete temp.questions[i].image64;
                delete temp.questions[i].picture;
                delete temp.questions[i].pictureSize;
            }
        }
    }, [test])

    const getTest = () => {
        const {id} = decode(sessionStorage.getItem('token'));
        if ( match.params.id !== undefined ) {
            //console.log('id', match.params.id);
            Axios.post('/api/tests/gettest', {testId: match.params.id, userId: id}).then(res => {
                console.log("data", res.data);
                setTest(res.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        getTest();
    }, [])

    return (
        <div>
            <ModalTest test={test} setTest={setTest} showModal={showModal} handleModalShow={handleModalShow} setShowModal={setShowModal}/>
            <TestDetails showSave={showSave} setShowSave={setShowSave} 
                handleShowSave={handleShowSave} name={test.name} tags={test.tags} access={test.access} saveTest={saveTest} changeDetails={changeDetails}
            />

            <Toast onClose={() => setShowToast({show: false})} show={showToast.show} delay={5000} 
                style={showToast.show ? {position: 'fixed', bottom: '20px', left: '30px', zIndex: '1'} 
                                    : {position: 'fixed', bottom: '20px', left: '30px', zIndex: '-1'}}
                autohide>

                <Toast.Header><strong className="mr-auto">Test saved</strong></Toast.Header>
                <Toast.Body>
                    <h5>{showToast.msg}</h5>
                    See all yout tests: <Link className="btn btn-primary ml-4" style={{margin: 'auto'}} to='/user/testlist'>Tests</Link>
                </Toast.Body>
            </Toast>

            <div className="card mb-4">
                <button className="btn btn-primary" onClick={() => setShowSave(true)}>Save</button>
            </div>

            <div className="text-right mb-5">
                {test.questions.length > 0 && 
                    <button className="btn btn-danger" style={{width: '100px'}}
                        onClick={() => clearTest()}
                    >Clear test</button>
                }
            </div>


            <div id="questionList">
            {test.questions !== undefined &&
                test.questions.map((ex, idx) => {
                    if (ex.type === "open") return (
                        <Open key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                    else if (ex.type === "truefalse") return (
                        <TrueFalse key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                    else if (ex.type === "choices") return (
                        <Choices key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                    else if (ex.type === "blanks") return (
                        <Blanks key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                })
            }
            </div>
            <button className="btn btn-primary" onClick={handleModalShow}>Add question</button>
        </div>
    )
}

export default CreateTest
