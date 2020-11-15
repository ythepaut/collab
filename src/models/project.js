/**
 * @class Project
 *
 * @author      Yohann THEPAUT (ythepaut) <contact@ythepaut.com>
 * @license     GNU GPL v3.0
 */
class Project {

    /**
     * @constant
     * @type {string}
     */
    static TABLE_NAME = "project";


    /**
     * Project fabric by ID
     *
     * @param {string}      id              Project ID
     *
     * @return {Project}    Project selected
     */
    static fromId(id) {
        // TODO Select project from DB
        return new Project(undefined, undefined, null);
    }


    /**
     * Project constructor
     *
     * @param {string}      id              Unique project ID
     * @param {int}         owner           User ID of project owner, -1 if anonymous
     * @param {Date}        createdAt       Date when project was created
     */
    constructor(id, owner, createdAt) {
        this._id = id;
        this._owner = owner;
        this._createdAt = createdAt || new Date();
    }


    /**
     * Inserts project into database
     */
    create() {
        // TODO Insert project into DB
    }

    /**
     * Updates project properties to DB
     * @private
     */
    _update() {
        // TODO Update project from DB
    }


    set setOwner(owner) {
        this._owner = owner;
        this._update();
    }


    /**
     * Gets all files linked to project
     * @return {Array}      Array of file ID
     */
    get getFiles() {
        // TODO
        return [];
    }

    get getId() {
        return this._id;
    }

    get getOwner() {
        return this._owner;
    }

    get getCreatedAt() {
        return this._createdAt;
    }
}

module.exports = Project;