const searchArrayOfObjects = require("../searchArrayOfObjects")

/**
 * 
 * @param {object} labels labels object
 * @param {'Dog'|'Cat'} type dog or cat
 * 
 * @return {string} predicted breed name
 */
function petBreedHelper(labels, type) {
    const maxConfidence = Math.max.apply(
        Math,
        labels.filter((label) => {
            return label.Parents.some(p => p.Name === type)
        })
            .map((filteredLabel) => {
                return [filteredLabel.Confidence]
            })
    )
    const predictedBreed = searchArrayOfObjects(maxConfidence, labels)
    return predictedBreed.Name
}

module.exports = petBreedHelper