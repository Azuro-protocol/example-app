#!/bin/bash

# List of branch names to exclude
excluded_branches=("dev" "release" "main")

# Loop through all local branches
for branch in $(git branch | sed 's/^\*//'); do
  # Check if branch should be excluded
  if [[ "${excluded_branches[@]}" =~ "$branch" ]]; then
    echo "Skipping branch $branch"
  else
    # Delete the branch
    git branch -D "$branch"
    echo "Deleted branch $branch"
  fi
done
