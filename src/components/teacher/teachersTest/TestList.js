import React, {useState, useEffect} from 'react'

import Axios from 'axios'

import decode from 'jwt-decode'

import ShowTests from './ShowUserTests'

import Modal from 'react-bootstrap/Modal'

function TestList() {
    const {id} = decode(sessionStorage.getItem('token'));

    const [list, setList] = useState([]);
    const [search, setSearch] = useState({content: "", tagsContent: "", tags: []});

    const [selected, setSelected] = useState({id: "", array: "", index: ""});

    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true)

    useEffect(() => {
        Axios.post('/api/tests/gettests', {id: id}).then(res => {
            console.log(res.data);
            let data = res.data;
            setList({userTests: data.userTests, othersTests: data.othersTests});
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleSearch = (event) => {
        setSearch({...search, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        let temp = search.tagsContent.split(';');
        temp.pop();
        setSearch({...search, tags: temp});
    }, [search.tagsContent])

    useEffect(() => {
        console.log(search.tags);
    }, [search.tags])

    const handleTags = (value) => {
        console.log(search.tags);
        let temp = search.tagsContent;

        /* let tempTags = [...search.tags]
        tempTags.push(value); */

        if (search.tags.indexOf(value) === -1) temp += value + ";";
        setSearch({...search, tagsContent: temp});
    }

    const deleteTag = (value) => {
        let temp = search.tags;
        temp.splice(temp.indexOf(value), 1);

        let temp2 = "";
        for (let i=0;i<temp.length;i++) temp2 += temp[i] + ";"
        setSearch({...search, tagsContent: temp2, tags: temp});
    }

    const deleteTest = (id) => {
        console.log("id:", id);
        
        for (let i=0;i<list.userTests.length;i++) {
            if (list.userTests[i]._id === id) {
                setSelected({id: id, array: "users", index: i});
            }
        }
        for (let i=0;i<list.othersTests;i++) {
            if (list.userTests[i]._id === id) {
                setSelected({id: id, array: "others", index: i});
            }
        }
        
        handleModalShow();
    }

    const affirmedDelete = () => {
        console.log("selected:", selected);

        Axios.post('/api/tests/deletetest', {userId: id, testId: selected.id}).then(res => {
            console.log(res);

            if (selected.array === "users") {
                let temp = [...list.userTests];
                temp.splice(selected.index, 1);
                setList({...list, userTests: temp});
            }

            if (selected.array === "others") {
                let temp = [...list.othersTests];
                temp.splice(selected.index, 1);
                setList({...list, othersTests: temp});
            }

            handleModalClose();

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
                <h1>Enter name or click on tag to filter</h1>
                <div className="card-body">
                    <input type="text" className="form-control mb-1" onChange={(e) => handleSearch(e)} name="content"
                    value={search.content} placeholder="Type here to filter list by test name" />

                    <input type="text" className="form-control mb-1" onChange={(e) => handleSearch(e)} name="tagsContent" 
                    value={search.tagsContent} placeholder="Type here to filter list by tags eg: tag1;tag2;" />
                </div>
                <div>
                    {
                        search.tags.map((tag, index) => (
                            <div key={index} className="badge badge-primary mr-1 mb-2" onClick={() => deleteTag(tag)} style={{cursor: 'pointer'}}>
                                <h5>{tag}</h5>
                            </div>
                        ))
                    }
                </div>
            </div>

            <h3 className="text-left">Your tests</h3>
            {list.userTests !== undefined && list.userTests.length !== 0 ?
                <ShowTests initial={list.userTests} search={search} handleTags={handleTags} deleteTest={deleteTest} userId={id}/>
                :
                <div className="jumbotron">
                    <h2 className="display-4">You have no tests in collection</h2>
                </div> 
            }

            <h3 className="text-left">Other users tests</h3>
            {list.othersTests !== undefined && list.othersTests.length !== 0 ?
                <ShowTests initial={list.othersTests} search={search} handleTags={handleTags} deleteTest={deleteTest} userId={id}/>
                :
                <div className="jumbotron">
                    <h2 className="display-4">You haven't been granted acces to other users tests</h2>
                </div> 
            }
        </div>
    )
}

export default TestList
