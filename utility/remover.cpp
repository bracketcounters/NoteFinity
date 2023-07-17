#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

void deleteFolderRecursive(const fs::path& path) {
    for (const auto& entry : fs::directory_iterator(path)) {
        const auto& entryPath = entry.path();

        if (fs::is_directory(entryPath)) {
            deleteFolderRecursive(entryPath);
        }
        else {
            fs::remove(entryPath);
        }
    }

    fs::remove(path);
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cout << "false";
        return 1;
    }
    const fs::path folderPath = argv[1];

    deleteFolderRecursive(folderPath);

    std::cout << "true";

    return 0;
}
