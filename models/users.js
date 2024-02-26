const fs = require('fs')


const getAllUsers = () => {
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))
    return users
}


const registration = (data) => {
    let users = getAllUsers();
    users.push(data)
    fs.writeFileSync('./users.json', JSON.stringify(users))
}

module.exports = { getAllUsers, registration};