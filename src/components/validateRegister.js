export default function validateLogin(values) {
    let errors = {};
    const forbidden = ['*', '/', '\\', '{', '}', ';', "'", "\"", "<", ">", "$", 
                            ":", "?", "-", "+", "=", "(", ")", "%"];

    const checkChars = (str) => {
        if (forbidden.some(function(v) { return values.login.indexOf(v) >= 0})) return true;
        else return false;
    }

    if (values.loginTouched) {
        if (checkChars(values.login)) errors.login = "Only letters and numbers allowed!";
    }

    if (values.emailTouched) {
        if (!values.email) {
            errors.email = "Email address can not be empty!"
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid!"
        } 
    }

    if (values.nameTouched) {
        if (!values.name) {
            errors.name = "Name can not be empty!"
        } else if (values.name.length < 2) {
            errors.name = "Name can not be shorter then three letters!"
        } 
    }

    if (values.surnameTouched) {
        if (!values.surname) {
            errors.surname = "Surname can not be empty!"
        } else if (values.surname.length < 2) {
            errors.surname = "Surname can not be shorter then three letters!"
        } 
    }

    if (values.passwordTouched) {
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 10 caracters long!"
        }
    }

    if (values.password2 !== values.password) {
        errors.password2 = "Repeated password has to be the same as above!";
    } 

    return errors;
}