import React from 'react';
import DraggablePrompt from './components/DraggablePrompt';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: 'transparent'
      }}>
        <DraggablePrompt />
      </div>
    </ThemeProvider>
  );
}

export default App; 