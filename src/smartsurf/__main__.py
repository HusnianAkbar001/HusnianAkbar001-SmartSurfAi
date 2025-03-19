"""Entry point of the application."""

# %% IMPORTS

import sys
from . import executions
from . import api

# %% MAIN

def main():
    if len(sys.argv) > 1:
        # Command line mode
        execution = executions.Execution()
        execution.run(" ".join(sys.argv[1:]))
    else:
        # API server mode
        api.start_server()

if __name__ == "__main__":
    main()
