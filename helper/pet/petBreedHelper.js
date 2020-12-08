const searchArrayOfObjects = require("../searchArrayOfObjects")


/**
 * 
 * @param {object} labels labels object
 * @param {'Dog'|'Cat'} type dog or cat
 * 
 * @return {string} predicted breed name
 */
function petBreedHelper(labels, type) {
    const filteredByType = labels.filter((label) => {
        return label.Parents.some(p => p.Name === type)
    })
    const filteredConfidenceLevel = filteredByType.map((filteredLabel) => {
        return [filteredLabel.Confidence]
    })
    const maxConfidence = Math.max.apply(
        Math,
        filteredConfidenceLevel
    )
    const predictedBreed = searchArrayOfObjects(maxConfidence, filteredByType)
    if (!predictedBreed) {
        return null
    }
    return predictedBreed.Name
}


module.exports = petBreedHelper
