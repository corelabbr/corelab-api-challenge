COMPOSE_FILE="composes/docker-compose.yml"
rm -rf backend/node_modules
echo "Usando o arquivo de compose: $COMPOSE_FILE"
docker-compose -p corelab-projeto -f "$COMPOSE_FILE" down -v
docker-compose -p corelab-projeto -f "$COMPOSE_FILE" up -d --build
