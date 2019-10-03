import {useState, useEffect} from 'react'

const useQuestions = (object, exNum, handleChange) => {

    //console.log(">obj:", object);
    //console.log(">exNumm:", exNum);

    const [state, setState] = useState({
        id : object.id,
        type: object.type,
        points: object.points || "",
    });

    const handleQuestionChange = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`
        console.log(event.target.style.height);
        setState({...state, [event.target.name]: event.target.value});
    } 

    const setPoints = (newValue) => {
        setState({...state, points: newValue});
    }

    useEffect(() => {
        handleChange(exNum, state, object.type);
    }, [state]);


    return {
        handleQuestionChange,
        setPoints,
        state,
    }
}

export default useQuestions;
