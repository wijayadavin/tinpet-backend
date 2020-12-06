/**
 * 
 * @param {object} labels predicted labels object
 * 
 * @return {'cat' | 'dog'} predicted result is cat or dog
 */
function isCatHelper(labels) {
    const catCount = labels.filter((label) => { return label.Parents.some((parent) => parent.Name == 'Cat') }).length
    const dogCount = labels.filter((label) => { return label.Parents.some((parent) => parent.Name == 'Dog') }).length
    if (catCount > dogCount) {
        return 1
    }
    else {
        return 0
    }
}
module.exports = isCatHelper