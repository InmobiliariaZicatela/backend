# Heroku Maintenance & Update Guide

## Overview

This guide covers how to maintain and update your Strapi application deployed on Heroku. It includes common scenarios like code updates, dependency updates, database maintenance, and troubleshooting.

## Table of Contents

1. [Code Updates](#code-updates)
2. [Dependency Updates](#dependency-updates)
3. [Database Maintenance](#database-maintenance)
4. [Environment Variable Updates](#environment-variable-updates)
5. [Monitoring & Logs](#monitoring--logs)
6. [Backup & Recovery](#backup--recovery)
7. [Scaling & Performance](#scaling--performance)
8. [Common Maintenance Tasks](#common-maintenance-tasks)

## Code Updates

### Basic Code Update Workflow

```bash
# 1. Make your code changes locally
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Deploy to Heroku
git push heroku main

# 5. Build the application
heroku run "npm run build"

# 6. Restart the application
heroku restart
```

### Automated Deployment (Optional)

Set up automatic deployment from GitHub:

```bash
# Connect GitHub repository
heroku pipelines:create your-pipeline-name

# Add your app to the pipeline
heroku pipelines:add your-pipeline-name -a your-app-name

# Enable automatic deploys
heroku pipelines:connect your-pipeline-name --repo owner/repo-name
```

### Rollback Deployment

If something goes wrong, quickly rollback:

```bash
# List recent releases
heroku releases

# Rollback to previous version
heroku rollback v123

# Or rollback to specific version
heroku rollback v120
```

## Dependency Updates

### Update Dependencies Locally

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update specific package
npm install package-name@latest

# Update all packages to latest
npx npm-check-updates -u
npm install
```

### Test Updates Locally

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build
npm run build

# Test locally
npm run dev
```

### Deploy Updated Dependencies

```bash
# Commit dependency updates
git add package.json package-lock.json
git commit -m "Update dependencies"

# Deploy to Heroku
git push heroku main

# Rebuild application
heroku run "npm run build"

# Restart to ensure changes take effect
heroku restart
```

### Strapi Version Updates

```bash
# Check current Strapi version
npm list @strapi/strapi

# Update Strapi
npx @strapi/upgrade latest

# Or specific version
npx @strapi/upgrade 5.23.0

# Test upgrade locally
npm run build
npm run dev

# Deploy upgrade
git add .
git commit -m "Upgrade Strapi to v5.23.0"
git push heroku main
heroku run "npm run build"
```

## Database Maintenance

### Database Health Check

```bash
# Check database status
heroku pg:info

# Check database size
heroku pg:info --app your-app-name

# Monitor database performance
heroku pg:ps
```

### Database Backup

```bash
# Create backup
heroku pg:backups:capture

# List backups
heroku pg:backups

# Download backup
heroku pg:backups:download b001

# Restore from backup
heroku pg:backups:restore b001 DATABASE_URL
```

### Database Maintenance

```bash
# Run database maintenance
heroku pg:psql

# In psql, run:
VACUUM ANALYZE;
REINDEX DATABASE your_database_name;
```

### Reset Database (⚠️ Destructive)

```bash
# Only use when you want to start fresh
heroku pg:reset DATABASE_URL

# Confirm with app name
heroku pg:reset DATABASE_URL --app your-app-name --confirm your-app-name
```

## Environment Variable Updates

### View Current Environment

```bash
# View all environment variables
heroku config

# View specific variable
heroku config:get VARIABLE_NAME
```

### Update Environment Variables

```bash
# Set single variable
heroku config:set VARIABLE_NAME=value

# Set multiple variables
heroku config:set VAR1=value1 VAR2=value2

# Remove variable
heroku config:unset VARIABLE_NAME
```

### Bulk Environment Update

```bash
# Create .env file locally with new values
# Then bulk set them
heroku config:set $(cat .env | grep -v '^#' | xargs)
```

### Security Key Rotation

```bash
# Generate new security keys
heroku config:set APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"
heroku config:set API_TOKEN_SALT="$(openssl rand -base64 32)"
heroku config:set ADMIN_JWT_SECRET="$(openssl rand -base64 32)"
heroku config:set TRANSFER_TOKEN_SALT="$(openssl rand -base64 32)"
heroku config:set ENCRYPTION_KEY="$(openssl rand -base64 32)"

# Restart after key rotation
heroku restart
```

## Monitoring & Logs

### View Application Logs

```bash
# Real-time logs
heroku logs --tail

# Recent logs
heroku logs --num 100

# Logs from specific time
heroku logs --since 1h

# Logs with specific source
heroku logs --source app
```

### Application Metrics

```bash
# View app info
heroku info

# Check app status
heroku ps

# Monitor dyno usage
heroku ps:scale web=1
```

### Performance Monitoring

```bash
# Enable Heroku metrics
heroku labs:enable runtime-metrics

# View metrics
heroku labs:info runtime-metrics
```

## Backup & Recovery

### Complete Application Backup

```bash
# 1. Database backup
heroku pg:backups:capture

# 2. Code backup (Git)
git push origin backup-branch

# 3. Environment variables backup
heroku config > heroku-config-backup.txt

# 4. File uploads backup (if any)
# Download from public/uploads/ directory
```

### Disaster Recovery

```bash
# 1. Restore database
heroku pg:backups:restore b001 DATABASE_URL

# 2. Restore code
git checkout backup-branch
git push heroku backup-branch:main

# 3. Restore environment
heroku config:set $(cat heroku-config-backup.txt | grep -v '^#' | xargs)

# 4. Rebuild and restart
heroku run "npm run build"
heroku restart
```

## Scaling & Performance

### Dyno Scaling

```bash
# Scale web dynos
heroku ps:scale web=2

# Scale worker dynos (if you have them)
heroku ps:scale worker=1

# Check current scaling
heroku ps
```

### Database Scaling

```bash
# Check current database plan
heroku addons:plans heroku-postgresql

# Upgrade database plan
heroku addons:upgrade heroku-postgresql:essential-1

# Check database performance
heroku pg:ps
```

### Performance Optimization

```bash
# Enable query logging
heroku config:set LOG_LEVEL=debug

# Monitor slow queries
heroku pg:ps --verbose

# Optimize database
heroku pg:psql
# Run: EXPLAIN ANALYZE on slow queries
```

## Common Maintenance Tasks

### Weekly Tasks

```bash
# Check application health
heroku ps
heroku logs --num 50

# Monitor database
heroku pg:info
```

### Monthly Tasks

```bash
# Update dependencies
npm update
npm audit fix

# Database maintenance
heroku pg:backups:capture
heroku pg:psql
# Run: VACUUM ANALYZE;
```

### Quarterly Tasks

```bash
# Major dependency updates
npx npm-check-updates -u
npm install

# Strapi version check
npx @strapi/upgrade latest

# Security audit
npm audit
npm audit fix
```

### Emergency Procedures

```bash
# App not responding
heroku restart

# Database issues
heroku pg:reset DATABASE_URL --confirm your-app-name

# Rollback deployment
heroku rollback

# Check status
heroku status
```

## Troubleshooting Checklist

### App Won't Start

- [ ] Check logs: `heroku logs --tail`
- [ ] Verify environment variables: `heroku config`
- [ ] Check database connection: `heroku pg:info`
- [ ] Restart app: `heroku restart`

### Build Failures

- [ ] Check Node.js version compatibility
- [ ] Verify package.json engines section
- [ ] Check for dependency conflicts
- [ ] Review build logs

### Database Issues

- [ ] Check database status: `heroku pg:info`
- [ ] Verify DATABASE_URL: `heroku config:get DATABASE_URL`
- [ ] Check SSL settings
- [ ] Test connection: `heroku pg:psql`

### Performance Issues

- [ ] Monitor dyno usage: `heroku ps`
- [ ] Check database performance: `heroku pg:ps`
- [ ] Review application logs
- [ ] Consider scaling up

## Useful Commands Reference

```bash
# App management
heroku open                    # Open app in browser
heroku info                    # App information
heroku status                  # Heroku status
heroku maintenance:on          # Enable maintenance mode
heroku maintenance:off         # Disable maintenance mode

# Database management
heroku pg:info                # Database info
heroku pg:psql                # Connect to database
heroku pg:backups             # List backups
heroku pg:backups:capture     # Create backup

# Logs and monitoring
heroku logs --tail            # Real-time logs
heroku logs --num 100         # Last 100 log lines
heroku logs --source app      # App logs only

# Configuration
heroku config                  # View all config vars
heroku config:set VAR=value   # Set config var
heroku config:unset VAR       # Remove config var

# Scaling
heroku ps:scale web=2         # Scale web dynos
heroku ps:scale worker=1      # Scale worker dynos
```

## Best Practices

1. **Always test locally** before deploying
2. **Use feature branches** for development
3. **Monitor logs regularly** for issues
4. **Keep dependencies updated** for security
5. **Backup database regularly**
6. **Use environment variables** for configuration
7. **Monitor performance metrics**
8. **Have a rollback plan** ready

## Support Resources

- [Heroku Dev Center](https://devcenter.heroku.com/)
- [Strapi Documentation](https://docs.strapi.io/)
- [Heroku Status Page](https://status.heroku.com/)
- [Strapi Community](https://forum.strapi.io/)
