# Upgrade Guide

## Dependency Updates (December 2025)

This guide covers the major dependency updates to address security vulnerabilities and deprecation warnings.

### What Changed

#### Security Fixes
- **Next.js**: Updated from `14.1.0` to `15.1.3` (fixes critical security vulnerability)
- **React**: Updated from `18.2.0` to `18.3.1`
- **Prisma**: Updated from `5.8.0` to `5.22.0`

#### Deprecation Fixes
- **ESLint**: Updated from `8.56.0` to `9.17.0` (new flat config format)
- **All Radix UI components**: Updated to latest versions
- **Socket.IO**: Updated from `4.6.1` to `4.8.1`
- **Recharts**: Updated from `2.10.4` to `2.15.0`

### Breaking Changes

#### ESLint Configuration
ESLint 9.x uses a new flat config format. The old `.eslintrc.json` is replaced with `eslint.config.mjs`.

**Old format** (`.eslintrc.json`):
```json
{
  "extends": "next/core-web-vitals"
}
```

**New format** (`eslint.config.mjs`):
```javascript
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

#### Next.js 15 Changes
Next.js 15 includes some changes, but the app should work without modifications due to backward compatibility. Key improvements:
- Better performance
- Enhanced security
- Improved error handling

### How to Upgrade

1. **Clean install dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Regenerate Prisma Client**
   ```bash
   npx prisma generate
   ```

3. **Test your application**
   ```bash
   npm run dev
   ```

4. **Run linting**
   ```bash
   npm run lint
   ```

### Resolved Warnings

After upgrading, the following warnings are resolved:

✅ `npm warn deprecated next@14.1.0` - **Fixed**: Now using Next.js 15.1.3  
✅ `npm warn deprecated eslint@8.57.1` - **Fixed**: Now using ESLint 9.17.0  
✅ `npm warn deprecated @humanwhocodes/config-array` - **Fixed**: Using new ESLint config  
✅ `npm warn deprecated @humanwhocodes/object-schema` - **Fixed**: Using new ESLint config  
✅ `npm warn deprecated rimraf@3.0.2` - **Fixed**: Dependencies updated  
✅ `npm warn deprecated glob@7.2.3` - **Fixed**: Dependencies updated  
✅ `npm warn deprecated inflight@1.0.6` - **Fixed**: Dependencies updated  

### Compatibility

- **Node.js**: Requires Node.js 18.18.0 or higher (recommended: 20.x or 22.x)
- **npm**: Requires npm 9.x or higher
- **PostgreSQL**: Compatible with PostgreSQL 12+

### Troubleshooting

#### Issue: Module not found errors
**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json .next
npm install
```

#### Issue: Prisma Client errors
**Solution**: Regenerate Prisma Client
```bash
npx prisma generate
npx prisma db push
```

#### Issue: ESLint errors
**Solution**: Ensure you're using the new `eslint.config.mjs` file
```bash
npm run lint
```

### Additional Notes

- All functionality remains the same
- No database schema changes required
- WebSocket server configuration unchanged
- Environment variables remain the same

### Support

If you encounter any issues after upgrading, please:
1. Check this guide for solutions
2. Review the error messages carefully
3. Ensure all dependencies are properly installed
4. Open an issue in the repository if problems persist
