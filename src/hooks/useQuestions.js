import {useState} from 'react'

const useQuestions = (object) => {

    //console.log(">obj:", object);
    //console.log(">exNumm:", exNum);

    const [state, setState] = useState({
        type: object.type,
        points: object.points || "",
    });

    const handleQuestionChange = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    } 

    /* useEffect(() => {
        console.log(state);
    }, [state]); */


    return {
        handleQuestionChange,
        state,
    }
}

export default useQuestions;
