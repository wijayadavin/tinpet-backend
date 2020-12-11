/**
 * A duplicate checker
 * @param {object} inputArray 
 * @param {object} checkerArray 
 * 
 * @return {object} return {uniqueList, duplicates, noRepetition}
 */
function duplicateChecker(inputArray, checkerArray) {
    if (typeof inputArray !== 'array') {
        inputArray = [inputArray]
    }
    if (typeof checkerArray !== 'array') {
        checkerArray = [checkerArray]
    }
    const ObjectOfObjects = inputArray.reduce(
        (acc, o) => {
            acc[o.value] = o;
            return acc;
        }, {})

    const selectinputArrayObject = checkerArray.reduce(
        (acc, o) => {
            if (ObjectOfObjects[o.value]) {
                acc.duplicates.push(o)
                return acc;
            }
            else {
                acc.objectWithoutDuplicates.push(o)
            }
            acc.uniqueList[o.value] = o;
            return acc;
        }, { uniqueList: {}, objectWithoutDuplicates: [], duplicates: [] })


    return {
        uniqueList: Object.values(selectinputArrayObject.uniqueList = {
            ...selectinputArrayObject.uniqueList,
            ...ObjectOfObjects
        }),
        duplicates: selectinputArrayObject.duplicates,
        noRepetition: selectinputArrayObject.objectWithoutDuplicates
    }
}

module.exports = duplicateChecker