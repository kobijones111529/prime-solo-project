export type LocationFilter = {
	center: [number, number];
	distance?: number;
};

export type Filters = {
	location?: LocationFilter;
};

export type Query =
	| {
			latitude: number;
			longitude: number;
			distance?: number;
	  }
	| {};
