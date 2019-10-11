import React, {useState, useEffect} from 'react'

import Axios from 'axios'

import decode from 'jwt-decode'

import ShowTests from './ShowUserTests'

import Modal from 'react-bootstrap/Modal'

function TestList() {
    const {id} = decode(sessionStorage.getItem('token'));

    const [list, setList] = useState([]);
    const [search, setSearch] = useState({content: ""});

    const [selected, setSelected] = useState({id: "", index: ""});

    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true)

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

    const deleteTest = (id, index) => {
        setSelected({id: id, index: index});
        handleModalShow();
    }

    const affirmedDelete = () => {
        console.log(selected.id);

        Axios.post('/api/tests/deletetest', {userId: id, testId: selected.id}).then(res => {
            console.log(res);
            
            let temp = [...list];
            if (temp.length === 0) temp = [];
            else temp.splice(selected.index, 1);
            console.log(temp);
            setList(temp);

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3>By clicking YES the test will be permanently deleted and become imossible to recover.</h3>          
                </Modal.Body>

                <Modal.Footer>
                    <div>
                        <button className="btn btn-success m-1" onClick={() => handleModalClose()}>NO</button>
                        <button className="btn btn-danger m-1" onClick={() => affirmedDelete()}>YES</button>  
                    </div>
                </Modal.Footer>
            </Modal>

            <div className="card mb-4">
                <h1>Your tests</h1>
                <div className="card-body">
                    <input type="text" className="form-control mb-1" onChange={(e) => handleSearch(e)} 
                    value={search.content} placeholder="Type here to filter list by test name or it's tags" />
                </div>
            </div>

            {list.length !== 0 &&
                <ShowTests initial={list} search={search.content} handleTags={handleTags} deleteTest={deleteTest}/>
            }

            {list.length === 0 &&
                <div className="jumbotron">
                    <h2 className="display-4">Look like you have not created a test yet</h2>
                </div>   
            }
        </div>
    )
}

export default TestList
