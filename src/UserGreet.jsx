import PropTypes from 'prop-types'

function UserGreet(props){

    const styles={
        display:"flex",
        // justifyContent:"end",
        alignItems:"center"
    }
    
    const avatar = `https://robohash.org/${props.username}`
    
    const icon={
        width:"50px",
        borderRadius:"50%"
    }

    return(
        <>
            <div>
                {props.isLoggedIn ? 
                    <h3 style={styles}>Logged in:&nbsp; <span style={{ color: "lime" }}>{props.username}</span> <img src={avatar} style={icon}></img></h3> :
                    <h3 style={styles}><span style={{ color: "red" }}>Not Logged In</span></h3>}                    
            </div>
        </>
    )
}

// UserGreet.defaultProps ={
//     isLoggedIn: false,
//     username: "Guest"
// }
export default UserGreet;