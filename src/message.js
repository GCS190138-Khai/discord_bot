const  mongoose = require("mongoose");


const schema = new mongoose.Schema({
  question:{
    type:String,
    require:true
  },
  ans:{
    type:String,
    require:true
  }

},{timestamps:true})
 const QuestionModel = mongoose.model("Question",schema)


module.exports={
  QuestionModel
}