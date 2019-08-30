import {useState, useEffect} from 'react'

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        login: "",

        email: "",
        emailTouched: false,

        password: "",
        passwordTouched: false,

        password2: "",
        password2Touched: false,
    });

    const [errors, setErrors] = useState({});

    const [isSubmiting, setIsSubmiting] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value, [name+'Touched']: true});
    }

    const handleSubmit = (event) => {
        console.log("colled1");
        event.preventDefault();
        if (values.emailTouched === false || values.passwordTouched === false) {
            setValues({...values, emailTouched: true, passwordTouched: true, password2Touched: true});
        }
        
        
        if (values.email !== "" && values.password !== "") {
            setErrors(validate(values));
            setIsSubmiting(true);
        }
    }

    useEffect(() => {
        setErrors(validate(values));
    }, [values]);

    useEffect(() => {
        console.log("colled2");
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
