import {useState, useEffect} from 'react'

const useQuestions = (object, exNum, handleChange) => {

    const [state, setState] = useState(object);

    const handleTextChange = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`
        setState({...state, [event.target.name]: event.target.value});
    } 

    const addTrueFalse = () => {
        if (state.subquestions === undefined) {
            let temp = [];
            temp.push(["", "True"]);
            setState({...state, subquestions: temp});
        } else {
            let temp = state.subquestions;
            temp.push(["", "True"]);
            setState({...state, subquestions: temp});
        }
    }

    const changeTrueFalseText = (event, index) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`

        let temp = state.subquestions;
        temp[index][0] = event.target.value;
        setState({...state, subquestions: temp});
    }

    const changeTrueFalseLogic = (event, index) => {
        let temp = state.subquestions;
        temp[index][1] = event.target.value;
        setState({...state, subquestions: temp});
    }

    const delSubquestion = (index) => {
        if (index === 0) setState({...state, subquestions: []});
        else 
        {
            let temp = state.subquestions;
            temp.splice(index, 1);
            setState({...state, subquestions: temp});
        }
    }

    const addChoice = () => {
        let temp;
        if (state.choices === undefined) temp = [];
        else temp = state.choices;
        temp.push("");
        setState({...state, choices: temp});
    }

    const setChoiceText = (event, index) => {
        let temp = state.choices;
        temp[index] = event.target.value;
        setState({...state, choices: temp});
    }

    const setChoicesAnswer = (index, letter) => {
        setState({...state, answer: [letter, state.choices[index]]});
    }

    const delChoice = (index) => {
        let temp = state.choices;
        if (temp.length === 0) temp = [];
        else temp.splice(index, 1);
        setState({...state, choices: temp});
    }

    const makeBlanks = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`

        let tempText = event.target.value;
        //const sentences = tempText.split("\n");

        //let tempArray = tempText.match(/\[(.*?)\]/g);
        let tempArray = tempText.match(/(?<=\[)(.*?)(?=\])/g);

        //setState({...state, sentences: sentences, blanks: tempArray});
        setState({...state, sentences: event.target.value, blanks: tempArray});
    }

    const blanksLines = () => {
        if (typeof(state.sentences) === String) {
            let arr = state.sentences.split('\n');
            return arr.length;
        } else return 1
    }

    const setPoints = (newValue) => {
        setState({...state, points: newValue});
    }

    useEffect(() => {
        handleChange(exNum, state, object.type);
    }, [state]);

    return {
        handleTextChange,

        changeTrueFalseText,
        changeTrueFalseLogic,
        delSubquestion,
        addTrueFalse,

        addChoice,
        setChoiceText,
        setChoicesAnswer,
        delChoice,

        makeBlanks,
        blanksLines,

        setPoints,
        state,
    }
}

export default useQuestions;
