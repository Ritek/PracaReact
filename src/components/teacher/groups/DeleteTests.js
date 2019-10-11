import React from 'react'

function DeleteTests(props) {
    return (
        <div className="card">
            <div className="card-header">Delete tests from group</div>

            <div className="card-body">
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
                            props.tests.map((test, index) => (
                                <tr>
                                    <th>{test.name}</th>
                                    <th>{test.tags.join()}</th>
                                    {/* <td><input type="checkbox" onChange={() => deleteSelected(test.id)}/></td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DeleteTests
