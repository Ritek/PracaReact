import React, {useState, useEffect} from 'react'
import decode from 'jwt-decode'
import Axios from 'axios'

function AddTest(props) {
    const {id} = decode(sessionStorage.getItem('token'));
    const [tests, setTests] = useState([]);
    const [selected, setSelected] = useState([]);

    const addSelected = (id) => {
        let temp = [...selected];

        if (temp.indexOf(id) === -1) {
            temp.push(id);
        } else {
            if (temp.length === 1) temp = [];
            else {
                temp.splice(temp.indexOf(id), 1);
            }
        }
        setSelected(temp);
    }

    const addNewTest = () => {
        console.log("group id", props.group._id);
        Axios.post('/api/groups/addtests', {id: id, groupId: props.group._id, tests: selected}).then(res => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        let assignedTests = props.group.tests;

        Axios.post('/api/tests/gettests', {id: id}).then(res => {
            console.log("getTests", res.data);
            let tempData = res.data;
            let showTests = [];
            
            console.log('was', assignedTests);
            console.log('got', tempData);

            for (let i=0;i<tempData.length;i++) {
                if (assignedTests.indexOf(tempData[i].id) === -1) {
                    let obj = {
                        id: tempData[i].id,
                        name: tempData[i].name,
                        tags: tempData[i].tags,
                    }
                    showTests.push(obj);
                }
            }

            console.log("now", showTests);

            setTests(showTests);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className="card">
            <div className="card-header"><h3>Select test that you would like to add</h3></div>

            <div className="card-body">
                <div className="mb-4">
                    {tests.length !== 0 ? 
                        <>
                            <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" style={{width: '30%'}}>Test name</th>
                                    <th scope="col" style={{width: '60%'}}>Test tags</th>
                                    <th scope="col" style={{width: '10%'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tests.map((test, index) => (
                                        <tr key={index}>
                                            <td>{test.name}</td>
                                            <td>{test.tags.join()}</td>
                                            <td><input type="checkbox" onChange={() => addSelected(test.id)}/></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </table> 
                            <button className="btn btn-primary" onClick={() => addNewTest()}>Add tests</button>
                        </>
                        :
                        <div className="jumbotron">
                            <h3>Group has assigned all the test you have created</h3>
                        </div>
                    }
                    
                </div>

            </div>
        </div>
    )
}

export default AddTest
