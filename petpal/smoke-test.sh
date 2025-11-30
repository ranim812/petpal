#!/bin/bash
echo "🧪 Starting smoke tests..."

# Test 1: Check if build directory exists
if [ -d "build" ]; then
    echo "✅ Build directory exists"
else
    echo "❌ Build directory missing!"
    exit 1
fi

# Test 2: Check if main HTML file exists
if [ -f "build/index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing!"
    exit 1
fi

# Test 3: Check if JavaScript files were created
if ls build/static/js/main.*.js 1> /dev/null 2>&1; then
    echo "✅ JavaScript bundles exist"
else
    echo "❌ JavaScript bundles missing!"
    exit 1
fi

echo "🎉 All smoke tests passed!"