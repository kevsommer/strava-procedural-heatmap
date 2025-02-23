
#!/bin/bash
cd "$(dirname "$0")" || exit

git fetch origin main
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "Updates detected. Deploying changes..."
    git pull origin main
    docker-compose down
    docker-compose build
    docker-compose up -d
fi
