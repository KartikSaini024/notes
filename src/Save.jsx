import saveIcon from './assets/save.png';


function Save(props) {

    function saveNotes() {
        console.log("pressed")
        props.download();
    }

    const btnStyle = {
        display: "flex",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <>
            <button id='saveBtn' className='btn-hover' style={btnStyle}onClick={saveNotes}>Save<img  src={saveIcon} alt="Save" id='save-btn' /></button>

        </>
    )
}
export default Save