const express = require('express')
const bodyParser = require('body-parser')
const functions = require('./lib/functions.js')

const { TiledeskChatbotClient } = require('@tiledesk/tiledesk-chatbot-client')

const app = express();

app.use(bodyParser.json());

app.post('/thechatbot/v1/answerme/:prm', (req, res) => {  
  const reqCameFromTiledesk = ('tiledesk'==req.params.prm)
  const tdclient = (reqCameFromTiledesk ?  new TiledeskChatbotClient({request: req, response: res}) : {text:req.body.pergunta})
  console.log('You asked: ' + tdclient.text)
  if(reqCameFromTiledesk){
    res.status(200).send({"success":true})
  }
  let msg = {
    text: functions.processQuestion(tdclient.text,false)
  }
  
  if(reqCameFromTiledesk){
    tdclient.sendMessage(msg)
  }else{
    res.status(200).send({"resposta":msg.text})
  }
});


app.listen(29005, () => {
  console.log('server started')
})