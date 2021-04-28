const express = require('express')
const bodyParser = require('body-parser')
const functions = require('./lib/functions.js')
const { TiledeskChatbotClient } = require('@tiledesk/tiledesk-chatbot-client')

const app = express();

app.use(bodyParser.json());

app.post('/thechatbot/v1/answerme/tiledesk', (req, res) => {
  const tdclient =  new TiledeskChatbotClient({request: req, response: res})
  console.log('You asked: ' + tdclient.text)
  res.status(200).send({"success":true})
  let msg = {
    text: 'Cheers! You asked: ' + tdclient.text
  }
  tdclient.sendMessage(msg)
});


app.listen(29005, () => {
  console.log('server started')
})