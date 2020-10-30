let editor;
let textAreaEditor;
let socket;


// codemirror setup
window.addEventListener("load", () => {

    textAreaEditor = document.querySelector(".editor > textarea");

    editor = CodeMirror.fromTextArea(textAreaEditor, {
        lineNumbers: true,
        viewportMargin: Infinity,
        theme: "dracula",
        mode: "clike",
        lineSeparator: "LF",
        indentUnit: 4,
        smartIndent: true,
        indentWithTabs: false,
        tabSize: 4,
        showCursorWhenSelecting: true,
        autofocus: true
    });

    editor.setOption("extraKeys", {
        Tab: (cm) => {
            if (cm.doc.somethingSelected()) {
                return CodeMirror.Pass;
            }
            const spacesPerTab = cm.getOption("indentUnit");
            const spacesToInsert = spacesPerTab - (cm.doc.getCursor("start").ch % spacesPerTab);
            const spaces = Array(spacesToInsert + 1).join(" ");
            cm.replaceSelection(spaces, "end", "+input");
        }
    });



    // socket io

    socket = io.connect();


    // editor listener
    editor.on("change", (i, op) => {
        socket.emit("update", op);
        socket.emit("resync", editor.getValue());
    });


    // socket listeners

    // debug message
    socket.on("debug", (message) => {
        console.log(message);
    });

    // new change received from collaborator
    socket.on("update", (data) => {
        editor.replaceRange(data.text, data.from, data.to);
    });

    // sync editor value
    socket.on("sync", (data) => {
        editor.setValue(data.body);
    });

});
