require('dotenv').config();
const { Client} = require('discord.js')
const mongoose = require('mongoose');
const { create, denyMess,botCommand, starting, ok, fail, success } = require('./command');
const { checkCommand } = require('./controller');
const { QuestionModel } = require('./message');
const { welcomRoom } = require('./welcom');

const lord= "Bánh Bao#2507"
const client = new Client();
client.login("MTA0OTY4MDMyNDMwMjQ4MzUxOA.GEXGja.OPZ_O-F-bXS_xJhW6XKKY8l-RX8P9bjzx6aeEE")


mongoose.connect('mongodb+srv://banhbao:123@cluster0.bkfpzbu.mongodb.net/?retryWrites=true&w=majority', {
 
  
})
  .then(() => console.log('Connected!'));

client.on('ready',()=>{
  console.log(`${client.user.username} has in !`)
})
client.on('guildMemberAdd', mess => {
  const emID=  mess.guild.emojis.cache.find(e=> e.name==='regional_indicator_e').id
  const emoji = client.emojis.cache.get(emID);
  mess.guild.channels.cache.find(e=>e.name==='welcome').send({embed: {
    color: 3447003,
    title: "**BANH BAO CUTE** Welcome Bot!",
     
    description: "Welcome *" + mess.user.username + "* to the **Banh Bao** discord server!" + ` <:emoji ${emoji.name}:emoji ${emID}>  ` ,
    fields: [{
        name: "Information",
        value: "Some info on the server"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© NAME OF SERVER 2018 - 2019"
    },
 
    }}); 
});
client.on('message', async (mess)=>{
  if(mess.author.bot) return;
  console.log(mess.guild.emojis.cache.find(e=> e.name==='INTSL_KMS_Froge'))
  if(mess.guild.channels.cache.find(e=>e.name==='welcome')){
    
    const emID=  mess.guild.emojis.cache.find(e=> e.name==='INTSL_KMS_Froge').id
 
    const emoji = client.emojis.cache.get(emID);
  return  mess.guild.channels.cache.find(e=>e.name==='welcome').send({embed: {
      color: 3447003,
      title: "**BANH BAO CUTE** Welcome Bot!",
       
      description: "Welcome *"  + "* to the **Banh Bao** discord server!"  ,
      fields: [{
          name: "Information",
          value: "Some info on the server"
        }
      ],
      thumbnail: {
        url: 'https://cdn.discordapp.com/emojis/1050111225503170600.webp?size=128&quality=lossless',
      },
      image:{
        url:"https://cdn.discordapp.com/emojis/1050111315152207952.webp?size=128&quality=lossless"
      },
      timestamp: new Date(),
      footer: {
        icon_url: mess.author.avatarURL(),
        text: "© NAME OF SERVER 2018 - 2019"
      },
      
      }}); 
  }
 
  if(mess.author.bot) return;
  const command = mess.content.split(':')
  if(command[0]=== create){

    if(mess.author.tag!==lord){
        mess.reply(denyMess)
        return
    }
    mess.reply(starting)
   const res = await  checkCommand(command[1])
 
      if(res.status === ok){
        mess.reply(`${success} :"${res.quest}" || câu trả lời: "${res.ans}"`)

      }else{
       mess.reply(`${fail}-${res?.error}`)
      }

  }

 


   
 
    
  
  if(mess.content==="!BanhBao, create"){
    mess.reply("Banh Bao đang tạo ticket.")
 

    try {
     
      mess.guild.channels.create(  `${mess.author.username }'s room`,{
        type:"GUILD_TEXT",
        parent:  mess.channel.parentID,
        position: 1,
        permissionOverwrites: [{
            id:mess.author.id,
            allow: ["SEND_MESSAGES"]
        }]
    })
      mess.reply("Banh Bao đã tạo xong.")
    } catch (error) {
       console.log(error)
      mess.reply("Đã có lỗi xảy ra! huhu")
      return
    }

  }
  console.log(`[${mess.author.username}]: ${mess.cleanContent}`)

  if(mess.content==="Chị Bánh Bao có cute không ?"){
    mess.reply("Có, hihhihhi")
    return
  }
  const res = await QuestionModel.aggregate([
    {
      $search: {
        "text":{
                          "query": `${mess.content}`,
                          "path":"question",
                      
                      }
      }
    }
  ])
  if(res.length!==0){
    let randomL = createRand(res.length)
    mess.reply(res[randomL].ans)
    return
  } 
  const res2 = await QuestionModel.find()
  let randomL = createRand(res2.length)
  return mess.reply(res2[randomL].ans)


})


 const  createRand = (length) =>{
  let rand = Math.floor(Math.random() * 100)
  if(rand > length) return createRand(length)
  return rand
 }