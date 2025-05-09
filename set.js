const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lHdE5vUHFTSjlZN3dtYXA5RG95YnZad2owcDZFcTBlV0k0ZEdQaXdWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnVTTzN1UEhVYVZlZWxhbllmMGh3YnlVSTd0YnRlRDltbldjTmc1eTQxaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RE5LcXI0a1RyelBxekwrT01CNW4wUmRRdjl1eXFPOS8wanc0L0ZaSVVrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQkFMZE5XanlkdndMdkdpVFhJcjFqSE8vUDlUOTQ5UEZvOGxYdXE5QmpvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlMMjc1eEdCd0tTU1dFNk0xQ2ppRk1wb1FXaUdLVm9EQnF0WVRiOEZzV2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRobUl1WlBtRExlV2RadVBmMUdNR1VUME5ibUd4Vm1BbmkxaGtlSmZHMUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVNQkF4TFdhbDNUWmZUUlFvLzlIUisyQm1hWDZWeWE3VDBza1JWdThFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkJwcjd3UktWU25yZ3NVcDRETzBRL1YzQ3hUd3FzM1RYUklBZ3lVSy9rbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9lb0VuM3VFRTFGZGRDSngrYmUxTDBjUTUvN2swWU9UWDNLNkw4TWlFVklhZXNMVVVxS3JCNTdhVzV6OTJLdzZnZnRXSDdtSlJ4WU1KYnhLMGhUMGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI0LCJhZHZTZWNyZXRLZXkiOiJMcFVQYmxTMDNCTWg4dTBZRnFOSE1aZTloM0szWEVvcmtuR1FwTEdQeWdjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyN0JuVmdHdFRIaTlsYWxCTURySy1BIiwicGhvbmVJZCI6ImQyZjUyN2Q1LTY2MDktNGQ0Yy1hOGY2LTE1ZmMxZDc1YTIxNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5RzhBaTVsUjNNbERDZHV6V1pDbHQzSHo1L289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielRhMTJHU09GVVd6Q0dlOW5sN3JUSkh3RmtzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1YUjdSRktNIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6MjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lxbW9NOENFSTJWK01BR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikd5RVlodVpNYUhtbnJPUVJEL1NIOEwwWVFmM2RoVzRJNFNya3AyTlRQa009IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRzUmxKVVRvSFRZL1JOb0crNTE5Y3BVRDBXbWJFY0xvSFVmVnliV1lMVGlYQUxKS2ZOS2dVYmE3TmVwOEl6ZFpwQlRQTFpJREQ3VHc2bGUzS25rNUNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJyNlFLMWNzb2RRRkg1U3h5SldWTUNSejVVNzFVOWJLVG1relh5SUpLVmtBZm5waElFVzBNeWtJZ3hFNU9lUEZMY0h1WGJLWEhPYnlEVEhZNVVLajZndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMToyOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSc2hHSWJtVEdoNXA2emtFUS8waC9DOUdFSDkzWVZ1Q09FcTVLZGpVejVEIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2Nzk5MjU5fQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Toputech/ALONE-MD-V1',
    OWNER_NAME : process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "no",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',             
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHAT_BOT1: process.env.CHAT_BOT1 || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by ★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫',   
    AUTOBIO: process.env.AUTOBIO || 'yes',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'no',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    CAPTION : process.env.CAPTION || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    BOT : process.env.BOT_NAME || 'ALONE_MD',
    URL : process.env.BOT_MENU_LINKS || "https://files.catbox.moe/522t4u.jpg",
    MODE: process.env.PUBLIC_MODE || "no",              
    TZ: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '4' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
                  ANTICALL_MSG: process.env.ANTICALL_MSG || 'Dont call i am busy🏆',
    CHATBOT : process.env.CHATBOT || 'no',  
       URL: process.env.URL || "https://files.catbox.moe/522t4u.jpg",  
              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
