import {useState, useEffect} from 'react'

const useQuestions = (object, exNum, handleChange) => {

    const [state, setState] = useState(object);

    const handleTextChange = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`
        setState({...state, [event.target.name]: event.target.value});
    } 

    const handleRegularChange = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`

        let temp = event.target.value.split('\n');

        setState({...state, [event.target.name]: event.target.value, regArray: temp});
    }

    const addTrueFalse = () => {
        if (state.subquestions === undefined) {
            let temp = [];
            temp.push(["", "true"]);
            setState({...state, subquestions: temp});
        } else {
            let temp = state.subquestions;
            temp.push(["", "true"]);
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
        console.log('addChoice')
        let temp;
        if (state.choices === undefined) temp = [];
        else temp = state.choices;
        temp.push("");
        if (state.answer === undefined) setState({...state, choices: temp, answer: ""});
        else setState({...state, choices: temp});
    }

    const setChoiceText = (event, index, letter) => {
        let temp = state.choices;
        temp[index] = event.target.value;
        if (state.answer[0] === letter) setState({...state, choices: temp, answer: [letter, event.target.value]});
        else setState({...state, choices: temp});
    }

    const setChoicesAnswer = (index, letter, value) => {
        console.log(index, letter);
        //let temp = state.subquestions[index];
        setState({...state, answer: [letter, value]});
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
        let sentencesArr = tempText.split("\n");

        //let tempArray = tempText.match(/\[(.*?)\]/g);
        let tempArray = tempText.match(/(?<=\[)(.*?)(?=\])/g);

        //setState({...state, sentences: sentences, blanks: tempArray});
        setState({...state, sentences: event.target.value, blanks: tempArray, sentencesArr: sentencesArr});
    }

    const blanksLines = () => {
        if (typeof(state.sentences) === 'string') {
            let arr = state.sentences.split('\n');
            console.log('arr.lengh =', arr.length);
            return arr.length;
        }
    }

    // for pictures

    const setPicture = (picture) => {
        if (picture.image !== undefined) setState({...state, picture: picture.image, pictureSize: picture.size});
        else {
            let temp = state;
            delete temp.picture;
            delete temp.size;
            setState(temp);
        }
    }

    // ================================

    const setPoints = (newValue) => {
        setState({...state, points: parseInt(newValue)});
    }

    useEffect(() => {
        handleChange(exNum, state, object.type);
    }, [state]);

    return {
        handleTextChange,
        handleRegularChange,

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

        setPicture,
        setPoints,
        state,
    }
}

export default useQuestions;
