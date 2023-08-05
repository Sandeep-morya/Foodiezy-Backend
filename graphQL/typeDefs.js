export default `#graphql
    type ServiceArea {
        _id:ID
        name:String
        lat:Float
        lng:Float
        createdAt: String
        updatedAt: String
        collections:[Collection]
        restaurants:[Restaurant]
    }
    type Collection {
        _id:ID
		area_id: ID
        type: String
		collection_id: String
		imageId: String
		text: String
		altText: String
        createdAt: String
        updatedAt: String
    }
    type Delivery {
        time: Int
        duration: String
        distance: String
    }
    type Restaurant {
        _id:ID
		area_id: ID
        type: String
		restaurantId: String
		name: String
		imageId: String
		cuisines: [String]
		locality: String
		veg: Boolean
		areaName: String
		costForTwo: String
		rating: Int
		votesString: String
		delivery: Delivery
		discount: String
        createdAt: String
        updatedAt: String
    }

    type InitialData {
        done:String
        serviceArea:ServiceArea
        method:String
        userAgent:String
        time:String
    }

    input NewCollection {
        area_id: ID!
        type: String!
        collection_id: String!
        imageId: String!
        text:String!
        altText: String!
    }

    input NewRestaurant {
        area_id: ID!
        type: String!
		restaurantId: String!
		name: String!
		imageId: String!
		cuisines: [String]!
		locality: String!
		veg: Boolean!
		areaName: String!
		costForTwo: String!
		rating: Int!
		votesString: String!
		delivery: Delivery!
		discount: String!
    }

    type Query {
        getAllByCity(city:String!,page:Int,limit:Int):InitialData
    }

    # union CollectionMutationResponse = String | Boolean --will use later

    type Mutation {
        addServiceArea(name:String!, lat:Float!,lng:Float!):String
        addCollections(newCollection:[NewCollection]!):String
        addRestaurants(newRestaurant:[NewRestaurant]!):String
    }
`;
