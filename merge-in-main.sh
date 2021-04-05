echo "moving to main branch"
git checkout main
echo "merging main branch with staging branch"
git merge staging
echo "pushing new merged changes in main branch"
git push
echo "going back to staging branch"
git checkout staging