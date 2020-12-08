module.exports = function searchArrayOfObjects(searchParameter, Array) {
    for (var i = 0; i < Array.length; i++) {
        if (Object.values(Array[i]).some(e => e === searchParameter)) {
            return Array[i];
        }
    }
    return 0
}