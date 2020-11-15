/**
 * @class File
 *
 * @author      Yohann THEPAUT (ythepaut) <contact@ythepaut.com>
 * @license     GNU GPL v3.0
 */
class File {

    /**
     * @constant
     * @type {string}
     */
    static TABLE_NAME = "file";


    /**
     * File fabric by ID
     *
     * @param {int}         id              File ID
     *
     * @return {File}       File selected
     */
    static fromId(id) {
        // TODO Select file from DB
        return new File(undefined, undefined, undefined);
    }


    /**
     * File constructor
     *
     * @param {int}         id              Unique file ID
     * @param {string}      project         Project ID linked to file
     * @param {string}      body            File content
     */
    constructor(id, project, body) {
        this._id = id;
        this._project = project;
        this._body = body;
    }


    /**
     * Inserts file into database
     */
    create() {
        // TODO Insert file into DB
    }

    /**
     * Updates file properties to DB
     * @private
     */
    _update() {
        // TODO Update file from DB
    }


    set setBody(body) {
        this._body = body;
        this._update();
    }


    get getId() {
        return this._id;
    }

    get getProject() {
        return this._project;
    }

    get getBody() {
        return this._body;
    }

}

module.exports = File;