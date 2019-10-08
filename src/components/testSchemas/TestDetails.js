import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

function TestDetails(props) {

    const [details, setDetails] = useState({
        name: props.name || "", 
        tags: props.tags || "",
    });

    const setName = (event) => {
        setDetails({...details, name: event.target.value});
    }

    const setTags = (event) => {
        let temp = event.target.value.split(',');
        let temp2 = [];
        for (let i=0;i<temp.length;i++) {
            temp2.push(temp[i].trim());
        }
        setDetails({...details, tags: temp2});
    }

    useEffect(() => {
        if (props.name !== details.name || props.tags !== details.tags) {
            setDetails({name: props.name, tags: props.tags});
        }
    }, [props])

    useEffect(() => {
        props.changeDetails(details.name, details.tags);
    }, [details])

    const handleModalClose = () => {
        props.setShowSave(false);
    }

    return (
        <Modal show={props.showSave} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control mb-2" id="name" name="name" 
                    value={details.name} onChange={(e) => setName(e)}
                />


                <label htmlFor="tags">Tags:</label>
                <input type="text" className="form-control mb-4" id="tags" name="tags" 
                    value={details.tags} onChange={(e) => setTags(e)}
                />

            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-primary mb-4" onClick={() =>(handleModalClose(), props.saveTest())}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}
export default TestDetails
