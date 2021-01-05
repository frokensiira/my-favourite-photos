import './assets/App.scss';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Home from './components/Home';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import AuthContextProvider from './contexts/AuthContext';
import Albums from './components/Albums';
import Album from './components/Album';
import CreateAlbum from './components/CreateAlbum';

const App = () => {
	return (
		<AuthContextProvider>
			<NavigationBar/>

			<Container className="py-3">

				<Routes>
					<AuthRoute path="/">
						<Home/>
					</AuthRoute>

					<Route path="/login">
						<Login/>
					</Route>

					<Route path="/logout">
						<Logout/>
					</Route>

					<Route path="/signup">
						<SignUp/>
					</Route>

					<AuthRoute path="/albums">
						<Route path="/">
							<Albums/>
						</Route>

						<Route path="/:albumId">
							<Album/>
						</Route>

						<Route path="/create-album">
							<CreateAlbum/>
						</Route>

					</AuthRoute>

					<Route path="*" element={<NotFound/>}/>
				</Routes>

			</Container>
		</AuthContextProvider>
	)
}


export default App;
