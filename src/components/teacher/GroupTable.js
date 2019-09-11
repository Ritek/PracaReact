import React from 'react'

function GroupTable(props) {


    return (
        <div>
            <h3>Group name: {props.name}           Group password: {props.password}</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Student email</th>
                        <th scope="col">Student login</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>

                <tbody>
                        {props.members.map((value, index) => {
                            if (index === 0) return <th scope="row" key={index}>{value}</th>
                            else return <th key={index}>{value}</th>
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default GroupTable
