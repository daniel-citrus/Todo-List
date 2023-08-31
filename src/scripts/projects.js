export default class Project extends Map {
    constructor(name) {
        super();
        this.name = name;
        this.storage = new Map();
    }
}