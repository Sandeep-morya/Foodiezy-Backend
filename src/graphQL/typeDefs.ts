export default `#graphql
    type Query {
        getServiceAreaData(serviceAreaName:String!):ServiceArea
        getRestaurants(serviceAreaId:ID!,queryParams:String,page:Int,limit:Int):Restaurants
        getCollections(serviceAreaId:ID!):[Collection]
        getRestaurant(id:ID!):Restaurant
        getUser:User
    }

    type Cart {
        userId: ID
		dishId: ID
		dishName: String
		category: String
		imageId: String
		price: Int
		count: Int
		restaurantId: ID
		restaurantName: String
    }

    type ServiceArea {
        _id:ID
        name:String
        lat:Float
        lng:Float
        createdAt: String
        updatedAt: String
        collections:[Collection]
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

    type User {
        _id:ID
		name: String
		email: String
		image: String
		provider: String
        cart:[Cart]
    }


    type Mutation {
        addServiceArea(name:String!, lat:Float!,lng:Float!):MutationResponse
        addCollections(collectionsInput:[CollectionsInput]!):MutationResponse
        addRestaurants(restaurantsInput:[RestaurantsInput]!):MutationResponse
        registerUser(name:String!,email:String!,image:String,password:String,provider:String):RegistrationResponse
    }

    type MutationResponse {
        status:Boolean,
        message:String!
    }
    type RegistrationResponse {
        token:String,
        about:User
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
		costForTwo: Int
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
		costForTwo: Int!
		rating: Float!
		votesString: String!
		delivery: DeliveryInfo!
		discount: String!
    }
`;
