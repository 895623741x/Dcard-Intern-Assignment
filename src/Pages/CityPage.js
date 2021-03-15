import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Header from "../Header";
import { Cities } from "../Cities";
import { Media } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CityPage.css";

function CityPage(props) {
	let city = Cities.find((x) => x === props.match.params.cityName);

	const [selectedCity, setSelectedCity] = useState("");
	const [spots, setSpots] = useState([]);

	if (selectedCity !== city) {
		setSelectedCity(city);
		setSpots([]);
	}

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
				`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${selectedCity}?$top=30&$skip=${skip}&$format=JSON`
			);
			setSpots(() => {
				let newSpots = [...spots];
				newSpots.push(...response.data);
				return newSpots;
			});
			setHasMore(response.data.length > 0);
		};

		fetchData();
	}, [selectedCity, skip]);
	console.log(city);
	console.log(selectedCity);
	console.log(spots);

	return (
		<div className="city-container">
			<Header />
			<h1>{props.match.params.cityName}</h1>
			{spots.map((spot, index) => {
				if (spots.length === index + 1) {
					return (
						<Media key={index} ref={lastSpotElementRef}>
							<Media.Body>
								<h5>{spot.Name}</h5>
								<p>{spot.Description ? spot.Description : spot.DescriptionDetail}</p>
								<p>{spot.Address}</p>
							</Media.Body>
						</Media>
					);
				} else {
					return (
						<Media key={index}>
							<Media.Body>
								<h5>{spot.Name}</h5>
								<p>{spot.Description ? spot.Description : spot.DescriptionDetail}</p> <p>{spot.Address}</p>
							</Media.Body>
						</Media>
					);
				}
			})}
		</div>
	);
}

export default CityPage;
