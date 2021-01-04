import './assets/App.scss';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';
import AuthContextProvider from './contexts/AuthContext';

const App = () => {
	return (
		<AuthContextProvider>
			<NavigationBar/>

			<Container className="py-3">

				<Routes>
					<Route path="/">
						<Home/>
					</Route>

					<Route path="/signup">
						<SignUp/>
					</Route>

					<Route path="*" element={<NotFound/>}/>
				</Routes>

			</Container>
		</AuthContextProvider>
	)
}


export default App;
