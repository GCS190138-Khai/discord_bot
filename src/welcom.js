  const welcomRoom = (mess) =>{
    const emID=  mess.guild.emojis.cache.find(e=> e.name==='regional_indicator_e').id
    console.log(mess.guild.emojis.cache.find(e=> e.name==='regional_indicator_e'))
    const emoji = client.emojis.cache.get(emID);
  return  mess.guild.channels.cache.find(e=>e.name==='welcome').send({embed: {
      color: 3447003,
      title: "**BANH BAO CUTE** Welcome Bot!",
       
      description: "Welcome *"  + "* to the **Banh Bao** discord server!" + ` <:emoji ${emoji.name}:emoji ${emID}>  ` ,
      fields: [{
          name: "Information",
          value: "Some info on the server"
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© NAME OF SERVER 2018 - 2019"
      },
      attachFiles:['https://images-ext-2.discordapp.net/external/j4VBa4dEywYFpaYw1rGovuxZEiQP8Fa3ga1ZXt_j47w/https/media.tenor.com/PqTmhDmL_QsAAAPo/lycoris-recoil-kick.mp4']
      }}); 
}



module.exports={
  welcomRoom

}