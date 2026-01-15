echo "Commit Message:"
read $commitMessage

git add .
git commit -m $commitMessage
git push
