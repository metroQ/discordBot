const Discord = module.require("discord.js")

const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "points"
});

module.exports.run = async (bot, message, args) => {

    let level0 = message.guild.roles.find(r => r.name === "Level 0");
    let level1 = message.guild.roles.find(r => r.name === "Level 1");
    let level2 = message.guild.roles.find(r => r.name === "Level 2");
    let level3 = message.guild.roles.find(r => r.name === "Level 3");
    let level4 = message.guild.roles.find(r => r.name === "Level 4");
    let level5 = message.guild.roles.find(r => r.name === "Level 5");
    
    let toPromote = message.author;

    if(message.member.roles.has(level0.id)){ //level 0
        console.log(toPromote.id);
        //console.log(con.query("SELECT * FROM points WHERE id = 155478460620341248"));
        con.query(`SELECT * FROM points WHERE id = '${toPromote.id}'`, (err, rows) =>{ //get points from database
        if(err) throw err;

        let sql;
   
        if(rows.length > 1) { //Has points
             //previous points found
            let points = rows[0].points;
            if(points > 100){ //has more than 100 points
                sql  = `UPDATE points SET points = ${points - 100} WHERE id = '${toPromote.id}'`; //subtract 100 points
                toPromote.removeRole(level0.id); //change their roles
                toPromote.addRole(level1.id); //change their roles
                con.query(sql, console.log);
            }

            
        }
        
    });

       
    }else if(message.member.roles.find("Level 2")){ //level 1

    }else if(message.member.roles.find("Level 3")){ //level 2

    }else if(message.member.roles.find("Level 4")){ //level 3

    }else if(message.member.roles.find("Level 5")){ //level 4

    }else{ //no level role, assign them one


        if(!level0) {
            try{
                role = await message.guild.createRole({
                    name: "Level 0",
                    color: "#000000",
                    permission: []
                });
            } catch(e) {
                console.log(e.stack);
            }
        }

        toPromote.addRole(level0);
    }
};
       

module.exports.help = {
    name: "rankup"
}