import React, {useState} from 'react'

function GroupTable(props) {
    useState(() => {
        console.log("props", props.value);
    }, []) 

    return (
        <div>
            <h3>Group name: {props.value.name}           Group password: {props.value.password}</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Student email</th>
                        <th scope="col">Student login</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>

                <tbody>
                    {props.value.members.map((value, index) => {
                        return <tr>
                            {
                                index === 0 ? <th scope="row" key={index}>{value}</th> :
                                <td key={index}>{value}</td>
                            }
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GroupTable
