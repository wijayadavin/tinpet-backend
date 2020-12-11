const exec = require('child_process').exec
module.exports = function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error)
                reject({ error, stderr })
            else
                resolve({ stdout })
        })
    })
}