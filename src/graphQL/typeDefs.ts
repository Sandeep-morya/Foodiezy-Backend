export default `#graphql
# Query and its types
    type Query {
        getServiceAreaData(serviceAreaName:String!):ServiceArea
        getRestaurants(serviceAreaId:ID!,page:Int,limit:Int):Restaurants
        getCollections(serviceAreaId:ID!):[Collection]
    }

    type ServiceArea {
        _id:ID
        name:String
        lat:Float
        lng:Float
        createdAt: String
        updatedAt: String
        collections:[Collection]
        restaurants:Restaurants
    }
    type Collection {
        _id:ID
		serviceAreaId: ID
        type: String
		collectionId: String
		imageId: String
		text: String
		altText: String
        createdAt: String
        updatedAt: String
    }
    type Delivery {
        time: Float
        duration: String
        distance: String
    }
    type Restaurants {
        serviceAreaId:ID
        page:Int
        limit:Int
        count:Int
        totalCount:Int
        documents:[Restaurant]
    }
    type Restaurant {
        _id:ID
		serviceAreaId: ID
        type: String
		restaurantId: String
		name: String
		imageId: String
		cuisines: [String]
		locality: String
		veg: Boolean
		areaName: String
		costForTwo: String
		rating: Float
		votesString: String
		delivery: Delivery
		discount: String
        createdAt: String
        updatedAt: String
    }


    input CollectionsInput {
        serviceAreaId: ID!
        type: String!
        collectionId: String!
        imageId: String!
        text:String!
        altText: String!
    }
    input DeliveryInfo {
        time: Float!
        duration: String!
        distance: String!
    }

    input RestaurantsInput {
        serviceAreaId: ID!
        type: String!
		restaurantId: String!
		name: String!
		imageId: String!
		cuisines: [String]!
		locality: String!
		veg: Boolean!
		areaName: String!
		costForTwo: String!
		rating: Float!
		votesString: String!
		delivery: DeliveryInfo!
		discount: String!
    }

# Mutations
    type MutationResponse {
        status:Boolean,
        message:String!
    }
    type Mutation {
        addServiceArea(name:String!, lat:Float!,lng:Float!):MutationResponse
        addCollections(collectionsInput:[CollectionsInput]!):MutationResponse
        addRestaurants(restaurantsInput:[RestaurantsInput]!):MutationResponse
    }
`;
