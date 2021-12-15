// https://stackoverflow.com/questions/27482806/check-if-id-exists-in-a-collection-with-mongoose
// how to check if something exists in collection
const mongoose = require('mongoose');
const User = require("../models/user");
const router = require('express').Router();
// DONE: return list of users, process params.
// DONE: return list of tasks, process params.


// Creates a user
router.post('/', async function (req, res) {
    // return res.send({router:"users", route:req.route});
    const params = req.body;
    console.log("user POST params:", params);
    // console.log("json: " + JSON.parse(params));
    let message, data = null;
    // if(params.UserId == null){
    //     res.status(400);
    //     message = 'Missing userId';
    // }else{
    //     const newUser = new User(params);
    //     await newUser.save();
    //     res.status(201);
    //     message = 'New user created';
    //     console.log("Created user: ", newUser)
    //     data = newUser.toJSON();
    //     // update pending task documents
    //     // const tasks = newUser.get('pendingTasks');
    //     // // console.log(tasks);
    //     // tasks.forEach((task)=>{
    //     //     Task.findOneAndUpdate({_id: task}, { $set: {assignedUser: newUser.get('_id'), assignedUserName: newUser.get('name')}},
    //     //         {},(err, result)=>{
    //     //         if(err){
    //     //             res.status(500).json({message: 'An error occurred during database query', err:err});
    //     //         }
    //     //     });
    //     // });
    //
    // }
    const newUser = new User(params);
    await newUser.save();
    res.status(201);
    message = 'New user created';
    console.log("Created user: ", newUser)
    data = newUser.toJSON();
    let resObj = {message: message}; if(data){resObj.data = data};

    res.json(resObj);
});

router.post('/login', async function (req, res) {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    User.findOne({UserName: userName, UserPassword: userPassword}).exec((err, user) => {
        if (err) {
            // login failure
            console.log("Failure");
        } else if (!user) {
            res.status(500);
            res.json({
                login: false
            });
        } else {
            res.status(200);
            res.json({
                login: true,
                userID: user._id
            });
        }
    })
});

router.get('/:UserId', async function (req, res) {
    // return res.send({router:"users", route:req.route});
    const userId = req.params.UserId;
    let status = null, message = '', data = null;
    try{
        // data = await User.findOne({ UserId: userId });
        data = await User.findOne({ _id: userId });
        status = 200;
        message = 'OK';
        if (data == null){
            status = 404;
            message = 'Could not find a user with the id given';
        }
    } catch(err){
        status = 500;
        message = 'An error occurred during database query';
    }
    // await User.find({ UserId: userId } ,async (err,result)=>{
    //     if(err){
    //         if(err.name !== "CastError"){
    //             status = 500;
    //             message = 'An error occurred during database query';
    //             return res.status(status).send({message:message,err:err});
    //         }
    //     }
    //     if(result == null){
    //         status = 404;
    //         message = 'Could not find a user with the id given';
    //         return res.status(status).send({message:message});
    //     }
    //     status = 200;
    //     message = 'OK';
    //     data = result;
    // });

    res.status(status);
    let resObj = {message: message}; if(data){resObj.data = data};
    res.json(resObj);
});

module.exports = router;