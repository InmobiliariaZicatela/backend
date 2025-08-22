#!/bin/bash

# Heroku Environment Variables Setup Script
# Run this after creating your Heroku app and adding PostgreSQL

echo "Setting up Heroku environment variables for Strapi..."

# Check if app name is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup-heroku-env.sh YOUR_APP_NAME"
    echo "Example: ./setup-heroku-env.sh my-strapi-app"
    exit 1
fi

APP_NAME=$1

echo "Setting up environment for app: $APP_NAME"
echo ""
echo "IMPORTANT: Make sure you've already added PostgreSQL with:"
echo "heroku addons:create heroku-postgresql:essential-0 -a $APP_NAME"
echo ""

# Set basic environment variables
echo "Setting basic environment variables..."
heroku config:set NODE_ENV=production -a $APP_NAME
heroku config:set DATABASE_CLIENT=postgres -a $APP_NAME
heroku config:set DATABASE_SSL=true -a $APP_NAME
heroku config:set DATABASE_SSL_REJECT_UNAUTHORIZED=false -a $APP_NAME

# Generate and set security keys
echo "Generating and setting security keys..."
heroku config:set APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)" -a $APP_NAME
heroku config:set API_TOKEN_SALT="$(openssl rand -base64 32)" -a $APP_NAME
heroku config:set ADMIN_JWT_SECRET="$(openssl rand -base64 32)" -a $APP_NAME
heroku config:set TRANSFER_TOKEN_SALT="$(openssl rand -base64 32)" -a $APP_NAME
heroku config:set ENCRYPTION_KEY="$(openssl rand -base64 32)" -a $APP_NAME

# Set admin panel flags
echo "Setting admin panel flags..."
heroku config:set FLAG_NPS=false -a $APP_NAME
heroku config:set FLAG_PROMOTE_EE=false -a $APP_NAME

echo ""
echo "Environment variables set successfully!"
echo ""
echo "You can verify by running: heroku config -a $APP_NAME"
echo ""
echo "Next steps:"
echo "1. Deploy your app: git push heroku main"
echo "2. Build Strapi: heroku run npm run build -a $APP_NAME"
echo "3. Open your app: heroku open -a $APP_NAME"
echo ""
echo "Note: PostgreSQL essential-0 plan costs ~$5/month"
