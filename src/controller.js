const { ok, er } = require("./command")
const { QuestionModel } = require("./message")

const checkCommand = async (command)=>{
    try {
        const instance = command.split('|')
    
      return  await createMess(instance)
    } catch (error) {
      console.log(error)
      return
    }

}
const createMess= async (body)=>{

try {

  const res  = await new QuestionModel({question:body[0],ans:body[1]})
    await res.save()
    return { status:ok,quest:body[0],ans:body[1]}
} catch (error) {
  console.log(error)
  return { status:er,error:error}
}

}



module.exports={
createMess,
checkCommand
}