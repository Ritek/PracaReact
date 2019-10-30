import React, {useState, useEffect} from 'react'
import ShowSingleTest from './ShowSingleTest'

function ShowUserTests(props) {
    const initial = props.initial;

    const [filtered, setFiltered] = useState(initial);

    const checkTags = (initial) => {
        if (props.search.tags.length === 0) return true;

        if (props.search.tags.every(tag => initial.tags.indexOf(tag) !== -1)) return true;
    }

    const checkName = (name, regex) => {
        if (name.includes(regex)) return true;
        else return false;
    }

    useEffect(() => {
        let re = props.search.content;
        console.log(re);

        if (props.search.content === "" && props.search.tags.length === 0) {
            setFiltered(initial)
        }
        else {
            let temp = initial;

            if (props.search.content !== "") {
                let temp2 = [];
                for (let i=0;i<temp.length;i++) if (checkName(temp[i].name, re)) temp2.push(temp[i]);
                temp = temp2;
            }

            if (props.search.tags.length !== 0) {
                let temp2 = [];
                for (let i=0;i<temp.length;i++) if (checkTags(initial[i])) temp2.push(temp[i]);
                temp = temp2;
            }

            setFiltered(temp);
        }

    }, [props.search]);

    const searchTag = (value) => {
        props.handleTags(value.tag);
    }

    return (
        <div>
            {filtered.length !== 0 ?
                filtered.map((test, index) => (
                    <ShowSingleTest key={index} searchTag={searchTag} test={test} deleteTest={props.deleteTest}/>
                )) 
                :
                <div className="jumbotron">
                    <h3>No test match the searched keyword</h3>
                </div>
            }
        </div>
    )
}

export default ShowUserTests