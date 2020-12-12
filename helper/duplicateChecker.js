/**
 * A duplicate checker
 * @param {object} inputObject input object to be processed
 * @param {object} checkerObject object to check the input
 * 
 * @return {object} return unique values from inputObject
 */
function removeDuplicate(inputObj, checkerObj) {
    Object.keys(inputObj).map(function (key) {
        if (inputObj[key] == checkerObj[key]) {
            delete inputObj[key]
        }
    })
    return inputObj
}

module.exports = removeDuplicate