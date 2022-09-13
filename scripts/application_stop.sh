#!/bin/bash

echo "Stopping application"
kill -9 $(lsof -i:3000 -t) || true