const Task = require("../models/taskModel");
const User = require("../models/userModel");
const router = require('express').Router();
const mongoose = require('mongoose');


// Returns a list of tasks.
router.get('/', function (req, res) {

    const params = req.query;
    console.log("GET params: ", params);
    // return res.send(params);
    /*
    *   where	filter results based on JSON query
        sort	specify the order in which to sort each specified field (1- ascending; -1 - descending)
        select	specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)
        skip	specify the number of results to skip in the result set; useful for pagination
        limit	specify the number of results to return (default should be 100 for tasks and unlimited for users)
        count	if set to true, return the count of documents that match the query (instead of the documents themselves)
    * */
    const query = Task.find();
    if(params.where){
        query.where(JSON.parse(params.where));
    }
    if(params.sort){
        query.sort(JSON.parse(params.sort));
    }
    if(params.select){
        query.select(JSON.parse(params.select));
    }
    if(params.skip){
        query.skip(JSON.parse(params.skip));
    }
    if(params.limit){
        query.limit(JSON.parse(params.limit));
    }
    if(params.count){
        query.countDocuments();
    }

    query.exec(function (err, result) {
        if (err) {
            res.status(500).json({message: 'An error occurred during database query', err: err});
        }
        // console.log(result);
        res.json({message:'OK', data: result});
    });

});

// Creates a task
router.post('/', async function (req, res) {
    // return res.send({router:"tasks", route:req.route});
    const params = req.body;
    let message, data = null;
    // asks cannot be created (or updated) without a name or a deadline.
    // All other fields that the user did not specify should be set to reasonable values.
    if(params.name == null || params.deadline == null){
        res.status(400);
        message = 'Missing task name or deadline';
    }else{
        const newTask = new Task(params);
        // if(newTask.get('assignedUser') != null && newTask.get('assignedUser') !=='' && newTask.get('assignedUserName') === 'unassigned') {
        //     const userFound = await User.findById(newTask.get('assignedUser'), (err, result) => {
        //         if (err) {
        //             if (err.name !== "CastError") {
        //                 message = 'An error occurred during database query';
        //                 return res.status(500).send({message: message, err: err});
        //             }
        //         }
        //     });
        //     if(userFound){
        //         newTask.set({'assignedUserName': userFound.get('name')});
        //     }
        // }
        //
        // if(!newTask.get('completed') && newTask.get('assignedUser') !== ''){
        //     User.findById(newTask.get('assignedUser'), (err, result) => {
        //         if (err) {
        //             if (err.name !== "CastError") {
        //                 message = 'An error occurred during database query';
        //                 return res.status(500).send({message: message, err: err});
        //             }
        //         }
        //         if(result){
        //             let pendingTasks = result.get('pendingTasks');
        //             // console.log(pendingTasks);
        //             pendingTasks.push(newTask.get('_id'));
        //             result.set({'pendingTasks': pendingTasks});
        //             result.save();
        //         }
        //     });
        // }

        await newTask.save();
        res.status(201);
        message = 'New task created';
        data = newTask.toJSON();
        // console.log(newTask);

        let resObj = {message: message}; if(data){resObj.data = data};

        res.json(resObj);
    }
});

router.get('/:id', async function (req, res) {
    // return res.send({router:"users", route:req.route});
    const taskId = mongoose.Types.ObjectId(req.params.id);
    let status = null, message = '', data = null;
    const taskFound = await Task.findById(taskId,(err,result)=>{
        if(err){
            if(err.name !== "CastError"){
                status = 500;
                message = 'An error occurred during database query';
                return res.status(status).send({message:message,err:err});
            }
        }
        if(result == null){
            status = 404;
            message = 'Could not find a task with the id given';
            return res.status(status).send({message:message});
        }
    });
    if(status == null){
        status = 200;
        message = 'OK';
        data = taskFound;
    }
    res.status(status);
    let resObj = {message: message}; if(data){resObj.data = data};
    res.send(resObj);
});

