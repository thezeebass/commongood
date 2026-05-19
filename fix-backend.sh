#!/bin/bash
set -e

echo "=== Fixing Backend Structure ==="

cd backend/src

# 1. Flatten src/src/ → src/
echo "Flattening src/src/ structure..."
if [ -d "src" ]; then
    mv src/config .
    mv src/controllers .
    mv src/middleware .
    mv src/routes .
    mv src/services .
    mv src/utils .
    rmdir src
    echo "  ✓ Moved nested src/ contents up"
fi

# 2. Move config files to backend/ root
echo "Moving config files..."
cd ..
if [ -f "src/package.json" ]; then
    mv src/package.json .
    echo "  ✓ Moved package.json to backend/"
fi
if [ -f "src/tsconfig.json" ]; then
    mv src/tsconfig.json .
    echo "  ✓ Moved tsconfig.json to backend/"
fi

# 3. Remove old duplicate controllers/services
echo "Cleaning old files..."
if [ -f "src/controllers/votingController.ts" ]; then
    # Check if it's the old one (size ~3706) vs new one (~1170)
    size=$(stat -f%z "src/controllers/votingController.ts" 2>/dev/null || stat -c%s "src/controllers/votingController.ts" 2>/dev/null || echo "0")
    if [ "$size" = "3706" ]; then
        rm -rf src/controllers
        echo "  ✓ Removed old controllers/"
    fi
fi
if [ -f "src/services/stellarService.ts" ]; then
    size=$(stat -f%z "src/services/stellarService.ts" 2>/dev/null || stat -c%s "src/services/stellarService.ts" 2>/dev/null || echo "0")
    if [ "$size" = "2239" ]; then
        rm -rf src/services
        echo "  ✓ Removed old services/"
    fi
fi

# 4. Fix notFoundHandler import in index.ts
echo "Fixing index.ts..."
if [ -f "src/index.ts" ]; then
    sed -i.bak "s/import { errorHandler } from '.\/middleware\/errorHandler';/import { errorHandler, notFoundHandler } from '.\/middleware\/errorHandler';/" src/index.ts
    rm -f src/index.ts.bak
    echo "  ✓ Fixed notFoundHandler import"
fi

echo ""
echo "=== Structure Fixed ==="
echo "Next steps:"
echo "  cd backend"
echo "  npm install"
echo "  cp .env.example .env  # (create this if missing)"
echo "  npm run dev"
