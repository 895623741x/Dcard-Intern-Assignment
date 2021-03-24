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
			.get(
				`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$skip=${skip}&$format=JSON
			`
			)
			.then((res) => {
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
				setHasMore(res.data.length > 0);
			});
	}, [skip]);

	// console.log(spots);

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
