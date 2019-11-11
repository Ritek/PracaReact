import React, {useState} from 'react'
import useInterval from '../../hooks/useInterval'

function Timer(props) {

    const [timer, setTimer] = useState(props.time * 60000);

    useInterval(() => {
        if (timer > 0) setTimer(timer - 1000)
    }, 1000)

    return (
        <div>
            Timer: {timer}
            {timer !== undefined &&
                <h2>Time remaining - {Math.trunc(timer / 60000)} min : {((timer % 60000)/1000)} sec</h2>
            }
        </div>
    )
}

export default Timer
