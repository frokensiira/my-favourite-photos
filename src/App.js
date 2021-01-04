import './assets/App.scss';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';

const App = () => {
	return (
		<>
			<NavigationBar/>

			<Container>
				Startsida
			</Container>
		</>
	)
}


export default App;
