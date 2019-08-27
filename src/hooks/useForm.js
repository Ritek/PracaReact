import {useState, useEffect} from 'react'
import { callbackify } from 'util';

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        login: "",
        email: "",
        password: "",
        password2: "",
    });

    const [errors, setErrors] = useState({});

    const [isSubmiting, setIsSubmiting] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();
        setErrors(validate(values))
        setIsSubmiting(true);

        /* Axios.post('http://localhost:5000/api/user/register', values).then(res => {
            //console.log(res.data);
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        }); */
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmiting) {
            callback();
        }
    }, [errors])

    return {
        values,
        handleChange,
        handleSubmit,
        errors,
    }
}

export default useForm;
