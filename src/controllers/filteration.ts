const getDynamicOptions = (url: URLSearchParams, options: object) => {
	const sortParams = url.get("sortby");
	const foodTypeParams = url.getAll("foodType");
	const cuisineParams = url.getAll("cuisine");
	const deliveryParams = url.getAll("delivery");
	const ratingParams = url.getAll("rating");
	const expoloreParams = url.getAll("explore");
	const costForTwoParams = url.getAll("costForTwo");

	const veg = checkForVeg(foodTypeParams);
	const rating = checkForRating(ratingParams);
	console.log({
		sortParams,
		foodTypeParams,
		cuisineParams,
		deliveryParams,
		ratingParams,
		expoloreParams,
		costForTwoParams,
	});

	if (veg === 0) {
		options = { ...options, veg: true };
	}

	if (veg === 1) {
		options = { ...options, veg: false };
	}

	if (cuisineParams.length > 0) {
		options = { ...options, cuisines: { $all: cuisineParams } };
	}

	if (rating) {
		options = { ...options, rating };
	}

	if (deliveryParams.length > 0) {
		options = { ...options, "delivery.time": { $lte: 20 } };
	}

	// '₹300 - ₹500', 'Greater than ₹500', 'Less than ₹300'

	return options;
};

function checkForVeg(foodTypeParams: string[]) {
	const paramsLength = foodTypeParams.length;
	if (paramsLength === 1) {
		if (foodTypeParams[0] === "Pure Veg") {
			return 0;
		} else {
			return 1;
		}
	}
	return 2;
}

function checkForRating(ratingParams: string[]) {
	const paramsLength = ratingParams.length;
	if (paramsLength > 0) {
		if (ratingParams.includes("Ratings 3.5+")) {
			return { $gte: 3.5 };
		}
		if (ratingParams.includes("Ratings 4.0+")) {
			return { $gte: 4 };
		}
		if (ratingParams.includes("Ratings 4.5+")) {
			return { $gte: 4.5 };
		}
	}
	return false;
}

export default getDynamicOptions;
