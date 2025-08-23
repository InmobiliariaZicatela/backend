# Heroku Deployment Guide for Strapi

## Prerequisites

1. Heroku account (free)
2. Heroku CLI installed
3. Git repository set up

## Step 1: Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

## Step 2: Login to Heroku

```bash
heroku login
```

## Step 3: Create Heroku App

```bash
# Create new app
heroku create your-app-name

# Or use existing app
heroku git:remote -a your-app-name
```

## Step 4: Add PostgreSQL Database

```bash
# Add PostgreSQL addon (essential-0 plan - ~$5/month)
heroku addons:create heroku-postgresql:essential-0

# Verify database URL
heroku config:get DATABASE_URL
```

**⚠️ Important Note**: The old free "mini" plan has been discontinued. The new "essential-0" plan costs approximately $5/month, which is the most affordable option available.

## Step 5: Set Environment Variables

```bash
# Set required environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_CLIENT=postgres
heroku config:set DATABASE_SSL=true
heroku config:set DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Generate and set security keys
heroku config:set APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"
heroku config:set API_TOKEN_SALT="$(openssl rand -base64 32)"
heroku config:set ADMIN_JWT_SECRET="$(openssl rand -base64 32)"
heroku config:set TRANSFER_TOKEN_SALT="$(openssl rand -base64 32)"
heroku config:set ENCRYPTION_KEY="$(openssl rand -base64 32)"

# Set admin panel flags
heroku config:set FLAG_NPS=false
heroku config:set FLAG_PROMOTE_EE=false
```

## Step 6: Deploy to Heroku

```bash
# Commit your changes
git add .
git commit -m "Prepare for Heroku deployment"

# Push to Heroku
git push heroku main

# Or if you're on master branch
git push heroku master
```

## Step 7: Run Database Migrations

```bash
# Run Strapi build (IMPORTANT: Use quotes!)
heroku run "npm run build"

# Or run any custom build commands
heroku run "npm run strapi build"
```

**⚠️ Critical**: Always wrap commands in quotes when using `heroku run`. Without quotes, you'll get the error: `/bin/bash: line 1: run: command not found`

## Step 8: Open Your App

```bash
# Open in browser
heroku open

# Or get the URL
heroku info
```

## Step 9: Access Admin Panel

Your admin panel will be available at:

```
https://your-app-name.herokuapp.com/admin
```

## Common Issues & Solutions

### Issue 1: PostgreSQL "mini" Plan Discontinued

**Error**: `The mini plan has reached end-of-life`

**Solution**: Use `heroku-postgresql:essential-0` instead (costs ~$5/month)

### Issue 2: Node.js Version Compatibility

**Error**: `npm ERR! engine Unsupported engine`

**Solution**: Update `package.json` engines section:

```json
"engines": {
  "node": "20.x",
  "npm": "10.x"
}
```

### Issue 3: Heroku Run Command Syntax

**Error**: `/bin/bash: line 1: run: command not found`

**Solution**: Always use quotes: `heroku run "npm run build"`

### Issue 4: Database Connection Issues

**Error**: Database connection failures

**Solution**: Ensure these environment variables are set:

- `DATABASE_CLIENT=postgres`
- `DATABASE_SSL=true`
- `DATABASE_SSL_REJECT_UNAUTHORIZED=false`

## Troubleshooting

### Check Logs

```bash
heroku logs --tail
```

### Check Environment Variables

```bash
heroku config
```

### Restart App

```bash
heroku restart
```

### Database Issues

```bash
# Check database status
heroku pg:info

# Reset database if needed
heroku pg:reset DATABASE_URL
```

### Force Specific Node.js Version

```bash
# If you need a specific Node.js version
heroku config:set NODE_VERSION=20.19.3
```

## Important Notes

1. **Current Pricing**:

   - **PostgreSQL**: ~$5/month (essential-0 plan)
   - **Web Dyno**: Free tier available (sleeps after 30 min inactivity)
   - **Total cost**: Approximately $5/month for basic setup

2. **Database**:

   - PostgreSQL is automatically configured
   - DATABASE_URL is automatically set by Heroku
   - Essential-0 plan includes 1GB storage and 10,000 rows

3. **Environment Variables**:

   - All sensitive keys are automatically generated
   - No need to manually create .env file on Heroku

4. **Scaling**:

   - Free tier: 1 web dyno (sleeps after inactivity)
   - Can upgrade to paid plans for better performance

## Alternative Free Options

If you want to avoid the $5/month cost, consider:

1. **Railway**: Offers free PostgreSQL database
2. **Supabase**: Free tier with PostgreSQL
3. **PlanetScale**: Free MySQL database
4. **Local Development**: Use SQLite for development, PostgreSQL only for production

## Next Steps After Deployment

1. Create your first admin user
2. Configure your content types
3. Set up your API endpoints
4. Test all functionality
5. Consider upgrading to paid plan for production use

## Quick Setup Script

Use the included `setup-heroku-env.sh` script to automatically set all environment variables:

```bash
./setup-heroku-env.sh YOUR_APP_NAME
```
