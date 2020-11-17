
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Adventure from './components/Adventure';
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar';
import Userlandingpost from './components/Userlandingpost';
import theme from './theme'

function App() {
  return (
    
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar></Navbar >
      <Hero></Hero>
      <Adventure></Adventure>
      <Userlandingpost></Userlandingpost>
      <Footer></Footer>
      </ThemeProvider>
    
  );
}

export default App;
