#include <stdio.h>


int main() {
    const char* sourcePath = "C:\\Users\\pptec\\AppData\\Local\\Temp\\NoteFinity\\resources\\updates.txt";
    const char* destinationPath = "E:\\Codes\\NodeJs\\NoteFinity\\app.asar";

    if (rename(sourcePath, destinationPath) == 0) {
        printf("File moved successfully.\n");
    } else {
        perror("Error moving file");
    }

    return 0;
}
