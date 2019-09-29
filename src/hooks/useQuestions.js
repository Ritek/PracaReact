import {useState, useEffect} from 'react'

const useQuestions = (object, exNum, handleChange) => {

    //console.log(">obj:", object);
    //console.log(">exNumm:", exNum);

    const [state, setState] = useState({
        type: object.type,
        points: object.points || "",
    });

    const handleQuestionChange = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    } 

    useEffect(() => {
        handleChange(exNum, state, object.type);
    }, [state]);


    return {
        handleQuestionChange,
        state,
    }
}

export default useQuestions;
