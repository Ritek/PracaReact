import React from 'react'

function ShowSolved(props) {
    return (
        <div>
            {
                props.solvedTests.map((test, index) => (
                    <div key={index} className="card">
                        <div className="card-header" style={{fontSize: '20px'}}>
                            <h4>Group - {test.groupName}</h4>
                        </div>

                        <div className="card-body" style={{lineHeight: '2'}}>
                            Test name - {test.name} <br/>
                            Solved by - {test.solvedBy} <br/>
                            Student got {test.allGotPoints} out of {test.allPossiblePoints} points<br/>
                            Time - {test.time} m<br/>
                        </div>

                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={() => props.makeRedirect(test._id)}>Preview</button>
                        </div> 
                    </div>
                ))
            }
        </div>
    )
}

export default ShowSolved
