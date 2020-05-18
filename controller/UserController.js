var User = require('../model/User')

exports.getAllCreators = async (req, res) => {
    var user = User.find()
    return user
}

// Login function requires username and password.
exports.Login = async (req, res) => {
   try {
    var username = req.body.username
    var password = req.body.password

    var user = User.find({
        $and: [
            {'username': username, 'password': password}
        ]
    })
    return user  
   } catch (error) {
       console.log(error)
   }
}

exports.Signup = async (req,res) => {
    try {
        var check = User.find({'email': req.body.email})
        if ((await check).length === 0) {
            const user = new User(req.body)
            return user.save()
        } else {
            return {"message": "User's email exist"}
        }
    } catch(err) {
        console.log(err)
    }
}

exports.findUsername = async (req, res) => {
    try {
        var check = User.find({'username': req.body.username})
        if ((await check).length === 0) {
            return 'Username is available'
        } else {
            return 'Username exists...'
        }
    } catch (error) {
        console.log(error)
    }
}

exports.updateProfile = async(req, res) => {
    try {
        const id = req.params.id
        const users = req.body
        const { ...updateData } = users
        const update = await User.findByIdAndUpdate(id, updateData, { new: true })
        return update
    } catch(err){
        console.log(error)
    }
}

