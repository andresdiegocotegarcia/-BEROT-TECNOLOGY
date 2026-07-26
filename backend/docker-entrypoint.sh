#!/bin/sh
set -e

# Run migrations and seeders if RUN_MIGRATIONS is set to "true"
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "🔄 Running database migrations..."
  npx sequelize-cli db:migrate
  echo "🌱 Running database seeders..."
  npx sequelize-cli db:seed:all
  echo "✅ Migrations and seeders completed"
fi

# Execute the main command
exec "$@"
