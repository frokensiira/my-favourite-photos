import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { useAuth } from '../contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';

const NavigationBar = () => {
    const { currentUser } = useAuth();
    return ( 
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to="/">
                        <Navbar.Brand href="/">
                            <img
                                alt="A photoalbum"
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            My Favourite Photos
                        </Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            
                            {
                                currentUser
                                    ? (
                                        <>
                                            <NavLink to="/albums" className="nav-link">Mina album</NavLink>
                                            <NavDropdown title="Användare" id="basic-nav-dropdown">
                                                <NavLink to="/my-profile" className="dropdown-item">Min profil</NavLink>
                                                <NavDropdown.Divider />
                                                <NavLink to="/logout" className="dropdown-item">Logga ut</NavLink>
                                            </NavDropdown>
                                        </>
                                    )
                                    : ''
                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header> 
    );
}
 
export default NavigationBar;