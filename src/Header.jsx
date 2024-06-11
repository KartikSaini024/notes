import UserGreet from './UserGreet.jsx';
import logo from './assets/notes.png';

function Header() {

    return (
        <>
            <div className='header'>
                <img src={logo} className='logo-style' alt="My Notes Logo" />
                <UserGreet isLoggedIn={true} username="Anonymous" />
            </div>
        </>
    )
}
export default Header;
