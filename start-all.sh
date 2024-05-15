#!/bin/bash

# Start the backend
echo "Starting backend..."
cd packages/backend
npm start &
BACKEND_PID=$!

# Start the frontend
echo "Starting frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for any process to exit
wait -n

# Optionally store PIDs in a file to be used by stop script
echo $BACKEND_PID > "/tmp/backend.pid"
echo $FRONTEND_PID > "/tmp/frontend.pid"
