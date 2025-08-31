#!/usr/bin/env bash

# Prompt for directory name
read -p "Enter a directory name: " dirname

# Get today's date in YYYY-MM-DD format
today=$(date +%F)

# Construct final directory name
final_dir="${today}-${dirname}"

# Create the directory
mkdir -p "$final_dir"

echo "Directory created: $final_dir"
