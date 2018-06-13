// om namah shivay

const debug = require('@google-cloud/debug-agent').start({ allowExpressions: true });

let debugInitialized;
let functionCompleted;
let responseJSON;

const main = (req, res) => {
    
    // always initialize global let variables in the gcf entry point function
    // because gcf often recycles the execution environment of a previous invocation
    debugInitialized = false;
    functionCompleted = false;
    responseJSON = {};
    
    debug.isReady().then(() => {

        debugInitialized = true;

        if (functionCompleted) {
            console.log('terminating function');
            res.json(responseJSON);  
        }

    }); 

    if (req.query) {
        responseJSON.param1 = req.query.param1;
        responseJSON.param2 = req.query.param2;
    }
    
    functionCompleted = true;
    
    if (debugInitialized) {
        console.log('terminating function');
        res.json(responseJSON);
    }

};

module.exports = {
    main
};
