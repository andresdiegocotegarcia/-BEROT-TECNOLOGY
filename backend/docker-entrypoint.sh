#!/bin/sh
set -e

if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "🔄 Running database migrations..."
  npx sequelize-cli db:migrate
  echo "🌱 Running database seeders..."
  npx sequelize-cli db:seed:all
  echo "✅ Migrations and seeders completed"
fi

exec "$@"
