import delIcon from './assets/bin.png';


function DeleteNote(props) {

    function delItem(e){
        e.stopPropagation();
        let sure = confirm("Are you sure to delete Note");
        if(sure){
            props.updateNotes({id:props.noteID, deleteNote:true})
            // e.target.closest('.note').remove();
            
        }
        else{
            return;
        }
    }

    function t(){
    }


    return (
        <>
            <img onClick={(e) => delItem(e)} src={delIcon} alt="delete" id='del-btn' />
        </>
    )
}
export default DeleteNote