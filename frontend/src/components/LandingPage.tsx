import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  IconButton,
  Fade,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  AutoAwesome as AutoIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const theme = useTheme();

  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Lightning Fast Automation',
      description: 'Automate web tasks at unprecedented speeds with our advanced AI engine'
    },
    {
      icon: <AutoIcon sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Intelligence',
      description: 'Natural language processing that understands your commands and executes them perfectly'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted communications and secure automation'
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Developer Friendly',
      description: 'Extensive API support and seamless integration capabilities'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1b1e 0%, #2d1b34 100%)',
      color: 'white',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1,
        zIndex: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, #9c27b0 0%, transparent 70%)',
          animation: 'float 15s infinite',
          top: '20%',
          left: '10%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, #7b1fa2 0%, transparent 70%)',
          animation: 'float 20s infinite',
          bottom: '10%',
          right: '20%',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translate(0, 0)',
          },
          '50%': {
            transform: 'translate(50px, 20px)',
          },
        },
      }} />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ minHeight: '100vh', alignItems: 'center' }}>
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                    background: 'linear-gradient(45deg, #fff 30%, #9c27b0 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  SmartSurf AI
                </Typography>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 500,
                    mb: 3,
                    color: 'rgba(255,255,255,0.9)'
                  }}
                >
                  Revolutionize Web Automation with AI
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1.1rem',
                    maxWidth: '600px'
                  }}
                >
                  Transform your web interactions with SmartSurf AI. Our cutting-edge AI technology understands natural language commands and automates complex web tasks with unprecedented accuracy and speed.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={onGetStarted}
                    sx={{
                      background: 'linear-gradient(45deg, #9c27b0 30%, #7b1fa2 90%)',
                      color: 'white',
                      px: 4,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #7b1fa2 30%, #6a1b9a 90%)',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                  <IconButton 
                    size="large" 
                    sx={{ 
                      color: 'white',
                      border: '2px solid rgba(255,255,255,0.2)',
                      '&:hover': {
                        border: '2px solid rgba(255,255,255,0.5)',
                      }
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                </Box>
              </Box>
            </Fade>
          </Grid>
          
          {/* Feature Cards */}
          <Grid item xs={12}>
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)'
              }}
            >
              Why Choose SmartSurf?
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Fade in timeout={1000 + (index * 500)}>
                    <Card sx={{
                      height: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        background: 'rgba(255,255,255,0.08)',
                      }
                    }}>
                      <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 3,
                      }}>
                        <Box sx={{
                          color: '#9c27b0',
                          mb: 2,
                          transform: 'scale(1.2)',
                        }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage; 