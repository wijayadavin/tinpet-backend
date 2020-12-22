var path = require('path');


/**
 * Get script name of your current .js file
 * Usage example:
 * 
 *      const fileName = scriptNameHelper(__filename)
 * 
 * @param {any} __filename __filename data of your current .js file 
 */
function scriptNameHelper(__filename) {
    return path.basename(__filename)
}

module.exports = scriptNameHelper