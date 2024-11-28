#!/bin/bash

# Pull latest changes
git pull

# Rebuild and restart
./scripts/build.sh
./scripts/run.sh

echo "Update completed successfully" 