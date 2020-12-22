const usersSchema = {
    "description": "user registration validation",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 25
        },
        "email": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
        },
        "password": {
            "type": "string",
            "pattern": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$"
        },
        "mobileNumber": {
            "type": "string",
            "pattern": "^\\+62[0-9]{9,15}$"
        }
    }
}


module.exports = usersSchema