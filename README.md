# SmartSurfAI

Web browser automation through agentic workflows

## Setup

1. Install dependencies: `poetry install`
2. Configure environment variables
3. Ensure required drivers are properly configured

## Usage

Run automation workflows through the CLI interface



# SmartSurf AI

An intelligent browser automation tool that uses natural language commands to control web browsers.

## Features

- Natural language command processing
- Browser automation using Selenium
- Modern React-based UI with Material-UI
- Real-time execution logging
- Maximizable and minimizable overlay interface
- Google Gemini AI integration

## Setup

### Backend
```python
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn src.smartsurf.api:app --reload --port 8000
```

### Frontend
```bash
# Install dependencies
cd frontend
npm install

# Run the development server
npm start
```

## Environment Variables

Create a `.env` file with:
```env
GOOGLE_API_KEY=your_api_key_here
```

## Usage

1. Start both backend and frontend servers
2. Enter natural language commands in the overlay
3. Watch as the AI executes your commands in the browser