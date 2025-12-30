# Release Process

This document describes how to create a new release and trigger the Docker image build pipeline.

## Creating a Release

### Method 1: GitHub UI (Recommended)

1. **Navigate to Releases**
   - Go to your repository on GitHub
   - Click on "Releases" in the right sidebar
   - Click "Draft a new release"

2. **Create a Tag**
   - Click "Choose a tag"
   - Type a new tag name following semantic versioning: `v1.0.0`, `v1.0.1`, `v2.0.0`, etc.
   - Click "Create new tag: vX.X.X on publish"

3. **Fill Release Details**
   - **Release title**: e.g., "Version 1.0.0 - Initial Release"
   - **Description**: Add release notes, changelog, breaking changes, etc.
   - **Set as latest release**: Check this box for production releases
   - **Set as pre-release**: Check this for beta/alpha releases

4. **Publish Release**
   - Click "Publish release"
   - This will automatically trigger the Docker build workflow

### Method 2: Git Command Line

```bash
# 1. Ensure you're on the main branch and up to date
git checkout main
git pull origin main

# 2. Create and push a tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 3. Create release on GitHub
# Go to GitHub UI and create a release from the tag
# Or use GitHub CLI:
gh release create v1.0.0 \
  --title "Version 1.0.0" \
  --notes "Release notes here"
```

### Method 3: GitHub CLI

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Create a release (this will create the tag and trigger the workflow)
gh release create v1.0.0 \
  --title "Version 1.0.0 - Initial Release" \
  --notes "## What's New
- Feature 1
- Feature 2
- Bug fixes

## Breaking Changes
- None

## Installation
\`\`\`bash
docker pull ghcr.io/your-org/task-management-app/app:v1.0.0
\`\`\`"

# For pre-release
gh release create v1.0.0-beta.1 \
  --title "Version 1.0.0 Beta 1" \
  --notes "Beta release for testing" \
  --prerelease
```

## Semantic Versioning

Follow [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** version (`v2.0.0`) - Incompatible API changes
- **MINOR** version (`v1.1.0`) - New features, backwards compatible
- **PATCH** version (`v1.0.1`) - Bug fixes, backwards compatible

### Examples:

- `v1.0.0` - Initial release
- `v1.0.1` - Bug fix release
- `v1.1.0` - New feature release
- `v2.0.0` - Breaking changes release
- `v1.0.0-beta.1` - Pre-release/beta version
- `v1.0.0-rc.1` - Release candidate

## Docker Image Tags

When you create a release with tag `v1.2.3`, the following Docker images are built:

### App Images:
```
ghcr.io/your-org/task-management-app/app:v1.2.3
ghcr.io/your-org/task-management-app/app:v1.2
ghcr.io/your-org/task-management-app/app:v1
ghcr.io/your-org/task-management-app/app:latest
ghcr.io/your-org/task-management-app/app:sha-abc1234
```

### WebSocket Images:
```
ghcr.io/your-org/task-management-app/websocket:v1.2.3
ghcr.io/your-org/task-management-app/websocket:v1.2
ghcr.io/your-org/task-management-app/websocket:v1
ghcr.io/your-org/task-management-app/websocket:latest
ghcr.io/your-org/task-management-app/websocket:sha-abc1234
```

## Manual Workflow Trigger

You can also manually trigger the build workflow:

1. Go to **Actions** tab in your repository
2. Select **"Build and Push Docker Images"** workflow
3. Click **"Run workflow"**
4. Enter the tag name (e.g., `v1.0.0`)
5. Click **"Run workflow"**

## Monitoring the Build

1. **Check Workflow Status**
   - Go to the "Actions" tab
   - Click on the running workflow
   - Monitor the build progress

2. **View Build Summary**
   - After completion, check the workflow summary
   - It will show the published image tags and pull commands

3. **Verify Images**
   ```bash
   # Pull and test the images
   docker pull ghcr.io/your-org/task-management-app/app:v1.0.0
   docker pull ghcr.io/your-org/task-management-app/websocket:v1.0.0
   
   # Inspect the images
   docker inspect ghcr.io/your-org/task-management-app/app:v1.0.0
   ```

## Release Checklist

Before creating a release:

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version number follows SemVer
- [ ] Breaking changes are documented
- [ ] Database migrations are tested
- [ ] Environment variables are documented
- [ ] Security vulnerabilities are addressed

## Rollback

If you need to rollback a release:

```bash
# 1. Delete the release on GitHub
gh release delete v1.0.0

# 2. Delete the tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0

# 3. Deploy previous version
kubectl set image deployment/taskflow-app \
  app=ghcr.io/your-org/task-management-app/app:v0.9.0 \
  -n taskflow
```

## Hotfix Process

For urgent fixes:

1. Create a hotfix branch from the release tag
   ```bash
   git checkout -b hotfix/v1.0.1 v1.0.0
   ```

2. Make the fix and commit
   ```bash
   git commit -am "Fix critical bug"
   ```

3. Create a new patch release
   ```bash
   git tag -a v1.0.1 -m "Hotfix: Critical bug fix"
   git push origin v1.0.1
   ```

4. Create the release on GitHub
   ```bash
   gh release create v1.0.1 \
     --title "Version 1.0.1 - Hotfix" \
     --notes "Critical bug fix"
   ```

## Troubleshooting

### Build Fails

1. Check the workflow logs in Actions tab
2. Verify Dockerfile syntax
3. Ensure all dependencies are available
4. Check for build errors in the logs

### Images Not Pushed

1. Verify GitHub token permissions
2. Check if the workflow completed successfully
3. Ensure you have write access to packages

### Wrong Tag

1. Delete the release and tag
2. Create a new release with correct tag
3. Old images will remain but can be deleted manually

## Support

For issues with the release process:
- Check [GitHub Actions documentation](https://docs.github.com/en/actions)
- Review workflow logs
- Open an issue in the repository
