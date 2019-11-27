import React, {useState, useEffect} from 'react'
import Axios from 'axios'

function GradeTest({ match }) {

    const [test, setTest] = useState(undefined);

    useEffect(() => {
        Axios.post('/api/tests/getsolved', {testId: match.params.id}).then(res => {
            console.log("responce", res.data);
            setTest(res.data.test);
        }).catch(error => {
            console.log(error);
        });
    }, [])

    return (
        <div>
            {match.params.id}
        </div>
    )
}

export default GradeTest
