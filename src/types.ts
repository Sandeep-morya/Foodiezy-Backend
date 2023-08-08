export interface Context {
	admin: boolean;
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
