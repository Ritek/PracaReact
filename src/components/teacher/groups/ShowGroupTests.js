import React, {useState, useEffect} from 'react'

function ShowGroupTests(props) {
    const [tests, setTests] = useState(props.userTests);
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

    const filterTestsAdd = () => {
        const allUserTests = tests;
        const testsInGroup = props.group.tests;
        let filtered = [];

        for (let i=0;i<allUserTests.length;i++) {
            if (testsInGroup.indexOf(allUserTests[i].id) === -1) filtered.push(allUserTests[i]);
        }

        setTests(filtered);
    }

    const filterTestsDelete = () => {
        const allUserTests = tests;
        const testsInGroup = props.group.tests;

        let filtered = [];

        for (let i=0;i<allUserTests.length;i++) {
            if (testsInGroup.indexOf(allUserTests[i].id) !== -1) filtered.push(allUserTests[i]);
        }

        setTests(filtered);
    }

    useEffect(() => {  
        if (props.do === "add") filterTestsAdd();
        else filterTestsDelete();
    }, []);

    return (
        <div className="card mb-5">
            <div className="card-header">
                {props.fun === "add" ?  
                    <h3>Select test that you would like to add</h3>
                    :
                    <h3>Select test that you would like to delete</h3>
                }
            </div>

            <div className="card-body">
                <div className="mb-4">
                    {tests.length !== 0 && tests !== undefined ? 
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
                            {props.fun === "add" ?  
                                <button className="btn btn-primary" onClick={() => props.addNewTest(selected)}>Add tests</button>
                                :
                                <button className="btn btn-danger" onClick={() => props.deleteTest(selected)}>Delete tests</button>
                            }
                        </>
                        :
                        <div className="jumbotron">
                            {props.fun === "add" ?
                                <h3>Group has assigned all the test you have created</h3>
                                :
                                <h3>Group has no tests to delete</h3>
                            }      
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowGroupTests
