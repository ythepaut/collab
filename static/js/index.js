// codemirror setup
window.addEventListener("load", (event) => {

    let editor = CodeMirror.fromTextArea(document.querySelector(".editor > textarea"), {
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
});


// TODO socket io communication