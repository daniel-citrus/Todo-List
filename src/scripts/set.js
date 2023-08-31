export default class Set {
    constructor() {
        this.storage = new Map();
    }
}

Set.prototype.insert = function (key, item) {
    this.storage.set(key, item);
}

Set.prototype.contains = function (key) {
    return this.storage.has(key);
}

Set.prototype.remove = function (key) {
    return this.storage.delete(key);
}
