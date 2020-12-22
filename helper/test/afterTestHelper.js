const scriptNameHelper = require("../scriptNameHelper")

/**
 * A helper to announce if the temp data has fully cleaned or not
 * Usage:
 * 
 *      afterTestHelper(createdId, __filename)
 * 
 * @param {object} createdId the object consisting of the created id and its tableName
 * @return {any} log message `${fileName} Test Completed!` if succeded, or log the undeleted data if failed
 */
function afterTestHelper(createdId, __filename) {
    if (Object.values(createdId).flat().length === 0)
        console.log(`${scriptNameHelper(__filename).split('.')[0]} test completed & all testing data have successfully cleaned!`)
    else {
        console.log({
            message: 'Test completed, but some temporary data cannot be deleted',
            undeletedData: createdId
        })
        Object.values(createdId).flat().length.should.eq(0)
    }
}


module.exports = afterTestHelper