import React, { useState } from 'react';
import DraggablePrompt from './components/DraggablePrompt';
import LandingPage from './components/LandingPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'transparent',
      paper: '#1a1b1e',
    },
    primary: {
      main: '#9c27b0',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
  },
});

function App() {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleGetStarted = () => {
    setShowPrompt(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'relative',
      }}>
        <LandingPage onGetStarted={handleGetStarted} />
        {showPrompt && <DraggablePrompt />}
      </div>
    </ThemeProvider>
  );
}

export default App; 