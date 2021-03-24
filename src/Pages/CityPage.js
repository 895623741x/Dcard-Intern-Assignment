import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Header from "../Header";
import { Cities } from "../Cities";
import "./CityPage.css";

function CityPage(props) {
	let city = Cities.find((x) => x === props.match.params.cityName);

	const [selectedCity, setSelectedCity] = useState("");
	const [spots, setSpots] = useState([]);
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(false);

	if (selectedCity !== city) {
		setSkip(0);
		setSpots([]);

		setSelectedCity(city);
	}

	const observer = useRef();

	const lastSpotElementRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					// console.log("visible");

					setSkip((prevSkip) => {
						return prevSkip + 30;
					});
				}
			});
			if (node) observer.current.observe(node);
		},
		[hasMore]
	);

	useEffect(() => {
		axios
			.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${selectedCity}?$top=30&$skip=${skip}&$format=JSON`)
			.then((res) => {
				setHasMore(res.data.length > 0);
				setSpots((prevSpots) => {
					if (prevSpots.length === 0) {
						let newSpots = [...res.data];
						return newSpots;
					} else {
						prevSpots.push(...res.data);
						let newSpots = [...prevSpots];
						return newSpots;
					}
				});
			});
	}, [skip, selectedCity]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const response = await axios.get(
	// 			`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${selectedCity}?$top=30&$skip=${skip}&$format=JSON`
	// 		);
	// 		console.log(response.data);

	// 		// 1st and most successful attempt
	// 		setSpots(() => {
	// 			let newSpots = [...spots];
	// 			newSpots.push(...response.data);
	// 			return newSpots;
	// 		});

	// 		// 3rd attempt
	// 		// setSpots((prevSpots) => {
	// 		// 	let newSpots = [...prevSpots];
	// 		// 	newSpots.push(...response.data);
	// 		// 	return newSpots;
	// 		// });

	// 		// 2nd attempt
	// 		// setSpots((prevSpots) => {
	// 		// 	let newSpots = [...prevSpots];
	// 		// 	newSpots.push(...response.data);
	// 		// 	return newSpots;
	// 		// });

	// 		setHasMore(response.data.length > 0);
	// 	};

	// 	fetchData();
	// }, [selectedCity, skip]);

	// console.log(city);
	// console.log(selectedCity);
	// console.log(spots);

	return (
		<div className="city-container">
			<Header />
			<h1>{props.match.params.cityName}</h1>
			{spots.map((spot, index) => {
				if (spots.length === index + 1) {
					return (
						<div key={index} ref={lastSpotElementRef}>
							<h5>{spot.Name}</h5>
							<p>{spot.Description ? spot.Description : spot.DescriptionDetail}</p>
							<p>{spot.Address}</p>
						</div>
					);
				} else {
					return (
						<div key={index}>
							<h5>{spot.Name}</h5>
							<p>{spot.Description ? spot.Description : spot.DescriptionDetail}</p> <p>{spot.Address}</p>
						</div>
					);
				}
			})}
		</div>
	);
}

export default CityPage;
