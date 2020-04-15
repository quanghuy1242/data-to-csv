# Rename all file with numbered

```ps1
cd data/
$nr = 1
Dir | %{Rename-Item $_ -NewName ('{0}.json' -f $nr++)}
```