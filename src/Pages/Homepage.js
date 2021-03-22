import React, { useEffect, useState, useRef, useCallback } from "react";

import Header from "../Header";
import axios from "axios";
// import { Media } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";

function HomePage() {
	const [spots, setSpots] = useState([]);
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(false);

	const observer = useRef();
	const lastSpotElementRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					console.log("visible");

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
		const fetchData = async () => {
			const response = await axios.get(
				`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$skip=${skip}&$format=JSON
			`
			);

			// 1st and the most successful attempt
			// setSpots(() => {
			// 	let newSpots = [...spots];
			// 	newSpots.push(...response.data);
			// 	return newSpots;
			// });

			// 3rd attempt
			setSpots((prevSpots) => {
				let newSpots = [...prevSpots];
				newSpots.push(...response.data);
				return newSpots;
			});

			// 2nd attempt
			// setSpots((prevSpots) => {
			// 	if (prevSpots.length === 0) {
			// 		return (prevSpots = [...response.data]);
			// 	} else {
			// 		let newSpots = [...prevSpots];
			// 		newSpots.push(...response.data);
			// 		return newSpots;
			// 	}
			// });
			setHasMore(response.data.length > 0);
		};
		fetchData();
	}, [skip]);

	console.log(spots);

	return (
		<div className="homepage-container">
			<Header />
			<h1>Taiwan</h1>
			{spots.map((spot, index) => {
				if (spots.length === index + 1) {
					return (
						<div key={spot.ID} ref={lastSpotElementRef}>
							<h5>{spot.Name}</h5>
							<p>{spot.Description ? spot.Description : spot.DescriptionDetail}</p>
						</div>
					);
				} else {
					return (
						<div key={spot.ID}>
							<h5>{spot.Name}</h5>
							<p>{spot.Description ? spot.Description : spot.DescriptionDetail}</p>
						</div>
					);
				}
			})}
		</div>
	);
}

export default HomePage;
