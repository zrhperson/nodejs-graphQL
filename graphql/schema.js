const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString} = require('graphql')
const {query} = require('../db')

const PersonType = new GraphQLObjectType({
    name: 'person',
    fields: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        sex: {type: GraphQLString},
        age: {type: GraphQLInt},
    }
})
const queryById = new GraphQLObjectType({
    name: 'queryById',
    fields: {
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLInt},
            },
            resolve: async (_,{id}) => {
                const data = await query(`select * from person where id=${id}`);
                return data?.[0]
            }
        },
    }
})
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        insertPerson: {
            type: PersonType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                sex: {type: GraphQLString},
            },
            resolve: async (_,{name,age,sex}) => {
                const data = await query(`insert into person(name,age,sex)values('${name}','${age}','${sex}')`);
                console.log(data, 'data===>');
                return {id: data.insertId, name, age, sex}
            }
        },
        updatePerson: {
            type: PersonType,
            args: {
                id: {type: GraphQLInt},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                sex: {type: GraphQLString},
            },
            resolve: async (_,{id, name,age,sex}) => {
                const data = await query(`UPDATE person SET name=${name},age=${age},sex=${sex} WHERE id='${id}'`);
                console.log(data, 'data===>');
                return {id: data.id, name, age, sex}
            }
        },
    }
})

// person schema
const personSchema = new GraphQLSchema({
    query: queryById,
    mutation: mutation,
})

module.exports = {
    personSchema,
}