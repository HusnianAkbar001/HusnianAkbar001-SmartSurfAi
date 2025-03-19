import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { 
  Paper, 
  TextField, 
  Button, 
  Box,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Remove as MinimizeIcon,
  OpenInFull as ExpandIcon,
  CloseFullscreen as CompressIcon
} from '@mui/icons-material';
import axios from 'axios';

const DraggablePrompt: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: 20 });
  const [executionSteps, setExecutionSteps] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setExecutionSteps([]);
    
    try {
      console.log('Sending request to backend:', prompt);
      const response = await axios.post('http://localhost:8000/execute', {
        command: prompt,
        driver: {
          name: 'Firefox',
          keep_alive: true,
          maximize_window: true,
          headless: false
        },
        interaction: {
          interactive: false
        },
        google_api_key: 'AIzaSyDQGAQ8IvVPkBXuZqym2s_IGWOOLfhBHiQ'
      });
      
      // Process the response to extract steps
      if (response.data.responses) {
        const steps = response.data.responses.flatMap((resp: any) => {
          const textSteps = resp.parts
            .filter((part: any) => part.text)
            .map((part: any) => part.text);
          
          const functionSteps = resp.parts
            .filter((part: any) => part.function_call)
            .map((part: any) => {
              const func = part.function_call;
              switch (func.name) {
                case 'get':
                  return `Navigating to ${func.args.url}...`;
                case 'write':
                  return `Entering text: "${func.args.text}"`;
                case 'click':
                  return 'Clicking on element...';
                case 'submit':
                  return 'Submitting form...';
                default:
                  return `Executing ${func.name}...`;
              }
            });
          
          return [...textSteps, ...functionSteps];
        });
        
        setExecutionSteps(steps.filter(Boolean));
      }
      
      console.log('Backend response:', response.data);
      setSuccess(true);
    } catch (error: any) {
      console.error('Detailed error:', error);
      const errorMessage = error.response?.data?.detail;
      if (typeof errorMessage === 'object' && errorMessage !== null) {
        setError(errorMessage.msg || JSON.stringify(errorMessage));
      } else {
        setError(errorMessage || error.message || 'Failed to connect to backend');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <Draggable 
        handle=".drag-handle"
        position={isMaximized ? { x: 0, y: 0 } : undefined}
        onStop={(e, data) => !isMaximized && setPosition({ x: data.x, y: data.y })}
        disabled={isMaximized}
      >
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            width: isMaximized ? '100%' : '300px',
            height: isMaximized ? '100vh' : 'auto',
            borderRadius: isMaximized ? '0px' : '10px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease-in-out',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            className="drag-handle"
            sx={{
              padding: '10px',
              cursor: isMaximized ? 'default' : 'move',
              background: 'rgba(243, 238, 255, 0.95)',
              borderBottom: '1px solid rgba(149, 117, 205, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                flex: 1,
                color: '#7E57C2',
                fontWeight: 500
              }}
            >
              SmartSurf Command {loading ? '(Executing...)' : ''}
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <IconButton
                size="small"
                onClick={handleMinimize}
                sx={{ 
                  color: '#9575CD',
                  padding: '4px',
                  '&:hover': {
                    color: '#7E57C2',
                    background: 'rgba(126, 87, 194, 0.08)'
                  }
                }}
              >
                <MinimizeIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleMaximize}
                sx={{ 
                  color: '#9575CD',
                  padding: '4px',
                  '&:hover': {
                    color: '#7E57C2',
                    background: 'rgba(126, 87, 194, 0.08)'
                  }
                }}
              >
                {isMaximized ? <CompressIcon fontSize="small" /> : <ExpandIcon fontSize="small" />}
              </IconButton>
              <IconButton
                size="small"
                onClick={handleClose}
                sx={{ 
                  color: '#9575CD',
                  padding: '4px',
                  '&:hover': {
                    color: '#d32f2f',
                    background: 'rgba(211, 47, 47, 0.08)'
                  }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          <Collapse in={!isMinimized}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                height: isMaximized ? 'calc(100vh - 52px)' : 'auto',
                background: 'white',
              }}
            >
              <TextField
                fullWidth
                multiline
                rows={isMaximized ? 12 : 3}
                variant="outlined"
                placeholder="Enter your command here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
                sx={{
                  flex: isMaximized ? 0.5 : 'none',
                  '& .MuiOutlinedInput-root': {
                    color: '#333',
                    background: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#7E57C2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7E57C2',
                    },
                    '& textarea': {
                      height: isMaximized ? '100% !important' : 'auto !important',
                    },
                  },
                }}
              />
              
              {/* Execution Steps Log */}
              {(loading || executionSteps.length > 0) && (
                <Box
                  sx={{
                    flex: isMaximized ? 0.5 : 'none',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                    background: 'rgba(243, 238, 255, 0.3)',
                    overflow: 'auto',
                    maxHeight: isMaximized ? 'none' : '200px',
                  }}
                >
                  <List dense>
                    {executionSteps.map((step, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText 
                            primary={step}
                            sx={{
                              '& .MuiListItemText-primary': {
                                color: '#7E57C2',
                                fontSize: '0.9rem',
                              }
                            }}
                          />
                        </ListItem>
                        {index < executionSteps.length - 1 && (
                          <Divider variant="middle" sx={{ borderColor: 'rgba(126, 87, 194, 0.1)' }} />
                        )}
                      </React.Fragment>
                    ))}
                    {loading && (
                      <ListItem>
                        <ListItemText 
                          primary="Executing command..."
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: '#7E57C2',
                              fontSize: '0.9rem',
                              fontStyle: 'italic'
                            }
                          }}
                        />
                      </ListItem>
                    )}
                  </List>
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={loading || !prompt.trim()}
                sx={{
                  mt: 1,
                  background: '#7E57C2',
                  '&:hover': {
                    background: '#6A1B9A',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                {loading ? 'Executing...' : 'Execute'}
              </Button>
            </Box>
          </Collapse>
        </Paper>
      </Draggable>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={success} 
        autoHideDuration={3000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Command executed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DraggablePrompt; 