const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {personSchema} = require('./graphql/schema')
const {query} = require('./db')

const app = express()

// 使用graphqlHttp中间件
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: personSchema,
}))

app.listen(4000)