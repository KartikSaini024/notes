function Footer(){
    const styles={
        textAlign:"Center",
        marginTop:"30px"
    }
    return(
        <footer>
            <p style={styles}> &copy; {new Date().getFullYear()} Kartik Saini - All Rights Reserved</p>
        </footer>
    )
}

export default Footer;