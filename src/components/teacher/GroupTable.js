import React, {useState} from 'react'

function GroupTable(props) {
    useState(() => {
        console.log("props", props.value);
    }, []) 

    return (
        <div>
            <button onClick={() => props.buttonFunction("cos")}>usun</button>
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
                        return <tr key={index}>
                            <td>{value[2]}</td>
                            <td>{value[1]}</td>
                            <td> <button onClick={() => props.buttonFunction(value[0])}>Delete</button> </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GroupTable
