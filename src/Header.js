import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Cities } from "./Cities";
import "./Header.css";

import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
	return (
		<div className="header">
			<nav>
				<ul className="options">
					{Cities.map((city, index) => {
						if (city === "Taiwan") {
							return (
								<li key={index}>
									<Link to={`/scenicSpot`} style={{ textDecoration: "none" }}>
										<div>
											<p>{city}</p>
										</div>
									</Link>
								</li>
							);
						} else {
							return (
								<li key={index}>
									<Link to={`/scenicSpot/${city}`} style={{ textDecoration: "none" }}>
										<div>
											<p>{city}</p>
										</div>
									</Link>
								</li>
							);
						}
					})}
				</ul>
			</nav>
		</div>
	);
}

export default Header;
