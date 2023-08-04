export default `#graphql
    type Query {
        greeting: String
    }

    type Mutation {
        sayHello(to:String!):String
    }
`;
