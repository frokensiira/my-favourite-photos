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
import SimpleReactLightbox from 'simple-react-lightbox';
import CustomerAlbum from './components/CustomerAlbum';
import CustomerConfirmation from './components/CustomerConfirmation';
import ShowPreviewCustomerAlbum from './components/ShowPreviewCustomerAlbum';
import EditAlbum from './components/EditAlbum';

const App = () => {
	return (
		<AuthContextProvider>
			<SimpleReactLightbox>
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

							<Route path="/edit-album/:albumId">
								<EditAlbum/>
							</Route>

						</AuthRoute>
						
						<Route path=":ownerId/review/:albumId">
							<CustomerAlbum/>
						</Route>

						<Route path=":ownerId/review/preview/:albumId">
							<ShowPreviewCustomerAlbum/>
						</Route>

						<Route path="/confirmation">
							<CustomerConfirmation/>
						</Route>

						<Route path="*" element={<NotFound/>}/>
					</Routes>

				</Container>
			</SimpleReactLightbox>
		</AuthContextProvider>
	)
}


export default App;
