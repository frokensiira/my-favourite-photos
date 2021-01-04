import './assets/App.scss';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import logo from './assets/logo.svg'

const App = () => {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
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

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link href="/albums">Mina album</Nav.Link>
							<NavDropdown title="Användare" id="basic-nav-dropdown">
								<NavDropdown.Item href="/my-profile">Min profil</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="/logout">Logga ut</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Container>
				Startsida
			</Container>
		</>
	)
}


export default App;
