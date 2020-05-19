const boom = require('boom')

const User = require('../models/User')


// Add a new user
exports.signup = async (req, reply) => {
    try {
        let check = User.find({'email': req.body.email})
        if ((await check).length === 0) {
            const user = new User(req.body)
            return user.save()
        } else {
            return {"message": "User's email exist"}
        }
    } catch (err) {
      throw boom.boomify(err)
    }
}

exports.getAll = async(req, reply) => {
    try {
        let users = User.find()
        return users
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.login = async (req, reply) => {
    try {
        let username = req.body.username
        let password = req.body.password
        const users = User.find({
            $and: [
                {'username': username, 'password': password}
            ]
        })
        return users
    } catch(err) {
        throw boom.boomify(err)
    }
}

exports.findMyProfile = async (req, reply) => {
    try {
        let username = req.body.username
        let user = User.find({'username': username})
        return user
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.updateUser = async (req, reply) => {
    try {
      const id = req.params.id
      const users = req.body
      const { ...updateData } = users
      const update = await User.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
}