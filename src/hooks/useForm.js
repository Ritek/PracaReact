import {useState, useEffect} from 'react'

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        login: "",

        name: "",
        nameTouched: false,

        surname: "",
        surnameTouched: false,

        email: "",
        emailTouched: false,

        password: "",
        passwordTouched: false,

        password2: "",
        password2Touched: false,
    });

    const [errors, setErrors] = useState({});

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [serverError, setServerError] = useState({msg : '', status: ''});

    const handleServerError = (reason) => {
        if (reason === 'Success') setServerError({msg : "Registration succesfull!", status: "success"});
        else if (reason === 'Duplicate') setServerError({msg : 'Accaunt with provided email already exists!', status: "error"});
    }

    const blockSubmit = () => {
        setIsSubmiting(false);
    }

    const clearForm = () => {
        setValues({...values, 
            login: "", loginTouched: false,  
            email: "", emailTouched: false, 
            password: "", passwordTouched: false, 
            password2: ""
        });
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value, [name+'Touched']: true});
        setIsSubmiting(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.emailTouched === false || values.passwordTouched === false) {
            setValues({...values, nameTouched: true, surnameTouched: true, emailTouched: true, passwordTouched: true, password2Touched: true});
        }
        
        
        if (values.email !== "" || values.password !== "" || values.name !== "" || values.surname !== "") {
            setErrors(validate(values));
            setIsSubmiting(true);
        }
    }

    useEffect(() => {
        setErrors(validate(values));
    }, [values]);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmiting) {
            callback();
        }
    }, [errors]);

    return {
        values,
        handleChange,
        handleSubmit,
        errors,

        handleServerError,
        serverError,
        clearForm,
        blockSubmit,
    }
}

export default useForm;
