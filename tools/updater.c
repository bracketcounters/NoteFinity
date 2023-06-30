#include <stdio.h>

int main(int argc, char const *argv[]) {
    
    for (int i = 1; i < argc; i++)
    {
        printf("This argument at index number %d has a value of %s\n", i, argv[i]);
    }

    const char* sourceFilePath = "E:\\PITAM PAUL\\Documents\\movable.txt";
    const char* destinationFilePath = "E:\\PITAM PAUL\\Downloads\\movable.txt";

    int result = rename(sourceFilePath, destinationFilePath);
    if (result == 0) {
        printf("success.\n");
    } else {
        perror("");
        return 1;
    }

    return 0;
}
