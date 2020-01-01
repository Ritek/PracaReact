import React, {useState} from 'react'
import useInterval from '../../../hooks/useInterval'
import decode from 'jwt-decode'

function Timer(props) {

    const [timer, setTimer] = useState(props.time * 60000);

    useInterval(() => {
        if (timer > 0) {
            let temp = timer - props.delay;
            setTimer(temp);
            sessionStorage.setItem('timer', temp);

            if (!props.isTeacher) {
                let token = decode(sessionStorage.getItem('testToken'));
                console.log('exp: ', token.exp);
                if (token.exp < Date.now() / 1000) {
                    console.log('times up!');
                    props.sendSolved();
                }
            }
        }
    }, 1000)

    return (
        <div>
            {timer !== undefined &&
                <h2>Time remaining - {Math.trunc(timer / 60000)} min : {((timer % 60000)/1000)} sec</h2>
            }
        </div>
    )
}

export default Timer
