import React, {useState, useEffect} from 'react'


import ShowSingleTest from './ShowSingleTest'

function ShowUserTests(props) {
    const initial = props.initial;

    const [filtered, setFiltered] = useState(initial);;

    useEffect(() => {
        console.log("search", props.search);
        console.log('initial:', initial);
        if (props.search === "") {
            console.log("EMPY!");
            setFiltered(initial);
        }
        else {
            let temp = [];
            for (let i=0;i<initial.length;i++) {
                var re = new RegExp(props.search, 'i');
                if (initial[i].name.toString().match(re) || initial[i].tags.toString().match(re)) {
                    temp.push(initial[i]);
                }
            }
            setFiltered(temp);
        }
    }, [props.search]);

    const searchTag = (value) => {
        console.log('value:', value.tag.toString());
        props.handleTags(value.tag);
    }

    return (
        <div>
            {
                filtered.map((test, index) => (
                    <ShowSingleTest key={index} searchTag={searchTag} test={test} deleteTest={props.deleteTest}/>
                )) 
            }
        </div>
    )
}

export default ShowUserTests
