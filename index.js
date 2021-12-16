const gle =  require('@thingsup/greenlock-sql-manager');
const {handlers} = require('@thingsup/greenlock-sql-manager');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const storeOptions = {
  // prefix: '<CUSTOM_PREFIX>',
  storeDatabaseUrl: 'postgres://nimmly:root@localhost:5432/ssl'
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/hello",(req,res)=>{
	res.send("Hello");
})

gle.init(
    {
        greenlockDefaults: {
          maintainerEmail: "anasnew99@gmail.com",
          cluster: false,
          packageRoot: __dirname,

          // Options passed to greenlock-express library init function
        },
        managerDefaults: {
          "subscriberEmail": "info@iobot.in" 

          // Options passed to greenlock-express-config.json
        },
        storeDefaults: storeOptions // Options passed to greenlock-sequelize with one additional argument prefix


    }  
).serve(app);


app.get('/',(req,res)=>{
  return res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/add',async (req,res)=>{
  const subject = req.body.subject;

  try {
    const {add} = await handlers(storeOptions);
    await add({subject:subject,altnames: [subject]}); 
    return res.send('Success'); 
  } catch (error) {
    return res.send('Error Occured');
  }
  
})
