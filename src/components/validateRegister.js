export default function validateLogin(values) {
    let errors = {};

    if (!values.email) {
        errors.email = "Email address can not be empty!"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid!"
    } 

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 10 caracters long!"
    }

    return errors;
}