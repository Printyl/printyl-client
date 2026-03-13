import './App.css'
import Home from './Home';
import Settings from './Settings';

export default function App() {
  const configured = localStorage.getItem('configurationState') === 'configured';
  if (configured) {
    return Home();
  } else {
    return Settings();
  }
}
