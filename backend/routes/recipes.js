const Recipe = require("../models/recipe");
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require("../models/user");


// Returns a list of tasks.
router.get('/', function (req, res) {

    const params = req.query;
    console.log("GET params: ", params);
    // return res.send(params);
    /*
    *   contains filter results with names containing search key
        where	filter results based on JSON query
        sort	specify the order in which to sort each specified field (1- ascending; -1 - descending)
        select	specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)
        skip	specify the number of results to skip in the result set; useful for pagination
        limit	specify the number of results to return (default should be 100 for tasks and unlimited for users)
        count	if set to true, return the count of documents that match the query (instead of the documents themselves)
    * */
    const query = Recipe.find();

    if(params.contains){
        query.find({RecipeName : { $regex: new RegExp(`${params.contains}`, 'i')}})
    }
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

// Creates a recipe
router.post('/', async function (req, res) {
    // return res.send({router:"tasks", route:req.route});
    const params = req.body;
    console.log("recipe POST params:", params);
    let message, data = null;
    // asks cannot be created (or updated) without a name or a deadline.
    // All other fields that the user did not specify should be set to reasonable values.
    if(params.RecipeID == null){
        res.status(400);
        message = 'Missing recipe ID';
    }else{
        const newRecipe = new Recipe(params);

        await newRecipe.save();
        res.status(201);
        message = 'New recipe created';
        data = newRecipe.toJSON();
        // console.log(newTask);

    }
    let resObj = {message: message}; if(data){resObj.data = data};

    res.json(resObj);
});

router.get('/:RecipeID', async function (req, res) {
    // return res.send({router:"users", route:req.route});
    const recipeID = req.params.RecipeID;
    let status = null, message = '', data = null;
    // const recipeFound = await Recipe.findById(recipeID,(err,result)=>{
    //     if(err){
    //         if(err.name !== "CastError"){
    //             status = 500;
    //             message = 'An error occurred during database query';
    //             return res.status(status).send({message:message,err:err});
    //         }
    //     }
    //     if(result == null){
    //         status = 404;
    //         message = 'Could not find a task with the id given';
    //         return res.status(status).send({message:message});
    //     }
    // });
    // if(status == null){
    //     status = 200;
    //     message = 'OK';
    //     data = taskFound;
    // }

    try{
        data = await Recipe.findOne({ RecipeID: recipeID });
        status = 200;
        message = 'OK';
        if (data == null){
            status = 404;
            message = 'Could not find a recipe with the id given';
        }
    } catch(err){
        status = 500;
        message = 'An error occurred during database query';
    }

    res.status(status);
    let resObj = {message: message}; if(data){resObj.data = data};
    res.send(resObj);
});

// Replaces a task with given id with another provided.
router.put('/:RecipeID', async function (req, res) {

    const recipeID = req.params.RecipeID, params = req.body;
    let status = null, message = '', data = null, sent = false;

    try{
        data = await Recipe.find({ RecipeID: recipeID });
        message = 'OK';
        if (data == null){
            status = 404;
            message = 'Could not find a recipe with the id given';
        }
    } catch(err){
        status = 500;
        message = 'An error occurred during database query';
    }

    if(status == null){
        if(params.RecipeID == null){
            status = 400;
            message = 'Missing recipe ID';
            // res.send({message:message});
        }else{
            try{
                await Recipe.findOneAndDelete({ RecipeID: recipeID})
            } catch(err){
                status = 500;
                message = 'An error occurred during database query';
            }
            if(status == null){
                const newRecipe = new Recipe(params);
                await newRecipe.save();
                status = 200;
                message = 'Task replaced';
                data = newRecipe.toJSON();
            }

        }
    }
    res.status(status);
    let resObj = {message: message}; if(data){resObj.data = data};
    res.json(resObj);
});

router.delete('/:RecipeID', async function (req, res) {

    const recipeId = req.params.RecipeID, params = req.query;
    let message = '';
    Recipe.findOneAndDelete({RecipeID: recipeId},async (err,recipeFound)=>{
        if(err){
            message = 'An error occurred during database query';
            return res.status(500).send({message:message});
        }
        if(recipeFound == null){
            message = 'Could not find a recipe with the id given';
            return res.status(404).send({message:message});
        }
        message = 'Recipe deleted';
        return res.status(200).send({message:message, data:recipeFound});
    });


});

module.exports = router;