#!/bin/zsh

# build_and_screenshot.sh
# Automates the build process and captures a screenshot of the index.html file using macOS Google Chrome Headless.

# Set -e to exit immediately if any command fails.
set -e

echo "=================================="
echo "Starting App Build and Screenshot Process"
echo "===================================="

# --- 1. Build the app ---
echo "-> 1/2. Running 'npm run build'..."
if ! npm run build; then
    echo ""
    echo "!!! ERROR: Build failed. Please check the npm logs above."
    exit 1
fi
echo "-> Build successful."


# --- 2. Take a screenshot via Google Chrome Headless (macOS specific) ---
echo "-> 2/2. Capturing screenshot of ./public/index.html using Chrome Headless..."

# Define paths
HTML_FILE="./public/index.html"
OUTPUT_IMAGE="screenshot.png"

# Check if Chrome application exists at the expected path
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -f "$CHROME_PATH" ]; then
    echo "!!! ERROR: Google Chrome executable not found at $CHROME_PATH."
    echo "Please ensure Google Chrome is installed in the standard /Applications directory."
    exit 1
fi

# The headless command arguments are critical.
# We use --dump-dom to ensure the HTML is fully rendered into a string, and --screenshot captures the viewport.
# The command structure for running a local file path generally requires the CLI to be invoked with the file path.
# Set the timezone environment variable for the execution
# and pass arguments to enforce background transparency via JavaScript.
if TZ="Europe/Kutna_Hora" "$CHROME_PATH" \
    --headless \
    --disable-gpu \
    --dump-dom "$HTML_FILE" \
    --screenshot="$OUTPUT_IMAGE"; then
    echo "-> Screenshot successful! Image saved to ${OUTPUT_IMAGE}."
else
    echo "!!! ERROR: Failed to capture screenshot using Chrome Headless."
    echo "Please ensure the file ${HTML_FILE} exists and the Chrome binary has necessary permissions."
    exit 1
fi


# --- Completion ---
echo ""
echo "=================================================="
echo "✅ Process completed successfully."
echo "Image saved: ${OUTPUT_IMAGE}"
echo "=================================================="
