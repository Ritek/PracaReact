import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import useCheckForbidden from '../../hooks/validateCaracters'

function TestDetails(props) {

    const [details, setDetails] = useState({
        name: props.name || "", 
        tags: props.tags || "",
        access: props.access || "",
    });

    const [errors, setErrors] = useState({nameError: false, tagsError: false});
    const {checkString} = useCheckForbidden();

    const setName = (event) => {
        setDetails({...details, name: event.target.value});
    }

    const setTags = (event) => {
        if (checkString(event.target.value)) setErrors({...errors, tagsError: true});
        else (setErrors({...errors, tagsError: false}));

        let temp = event.target.value.split(',');
        let temp2 = [];
        for (let i=0;i<temp.length;i++) {
            temp2.push(temp[i].trim());
        }
        setDetails({...details, tags: temp2});
    }

    useEffect(() => {
        setErrors({...errors, nameError: checkString(details.name)});
    }, [details.name])

    useEffect(() => {
        console.log(errors);
    }, [errors])

    const setAccess = (event) => {
        setDetails({...details, access: event.target.value});
    }

    useEffect(() => {
        if (props.name !== details.name || props.tags !== details.tags || props.access !== details.access) {
            setDetails({name: props.name, tags: props.tags, access: props.access});
        }
    }, [props])

    useEffect(() => {
        props.changeDetails(details.name, details.tags, details.access);
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
                <div className="input-group">
                    <input type="text" id="name" name="name"
                        value={details.name} onChange={(e) => setName(e)} placeholder="Test name"
                        className={ errors.nameError ? 'form-control is-invalid' : 'form-control'}
                    /> 
                    <div className="invalid-feedback">
                        Only letters and numbers allowed!
                    </div>
                </div>

                <label htmlFor="tags">Tags:</label>
                <div className="input-group">
                    <input type="text" id="tags" name="tags"
                        value={details.tags} onChange={(e) => setTags(e)} placeholder="e.g. tag1,tag2"
                        className={ errors.tagsError ? 'form-control is-invalid' : 'form-control'}
                    /> 
                    <div className="invalid-feedback">
                        Only letters and numbers allowed!
                    </div>
                </div>


                <label htmlFor="access">Users who have access to this test:</label>
                <input type="text" className="form-control mb-4" id="access" name="access" placeholder="user email"
                    value = {details.access !== null ? details.access : ""} onChange={(e) => setAccess(e)}
                />

            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-primary mb-4" 
                    onClick={() =>(handleModalClose(), props.saveTest())}
                    disabled={errors.nameError || errors.tagsError || details.name.length === 0}
                    >Save
                </button>
            </Modal.Footer>
        </Modal>
    )
}
export default TestDetails