// Replaces a task with given id with another provided.
router.put('/:id', async function (req, res) {

    const taskId = mongoose.Types.ObjectId(req.params.id), params = req.body;
    let status = null, message = '', data = null, sent = false;
    const taskFound = await Task.findById(taskId,(err,result)=>{
        if(err){
            if(err.name !== "CastError"){
                status = 500;
                message = 'An error occurred during database query';
                sent = true;
                return res.status(status).send({message:message,err:err});
            }
        }
        if(result == null){
            status = 404;
            message = 'Could not find a task with the id given';
            sent = true;
            return res.status(status).send({message:message});
        }
    });

    // console.log('taskFound: ' + taskFound);
    if(sent){
        return;
    }

    if(params.name == null || params.deadline == null){
        res.status(400);
        message = 'Missing task name or deadline';
        // res.send({message:message});
    }else{

        await Task.findOneAndDelete({_id: taskId}, {}, (err,taskDeleted)=>{
            if(err){
                message = 'An error occurred during database query';
                return res.status(500).send({message:message});
            }

        });
        // console.log('taskDeleted: ' + taskDeleted);
        // if(!taskFound.get('completed')){
        //     const userAssigned = taskFound.get('assignedUser');
        //     if(userAssigned !== ''){
        //         User.findOne({_id: userAssigned},(err,userFound)=>{
        //             if(err){
        //                 message = 'An error occurred during database query';
        //                 return res.status(500).send({message:message});
        //             }
        //             let pendingTasks = userFound.get('pendingTasks');
        //             pendingTasks = pendingTasks.filter(item => item !== userFound.get('_id'));
        //             userFound.set({'pendingTasks': pendingTasks});
        //             userFound.save();
        //         });
        //     }
        // }
        //
        const newTask = new Task(params);
        newTask.set({'_id': taskId});
        // if(newTask.get('assignedUser') != null && newTask.get('assignedUserName') === 'unassigned') {
        //     const userFound = await User.findById(newTask.get('assignedUser'), (err, result) => {
        //         if (err) {
        //             if (err.name !== "CastError") {
        //                 message = 'An error occurred during database query';
        //                 return res.status(500).send({message: message, err: err});
        //             }
        //         }
        //     });
        //
        //     if(userFound){
        //         newTask.set({'assignedUserName': userFound.get('name')});
        //     }
        // }
        //
        // if(!newTask.get('completed')){
        //     const userFound = User.findById(newTask.get('assignedUser'), (err, result) => {
        //         if (err) {
        //             if (err.name !== "CastError") {
        //                 message = 'An error occurred during database query';
        //                 return res.status(500).send({message: message, err: err});
        //             }
        //         }
        //         if(result){
        //             let pendingTasks = result.get('pendingTasks');
        //             pendingTasks.push(newTask.get('_id'));
        //             result.set({'pendingTasks': pendingTasks});
        //             result.save();
        //         }
        //     });
        // }

        await newTask.save();
        res.status(200);
        message = 'Task replaced';
        data = newTask.toJSON();

    }
    let resObj = {message: message}; if(data){resObj.data = data};
    res.json(resObj);
});

router.delete('/:id', async function (req, res) {

    const taskId = mongoose.Types.ObjectId(req.params.id), params = req.query;
    let message = '';
    Task.findOneAndDelete({_id: taskId},async (err,taskFound)=>{
        if(err){
            message = 'An error occurred during database query';
            return res.status(500).send({message:message});
        }
        if(taskFound == null){
            message = 'Could not find a task with the id given';
            return res.status(404).send({message:message});
        }
        // if(!taskFound.get('completed')){
        //     const userAssigned = taskFound.get('assignedUser');
        //     // console.log("Assigned user: " + userAssigned);
        //     if(userAssigned !== ''){
        //         const userFound = await User.findOne({_id: userAssigned},(err,userFound)=>{
        //             if(err){
        //                 message = 'An error occurred during database query';
        //                 return res.status(500).send({message:message});
        //             }
        //
        //         });
        //         let pendingTasks = userFound.get('pendingTasks');
        //         pendingTasks = pendingTasks.filter(item => item !== userFound.get('_id'));
        //         userFound.set({pendingTasks: pendingTasks});
        //         userFound.save();
        //     }
        // }
        message = 'Task deleted';
        return res.status(200).send({message:message, data:taskFound});
    });


});

module.exports = router;