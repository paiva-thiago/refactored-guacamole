const faq = require('../data/faq.json')
const finder = require('./finder.js')
const errors = require('./errors.js')
const stringutils = require('./stringutils.js')
const messages = require('./messages')
const Filter = require('bad-words')
const bocasuja = require('../data/bad-words-pt-BR.json')

const contemPalavrao = (frase) => {
    const controleDePalavrao = new Filter(bocasuja)
    return controleDePalavrao.isProfane(frase)
}
function processQuestion(pergunta, html){
    if(stringutils.blankOrNull(pergunta)){
        return ''
    }
    
    let resposta = finder.findByQuery(faq,pergunta)
    if(!html){
        resposta = stringutils.withoutHtmlCode(resposta)
    }
    if(contemPalavrao(pergunta)){
        resposta=resposta+messages.ALERTA_XINGAMENTO
    }
    return resposta
}

function answerFunction(req, res) {
    try{
        if(stringutils.blankOrNull(req.body.pergunta)){
            res.status(500).send({'resposta':'','erro':messages.PARAMETER_PERGUNTA})            
        }
        const aResposta = processQuestion(req.body.pergunta,req.body.html)
        let json = {resposta:aResposta}
        console.log(json)    
        res.status(200).send(json)               
    }catch(e){        
        res.status(500).send(errors.log(e))
    }        
}

function iAmOk(req,res){
    let json = [{locale:'pt-BR',msg:'Olá, Cara!'},{locale:'eng',msg:'Hello, Dude!'}]
    res.json(json)
}

module.exports = {
    iAmOk,
    answerFunction,
    processQuestion,
}