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
	const costForTwo = checkCostForTwo(costForTwoParams);

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
	if (costForTwo) {
		options = { ...options, costForTwo };
	}

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

function checkCostForTwo(costForTwoParams: string[]) {
	const paramsLength = costForTwoParams.length;
	// case-1 ['₹300 - ₹500']
	// case-2 ['₹300 - ₹500', 'Greater than ₹500',]
	// case-3 ['Greater than ₹500']
	// case-4 ['Greater than ₹500', 'Less than ₹300']
	// case-5 ['Less than ₹300']
	// case-6 ['₹300 - ₹500','Less than ₹300']

	if (paramsLength > 0 && paramsLength < 3) {
		if (paramsLength === 1) {
			if (costForTwoParams[0] === "₹300 - ₹500") {
				return { $gte: 300, $lte: 500 };
			} else if (costForTwoParams[0] === "Greater than ₹500") {
				return { $gte: 500 };
			} else {
				return { $lte: 300 };
			}
		} else {
			const first = costForTwoParams[0];
			const second = costForTwoParams[1];

			if (first === "₹300 - ₹500" && second === "Greater than ₹500") {
				return { $gte: 300 };
			} else if (first === "Greater than ₹500" && second === "Less than ₹300") {
				return { $or: [{ $lte: 300 }, { $gte: 500 }] };
			} else {
				return { $lte: 500 };
			}
		}
	}
	return false;
}
export default getDynamicOptions;
