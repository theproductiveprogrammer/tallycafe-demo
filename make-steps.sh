#!/bin/bash

# delete existing steps
for branch in $(git for-each-ref --format='%(refname)' refs/heads/); do
    branch=$(echo $branch | sed 's,refs/heads/,,')
    if $(echo $branch | grep -q '^step[0-9]*'); then
        git branch -D $branch > /dev/null
    fi
done

STEPNUM=1
for commit in $(git rev-list --reverse HEAD | sed '1d'); do
    git branch step$STEPNUM $commit
    STEPNUM=$((STEPNUM+1))
done
