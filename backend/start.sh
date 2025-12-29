#!/bin/bash
set -e

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Run the application
echo "Starting Backend..."
uvicorn app.main:app --reload
