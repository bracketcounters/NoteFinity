#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <sys/stat.h>
#include <unistd.h>

int main(int argc, char const *argv[]) {

    sleep(2);
    
    if (argc != 3) {
        printf("%s", "false");
        return 1;
    }



    const char* directoryPath = argv[1];
    const char* destinationPath = argv[2];
    // const char* directoryPath = "C:\\Users\\pptec\\AppData\\Local\\NoteFinity\\updates";
    // const char* destinationPath = "E:\\Program Files\\PPlayer";

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

        // printf("%s\n", entry->d_name);
        char* subPath = entry->d_name;
        char joinedSourcePath[500];
        strcpy(joinedSourcePath, directoryPath);

        if (joinedSourcePath[strlen(joinedSourcePath) - 1] != '\\' && joinedSourcePath[strlen(joinedSourcePath) - 1] != '/') {
            strcat(joinedSourcePath, "\\");
        }
        strcat(joinedSourcePath, subPath);

        char joinedDestinationPath[500];
        strcpy(joinedDestinationPath, destinationPath);

        if (joinedDestinationPath[strlen(joinedDestinationPath) - 1] != '\\' && joinedDestinationPath[strlen(joinedDestinationPath) - 1] != '/') {
            strcat(joinedDestinationPath, "\\");
        }
        strcat(joinedDestinationPath, subPath);

        if (access(joinedDestinationPath, F_OK) != -1) {
            if (remove(joinedDestinationPath) != 0) {
                perror("");
                return 1;
            }
        }
        
        if (rename(joinedSourcePath, joinedDestinationPath) == 0) {

        }
        
        else {
            perror("");
            return 1;
        }

    }

    closedir(directory);

    printf("%s", "true");
    sleep(1);
    system("powershell.exe -Command \"Start-Process -FilePath '../NoteFinity.exe'\"");

    
    // for (int i = 1; i < argc; i++)
    // {
    //     printf("This argument at index number %d has a value of %s\n", i, argv[i]);
    // }

    // const char* sourceFilePath = "E:\\PITAM PAUL\\Documents\\movable.txt";
    // const char* destinationFilePath = "E:\\PITAM PAUL\\Downloads\\movable.txt";

    // int result = rename(sourceFilePath, destinationFilePath);
    // if (result == 0) {
    //     printf("success.\n");
    // } else {
    //     perror("");
    //     return 1;
    // }

    return 0;
}
