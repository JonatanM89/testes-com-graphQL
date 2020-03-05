const { ApolloServer, gql } = require('apollo-server');

const usuarios = [{
    id : 1,
    nome : "Joaão",
    email : "joao@joao.com.br",
    idade :29
},
{
    id : 1,
    nome : "Joaão2",
    email : "joao2@joao.com.br",
    idade :29
},{
    id : 1,
    nome : "Joaão3",
    email : "joao3@joao.com.br",
    idade :29
}]

const typeDefs = gql`
    scalar Date 

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto{
        id : ID
        tipoProduto : String
        nome: String!
        preco: Float!
        desconto : Float  
        precoComDesconto :Float
    }


    #Pontos de entrada da API
    type Query {
        ola: String
        horaatual: Date
        usuarioLogado: Usuario
        produtoEmDestaque : Produto
        numerosMegaSena : [Int]
        usuarios : [Usuario]
    }
`;

const resolvers = {
    Usuario:{
        salario(usuario){
            return usuario.salario_real
        }
    },

    Produto: {        
        precoComDesconto(produto){
            return produto.preco - ( !produto.desconto ? 0 : produto.desconto );
        }    
    },

    Query: {
        ola(){
            return 'Ola mano'
        },
        horaatual(){
            return new Date()
        },

        produtoEmDestaque(){
            return{
                id : 1,
                nome : 'Carrinho 25',
                tipoProduto : 'Brinquedos',
                preco : 45.00,
                desconto : 15
            }
            
        },

        usuarios(){
            return usuarios;s
        },

        usuarioLogado(){
            return{
                id:1,
                nome: 'Ana',
                email: 'ana@ana.com.br',
                idade: 25,
                salario_real: 2500.60,
                vip: true
                
            }
        },

        numerosMegaSena(){
            return [4,5,67,4,1]
        },
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(3000).then(( {url}) => {
    console.log(`Executando em ${url}`)
});