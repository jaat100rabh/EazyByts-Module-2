# Move all files from the nested folder to root
$source = "$PWD\bull-bear-dashboard-main\*"
$destination = "$PWD\"

# Move all files and folders except the .git folder
Get-ChildItem -Path $source -Exclude ".git" | ForEach-Object {
    $target = Join-Path $destination $_.Name
    if (Test-Path $target) {
        if ($_.PSIsContainer) {
            # If it's a directory, merge contents
            Copy-Item -Path $_.FullName\* -Destination $target -Recurse -Force
        } else {
            # If it's a file, overwrite
            Copy-Item -Path $_.FullName -Destination $target -Force
        }
    } else {
        Move-Item -Path $_.FullName -Destination $destination -Force
    }
}

# Remove the now empty directory
Remove-Item -Path "$PWD\bull-bear-dashboard-main" -Recurse -Force

Write-Host "Files have been moved to the root directory. The old folder has been removed."
