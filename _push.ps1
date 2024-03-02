$branch = "main"
$message = Read-Host -Prompt "Enter your commit message"

git add .
git commit -m $message
git push -u origin $branch

Write-Host "Successful"
Write-Host "--------------------------------------------------"