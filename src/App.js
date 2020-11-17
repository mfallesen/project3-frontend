
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';

import Footer from './components/Footer';

import Navbar from './components/Navbar';

import theme from './theme'

function App() {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar></Navbar >
      <Footer></Footer>
    </ThemeProvider>

  );
}

export default App;
