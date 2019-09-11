import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import GroupTable from './GroupTable';

function MenageGroup() {

    useEffect(() => {
        Axios.post().then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        })
    })

    return (
        <div>
            {}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default MenageGroup
