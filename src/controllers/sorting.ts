const getSortingOrder = <T extends URLSearchParams>(url: T) => {
	const sortParams = url.get("sortby");

	switch (sortParams) {
		case "rating":
			return { rating: -1 };

		case "title":
			return { name: 1 };

		case "h2l":
			return { costForTwo: -1 };

		case "l2h":
			return { costForTwo: 1 };

		case "delivery":
			return { "delivery.time": 1 };

		default:
			return {};
	}
};

export default getSortingOrder;
