//requires

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//imports

const mysql_config = require('./imp/mysql_config.js');
const functions = require('./imp/functions.js');

//variáveis para disponibilidade e para versionamento

const API_AVAILABILITY = true;
const API_VERSION = '1.0.0';

//Iniciar servidor

const app = express();

app.listen(3000, () => {
    console.log('API está executando');
})

//verificar a disponibilidade da API

app.use((req,res,next) => {
    if(API_AVAILABILITY){
        next();
    }else{
        res.json(functions.response('Atenção', 'API está em manutenção', 0, null));
    }
})

//conexão com mysql

const connection = mysql.createConnection(mysql_config);

//cors - quem pode acessar o servidor/API

app.use(cors());

//rotas

//rota inicial (entrada)
app.get('/',(req,res) => {
    res.json(functions.response('Sucesso', 'API está sendo executada', 0, null));
})

//endpoints

//rota para consulta completa
app.get('/tasks', (req,res) => {
    connection.query('SELECT * FROM tasks', (err, rows) => {
        if(!err){
            res.json(functions.response('Sucesso', 'Sucesso na consulta', rows.length, rows));
        }else{
            res.json(functions.response('Erro', err.message, 0,null));
        }
    })

})

//tratar erris
app.use((req,res) => {
    res.json(functions.response('atenção', 'rota não encontrada', 0, null));
})