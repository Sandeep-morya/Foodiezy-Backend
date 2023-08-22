export interface Context {
	token?: string;
}

export type Parent = null;

interface CollectionsInput {
	serviceAreaId: string;
	type: string;
	collectionId: string;
	imageId: string;
	text: string;
	altText: string;
}

export interface ICollection {
	altText: string;
	collectionId: string;
	createdAt: string;
	imageId: string;
	serviceAreaId: string;
	text: string;
	type: string;
	updatedAt: string;
	_id: string;
}

interface RestaurantsInput {
	serviceAreaId: string;
	type: string;
	restaurantId: string;
	name: string;
	imageId: string;
	cuisines: string[];
	locality: string;
	veg: boolean;
	areaName: string;
	costForTwo: string;
	rating: number;
	votesString: string;
	delivery: DeliveryInfo;
	discount: string;
}

interface DeliveryInfo {
	time: number;
	duration: string;
	distance: string;
}
export interface IRestaurant {
	type: string;
	_id: string;
	serviceAreaId: string;
	restaurantId: string;
	name: string;
	imageId: string;
	cuisines: string[];
	veg: boolean;
	rating: number;
	votesString: string;
	costForTwo: string;
	areaName: string;
	locality: string;
	discount: string;
	delivery: DeliveryInfo;
	createdAt: string;
	updatedAt: string;
}

export interface AddCollectionsParams {
	collectionsInput: CollectionsInput[];
}

export interface GetCollectionParams {
	serviceAreaId: string;
}

export interface AddRestarantsParams {
	restaurantsInput: RestaurantsInput[];
}

export interface GetRestaurantsParams {
	serviceAreaId: string;
	queryParams: string;
	page?: number;
	limit?: number;
}

export interface AddServiceAreaParams {
	name: string;
	lat: number;
	lng: number;
}

export interface GetServiceAreaDataParams {
	serviceAreaName: string;
}

export interface Restaurants {
	serviceAreaId: string;
	page: number;
	limit: number;
	count: number;
	totalCount: number;
	modified: boolean;
	documents: IRestaurant[];
}

export interface registerUserParams {
	name: string;
	email: string;
	image?: string;
	password?: string;
	provider?: string;
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
	image: string;
	provider: string;
}

export interface CartDish {
	dishId: string;
	dishName: string;
	imageId: string;
	price: number;
	count: number;
	category: string;
}

export interface CartItem extends CartDish {
	restaurantId: string;
	restaurantName: string;
}

export interface MutateCartParams {
	cartInput: CartItem[];
	userId: string;
}
