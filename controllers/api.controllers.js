const {selectTopics} = require('../models/topics.models')


console.log('in the controller')

    




exports.getTopics= (req,res)=>{

    selectTopics().then((topics)=>{

        
console.log("Topics are: ", topics);
res.status(200).send({ topics: topics })

    })

}