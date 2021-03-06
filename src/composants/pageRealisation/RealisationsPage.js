import React, { Component } from "react";
import CvHeader from "../pageCv/CvHeader.js";
import "./RealisationsPage.css";
import "@ladjs/bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavIcons from "../NavIcons";
import axios from "axios";

class RealisationsPage extends Component {
	constructor() {
		super();
		this.getArticleList();
	}

	state = {
		articles: [],
		projets: [],
	};

	getArticleList() {
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/articles/list").then((response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			let articles = response.data;
			this.setState({ articles });
		});
	}

	render() {
		return (
			<div>
				<CvHeader />
				<Grid className="realisation">
					<Row>
						<Col xs={12} md={6}>
							<h2>
								<span className="glyfTitre glyphicon glyphicon-cog"></span>
								<div className="petitTitre">Quelques réalisations :</div>
							</h2>
						</Col>
					</Row>
					<Row>
						{this.state.articles.map((object) => (
							<div className="margin" key={object.id}>
								<Link to={"/realisations/" + object.id + "#top"}>
									<Col xs={12} sm={5} md={4} className="margin">
										{/* <div className={`uneRea ${object.miniature}`}></div> */}
										<img
											className="uneRea img-fluid"
											src={process.env.REACT_APP_API_MARINAFRONT + "/articles/" + object.id + "/miniature"}
											alt="miniature projet"
										/>
									</Col>
								</Link>
								<Col xs={12} sm={7} md={8} className="margin">
									<div className="texte titreRea">
										{object.title} <span className="langagesRea">({object.langage})</span>
									</div>

									<p className="resumeRea">{object.resume}</p>
									<Link to={"/realisations/" + object.id + "#top"}>
										<button className="btn btn-rea btn-rea-suite">Lire la suite</button>
									</Link>
									<span>
										{object.site ? (
											<a href={object.site} target="_blank" rel="noopener noreferrer nofollow">
												<button className="btn btn-rea">lien vers le site</button>
											</a>
										) : (
											""
										)}
									</span>
								</Col>
								<Col xs={12} sm={12} md={12}>
									<hr />
								</Col>
							</div>
						))}
					</Row>
					<Row>
						<Col xs={12} md={6}>
							<h3 className="github">
								Dépôts Github :
								<a href="https://github.com/mlle-fantasia" target="_blank" rel="noopener noreferrer">
									<button className="btn form-control btn-rea btn-lien-github">Les dépots des mes réalisations</button>
								</a>
							</h3>
						</Col>
					</Row>
				</Grid>

				<NavIcons />
			</div>
		);
	}
}

export default RealisationsPage;
