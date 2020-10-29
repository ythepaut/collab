let editor;
let textAreaEditor;
let socket;

// TODO remove temp vars
let lock = false;
let collabContent = {
    text : ""
}


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

    socket = io();


    // editor listener
    editor.on("change", () => {
        if (!lock) {
            socket.emit("update", {text : editor.getValue()});
        }
    });
    //TODO correct cursor column

    // debug message
    socket.on("debug", (message) => {
        console.log(message);
    });

    // new change received from collaborator
    socket.on("update", (data) => {
        collabContent.text = data.text;
        lock = true;
        editor.setValue(data.text);
        lock = false;
    });

    // sync on connect
    socket.on("sync", (data) => {
        collabContent.text = data.text;
        editor.setValue(data.text);
    });

});

