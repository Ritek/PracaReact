import Axios from 'axios'

const check = async () => {
    let ans = false;
    await Axios.post('/api/user/checktoken').then(res => {
        console.log("res", res);
        ans = true;
    }).catch(error => {
        console.log(error);
    })

    console.log("ans", ans);
    return ans;
}

export default async function checkLoginStatus() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        return false;
    } else {
        return true;

/*         let ans = false;
        await Axios.post('/api/user/checktoken').then(res => {
            console.log("res", res);
            ans = true;
        }).catch(error => {
            console.log(error);
        })
    
        console.log("ans", ans);
        return ans; */
    }
}
