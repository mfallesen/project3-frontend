
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar';
import theme from './theme'

function App() {
  return (
    <div >
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar></Navbar>
      Hello World
      <Hero></Hero>
      <Footer></Footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
