import React, {useEffect} from 'react'

function QuestionTop(props) {

    useEffect(() => {
        console.log('Number changed, now:', props.exNum);
    }, [props.exNum]);

    return (
        <div className="card-header">
            <span>
                <div className="row">
                    <p className="col-sm-11 text-left font-weight-bold">
                        <input className="points-input" type="number" min="0" max="99" 
                        onChange={(e) => props.setPoints(e.target.value)} />p
                    </p>
                    <p className="col-sm-1 close-btn" onClick={() => props.handleDelete(props.exNum)}>&times;</p>
                </div>
                <h3 className="font-weight-bold text-left">Exercise nr. {props.exNum+1}</h3> 
            </span>
        </div>
    )
}

export default QuestionTop
