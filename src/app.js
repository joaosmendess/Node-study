import express from 'express' 

const app = express()

//Indicar para o express ler o body com JSON
app.use(express.json())


// mock

const selecoes = [
    {id:1, selecao:'Brasil', grupo: 'G'},
    {id:2, selecao:'Suiça', grupo: 'G'},
    {id:3, selecao:'Camarões', grupo: 'G'},
    {id:4, selecao:'Sérvia', grupo: 'G'}
]

//Retornar o objeto por id
function buscarSelecaoPorId(id) {
    return selecoes.filter(selecao => selecao.id == id)
}

//Pegar a posição ou Index do elemento no array por id
function buscarIndexSelecao(id) {
    return selecoes.findIndex(selecao => selecao.id == id)
}


//criando rota padrão ou raiz

app.get('/', (req, res) => {
   res.send('Hello World! Aprendendo Node.js')
})

app.get('/selecoes' , (req,res) => {
    res.status(200).send( selecoes  )

})

app.get('/selecoes/:id', (req,res) => {
    res.json(buscarSelecaoPorId(req.params.id))  
})

app.post('/selecoes' ,(req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})

app.delete('/selecoes/:id' ,(req,res) => {
    let index = buscarIndexSelecao(req.params.id)
 selecoes.splice(index, 1)
 res.send(`Seleção com id ${req.params.id} excluída com sucesso!`)
})

app.put('/selecoes/:id' ,(req,res) => {
    let index = buscarIndexSelecao(req.params.id)
 selecoes[index].selecao  = req.body.selecao
 selecoes[index].grupo  = req.body.grupo
 res.json(selecoes )
})





export default app

