# Heroku Quick Reference Card

## 🚀 Essential Commands

### Deployment

```bash
git push heroku main                    # Deploy to Heroku
heroku run "npm run build"             # Build Strapi (IMPORTANT: Use quotes!)
heroku restart                          # Restart application
```

### Status & Monitoring

```bash
heroku open                            # Open app in browser
heroku logs --tail                     # Real-time logs
heroku ps                              # Check app status
heroku info                            # App information
```

### Database

```bash
heroku pg:info                         # Database status
heroku pg:psql                         # Connect to database
heroku pg:backups:capture              # Create backup
```

### Configuration

```bash
heroku config                          # View all environment variables
heroku config:set VAR=value            # Set environment variable
heroku config:get VAR_NAME             # Get specific variable
```

## ⚠️ Common Issues & Solutions

### Issue: "run: command not found"

**Solution**: Always use quotes: `heroku run "npm run build"`

### Issue: PostgreSQL "mini" plan discontinued

**Solution**: Use `heroku-postgresql:essential-0` (~$5/month)

### Issue: Node.js version compatibility

**Solution**: Update package.json engines to `"node": "20.x", "npm": "10.x"`

## 🔄 Update Workflow

```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Commit
git add .
git commit -m "Description"

# 4. Deploy
git push heroku main

# 5. Build
heroku run "npm run build"

# 6. Restart
heroku restart
```

## 🆘 Emergency Commands

```bash
heroku rollback                        # Rollback to previous version
heroku pg:reset DATABASE_URL           # Reset database (⚠️ Destructive)
heroku maintenance:on                  # Enable maintenance mode
heroku maintenance:off                 # Disable maintenance mode
```

## 📊 Monitoring Commands

```bash
heroku logs --num 100                  # Last 100 log lines
heroku logs --since 1h                 # Logs from last hour
heroku pg:ps                           # Database processes
heroku releases                        # Deployment history
```

## 🗄️ Database Commands

```bash
heroku pg:backups                      # List backups
heroku pg:backups:download b001        # Download backup
heroku pg:backups:restore b001 DATABASE_URL  # Restore backup
```

## 🔧 Maintenance Commands

```bash
npm update                             # Update dependencies
npx @strapi/upgrade latest            # Update Strapi
npm audit fix                          # Fix security issues
heroku labs:enable runtime-metrics     # Enable performance metrics
```

## 📱 App Management

```bash
heroku open                            # Open in browser
heroku status                          # Heroku platform status
heroku ps:scale web=2                 # Scale to 2 web dynos
heroku addons:plans heroku-postgresql  # View database plans
```

## 🔐 Security

```bash
# Generate new security keys
heroku config:set APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"
heroku config:set ADMIN_JWT_SECRET="$(openssl rand -base64 32)"
heroku config:set API_TOKEN_SALT="$(openssl rand -base64 32)"
```

## 📁 File Structure

```
├── HEROKU_DEPLOYMENT.md          # Complete deployment guide
├── HEROKU_MAINTENANCE.md         # Maintenance & updates guide
├── HEROKU_QUICK_REFERENCE.md     # This quick reference
├── setup-heroku-env.sh           # Environment setup script
├── app.json                      # Heroku app configuration
└── Procfile                      # Heroku process definition
```

## 🚨 Troubleshooting Checklist

- [ ] Check logs: `heroku logs --tail`
- [ ] Verify environment: `heroku config`
- [ ] Check database: `heroku pg:info`
- [ ] Restart app: `heroku restart`
- [ ] Check status: `heroku ps`

## 💡 Pro Tips

1. **Always use quotes** with `heroku run`
2. **Test locally first** before deploying
3. **Monitor logs** during deployment
4. **Keep backups** before major changes
5. **Use rollback** if something goes wrong

## 📞 Support

- **Heroku Status**: `heroku status`
- **App Logs**: `heroku logs --tail`
- **Database**: `heroku pg:info`
- **Documentation**: See `HEROKU_DEPLOYMENT.md` and `HEROKU_MAINTENANCE.md`
