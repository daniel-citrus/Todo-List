export let ItemSet = (...items) => {
    let storage = new Set();

    items.forEach(item => {
        storage.add(item);
    })

    function insert(item) {
        storage.add(item);
    }

    
    function remove(item) {
        return storage.delete(item);
    }

    function search(item) {
        return storage.has(item);
    }

    return {
        insert,
        remove,
        search,
    }
}
