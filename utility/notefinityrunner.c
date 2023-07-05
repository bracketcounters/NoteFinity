#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[])
{
    system("powershell.exe -Command \"Start-Process -FilePath '../NoteFinity.exe'\"");
    return 0;
}
