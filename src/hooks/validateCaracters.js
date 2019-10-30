function useCheckForbidden() {

    const filterForbidden = (state) => {
        const forbidden = ['*', '/', '\\', '{', '}', ';', "'", "\"", "<", ">", "$", 
                            ":", "?", "-", "+", "=", "(", ")"];

        let obj = {};

        for (let key in state) {
            if (state.hasOwnProperty(key)) {
                if (forbidden.some(function(v) { return state[key].indexOf(v) >= 0})) obj[key+"Error"] = true;
                else obj[key+"Error"] = false;
            }
        }
        
        return obj;
    }

    return {
        filterForbidden,
    }
}

export default useCheckForbidden