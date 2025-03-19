from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import asyncio
from typing import Optional
from . import executions, drivers, interactions, agents, actions

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CommandRequest(BaseModel):
    command: str
    driver: dict
    interaction: dict
    google_api_key: str  # Add this field for the API key

@app.post("/execute")
async def execute_command(request: CommandRequest):
    try:
        # Create driver configuration
        driver_config = drivers.DriverConfig(**request.driver)
        
        # Create interaction configuration
        interaction_config = interactions.InteractionConfig(**request.interaction)
        
        # Initialize the driver
        driver = drivers.init_driver_from_config(driver_config)
        
        # Create execution configuration
        execution_config = executions.ExecutionConfig()
        
        # Create action configuration
        action_config = actions.ActionConfig()
        
        # Create agent configuration with API key
        agent_config = agents.AgentConfig(api_key=request.google_api_key)
        
        # Create agent with config
        agent = agents.init_agent_from_config(agent_config)
        
        try:
            # Execute the command using the generator
            execution = executions.execute(
                query=request.command,
                agent=agent,
                driver=driver,
                config=execution_config,
                action_config=action_config
            )
            
            # Process the execution until completion
            responses = []
            content = await asyncio.to_thread(lambda: next(execution))
            responses.append(content)
            
            while True:
                try:
                    content = await asyncio.to_thread(lambda: execution.send(None))
                    responses.append(content)
                except StopIteration:
                    break
                except Exception as e:
                    print(f"Error during execution: {str(e)}")
                    break
            
            return {
                "status": "success",
                "message": "Command executed successfully",
                "responses": [
                    {
                        "role": response.role,
                        "parts": [
                            {
                                "text": part.text if part.text else None,
                                "function_call": {
                                    "name": part.function_call.name,
                                    "args": part.function_call.args
                                } if part.function_call else None
                            }
                            for part in response.parts
                        ]
                    }
                    for response in responses
                ]
            }
        finally:
            # Clean up
            if not driver_config.keep_alive:
                driver.quit()
                
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def start_server():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)

if __name__ == "__main__":
    start_server() 