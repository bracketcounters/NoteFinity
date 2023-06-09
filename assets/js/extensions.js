const extensionModes = {
  "as": "actionscript",
  "ada": "ada",
  "conf": "apache_conf",
  "apex": "apex",
  "applescript": "applescript",
  "adoc": "asciidoc",
  "asciidoc": "asciidoc",
  "asm": "assembly_x86",
  "ahk": "autohotkey",
  "bat": "batchfile",
  "c": "c_cpp",
  "cpp": "c_cpp",
  "clojure": "clojure",
  "clj": "clojure",
  "cljs": "clojure",
  "cljc": "clojure",
  "cmd": "batchfile",
  "cobol": "cobol",
  "cob": "cobol",
  "cbl": "cobol",
  "cpy": "cobol",
  "coffee": "coffee",
  "cf": "coldfusion",
  "cs": "csharp",
  "css": "css",
  "csv": "text",
  "dart": "dart",
  "diff": "diff",
  "django": "django",
  "jinja": "django",
  "jinja2": "django",
  "dockerfile": "dockerfile",
  "dot": "dot",
  "ex": "elixir",
  "elm": "elm",
  "erlang": "erlang",
  "erl": "erlang",
  "hrl": "erlang",
  "fs": "fsharp",
  "fortran": "fortran",
  "f": "fortran",
  "for": "fortran",
  "f90": "fortran",
  "f95": "fortran",
  "f03": "fortran",
  "f08": "fortran",
  "feature": "gherkin",
  "gitignore": "gitignore",
  "glsl": "glsl",
  "frag": "glsl",
  "vert": "glsl",
  "go": "golang",
  "groovy": "groovy",
  "gradle": "groovy",
  "haml": "haml",
  "handlebars": "handlebars",
  "hbs": "handlebars",
  "haskell": "haskell",
  "hs": "haskell",
  "lhs": "haskell",
  "h": "c_cpp",
  "haxe": "haxe",
  "hx": "haxe",
  "html": "html",
  "ini": "ini",
  "jade": "jade",
  "java": "java",
  "js": "javascript",
  "json": "json",
  "jsx": "jsx",
  "julia": "julia",
  "jl": "julia",
  "kt": "kotlin",
  "kts": "kotlin",
  "tex": "latex",
  "less": "less",
  "liquid": "liquid",
  "lisp": "lisp",
  "lsp": "lisp",
  "cl": "lisp",
  "fasl": "lisp",
  "ls": "livescript",
  "lua": "lua",
  "lucene": "lucene",
  "makefile": "makefile",
  "mk": "makefile",
  "make": "makefile",
  "md": "markdown",
  "matlab": "matlab",
  "mc": "mushcode",
  "mysql": "mysql",
  "nix": "nix",
  "objc": "objectivec",
  "m": "objectivec",
  "objcpp": "objectivec",
  "mm": "objectivec",
  "ocaml": "ocaml",
  "ml": "ocaml",
  "mli": "ocaml",
  "pascal": "pascal",
  "perl":"perl",
  "pgsql": "pgsql",
  "php": "php",
  "powershell": "powershell",
  "praat": "praat",
  "prolog": "prolog",
  "properties": "properties",
  "protobuf": "protobuf",
  "ps1": "powershell",
  "psm1": "powershell",
  "py": "python",
  "r": "r",
  "rb": "ruby",
  "rs": "rust",
  "scss": "scss",
  "sql": "sql",
  "sass": "sass",
  "scala": "scala",
  "scheme": "scheme",
  "scm": "scheme",
  "sh": "sh",
  "smarty": "smarty",
  "snippets": "snippets",
  "styl": "stylus",
  "svg": "svg",
  "swift": "swift",
  "tcl": "tcl",
  "text": "text",
  "txt": "text",
  "textile": "textile",
  "toml": "toml",
  "tsx": "typescript",
  "twig": "twig",
  "ts": "typescript",
  "vala": "vala",
  "vb": "vbscript",
  "vbs": "vbscript",
  "velocity": "velocity",
  "vm": "velocity",
  "vtl": "velocity",
  "verilog": "verilog",
  "v": "verilog",
  "vh": "verilog",
  "sv": "verilog",
  "xml": "xml",
  "yaml": "yaml"
  };

  const supportedExtensions = [ "txt", "html", "htm", "shtml", "xhtml", "xml", "json", "md", "markdown", "yaml", "yml", "csv", "tsv", "sql", "php", "rb", "java", "py", "pl", "swift", "kt", "dart", "c", "h", "cpp", "cc", "cxx", "h", "hh", "hpp", "hxx", "cs", "fs", "fsi", "fsx", "go", "rs", "scala", "lua", "m", "mm", "perl", "sh", "bash", "zsh", "fish", "ps1", "psm1", "psd1", "tex", "log", "cfg", "ini", "conf", "plist", "bat", "cmd", "js", "css", "npmignore", "gitignore", "svg"];