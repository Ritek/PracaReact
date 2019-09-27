import React, {useState, useEffect, useContext} from 'react'

function CreateTest() {

    const [exercises, setExercises] = useState([]);

    const handleChange = (event) => {

    } 

    const addQuestion = () => {
        //console.log('Adding question');
        let obj = {
            type: "type",
        }
        setExercises([...exercises, obj]);
    }

    useEffect(() => {
        console.log(exercises);
    }, [exercises])

    return (
        <div>
            {
                exercises.map(ex => (
                    <p key={Math.random()}>{ex.type}</p>
                ))
            }
            <button className="btn btn-primary" onClick={() => addQuestion()}>Add question</button>
        </div>
    )
}

export default CreateTest
