#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <sys/stat.h>
#include <string.h>

int main(int argc, char const *argv[]) {
    
    const char* directoryPath = "C:\\Users\\pptec\\AppData\\Local\\NoteFinity\\updates";


    DIR* directory = opendir(directoryPath);
    if (directory == NULL) {
        perror("Error opening directory");
        return 1;
    }

    struct dirent* entry;
    while ((entry = readdir(directory)) != NULL) {
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
            continue;
        }

        char entryPath[256];
        snprintf(entryPath, sizeof(entryPath), "%s/%s", directoryPath, entry->d_name);

        struct stat fileStat;
        if (stat(entryPath, &fileStat) == -1) {
            perror("");
            closedir(directory);
            return 1;
        }

        printf("%s\n", entry->d_name);
    }

    closedir(directory);

    return 0;
}
