import React, {useState, useEffect} from 'react'

function MyInput() {
    const [values, setValues] = useState({name: "", msg: "", touched: false});

    useEffect(() => {
        if ( values.name !== undefined && values.name.length < 3 && values.touched === true ) {
            setValues({...values, msg: "To short!"});
            console.log(values.touched);
        }

    }, [values.name]);

    const handleChange = (e) => {
        setValues({name: e.target.value, touched: true});   
    }

    return (
        <div>
            <input type="text" value={values.name} onChange={e => handleChange(e)}></input>
            <p>{values.msg}</p>
        </div>
    )
}

export default MyInput
