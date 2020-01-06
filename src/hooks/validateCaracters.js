function useCheckForbidden() {
    const forbidden = ['*', '/', '\\', '{', '}', ';', "'", "\"", "<", ">", "$", 
                        ":", "?", "-", "+", "=", "(", ")"];

    const filterForbidden = (state) => {

        let obj = {};

        for (let key in state) {
            if (state.hasOwnProperty(key)) {
                if (forbidden.some(function(v) { return state[key].indexOf(v) >= 0})) obj[key+"Error"] = true;
                else obj[key+"Error"] = false;
            }
        }
        
        return obj;
    }

    const checkString = (state) => {
        if (forbidden.some(function(v) { return state.indexOf(v) >= 0})) return true;
        else return false;
    }

    return {
        filterForbidden,
        checkString,
    }
}

export default useCheckForbidden