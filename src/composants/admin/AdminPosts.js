import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import React from "react";
import "./Admin.css";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import JoditEditor from "jodit-react";

class AdminProjetsForm extends Component {
	constructor(props) {
		super(props);
		this.getPostsList();
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeFile = this.handleChangeFile.bind(this);
		this.handleChangeFile2 = this.handleChangeFile2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeJodit = this.handleChangeJodit.bind(this);
		this.handleChangeHidden = this.handleChangeHidden.bind(this);
		this.fileInput2 = React.createRef();
		this.fileInput = React.createRef();
	}

	state = {
		postAModifierId: "",
		ajouter: false,
		// post attributs
		id: "",
		title: "",
		contenu: "",
		hidden: true,
		order: 0,
		resume: "",
		date: "",
		/////
		message: false,
		messageText: "",
		posts: [],
		fileSelected: { image: null, binary: null },
	};
	resetDataPost() {
		this.setState({
			id: "",
			title: "",
			contenu: "",
			hidden: true,
			resume: "",
			date: "",
			postAModifierId: "",
			order: 0,
			fileSelected: { image: null, binary: null },
			fileSelected2: { image: null, binary: null },
		});
	}
	getPostsList() {
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/list", { headers: { Authorization: localStorage.getItem("token") } }).then(
			(response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				let posts = response.data;
				this.setState({ posts });
			},
			(error) => {
				// si erreur 400
				if (error.response.status === 401 || error.response.status === 500) {
					window.location.href = "/fantasia";
				}
				console.log(error.response.status);
			}
		);
	}
	showDataPost(post) {
		console.log("post", post);
		this.setState({
			ajouter: true,
			id: post.id,
			title: post.title,
			// image: post.image,
			contenu: post.contenu,
			hidden: post.hidden,
			order: post.order,
			resume: post.resume,
			date: post.date,
			postAModifierId: post.id,
		});
	}
	deletePost(event) {
		event.preventDefault();
		if (this.state.postAModifierId) {
			axios
				.delete(process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/" + this.state.postAModifierId, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					this.resetDataPost();
					this.CancelForm();
					this.getPostsList();
				});
		}
	}
	AddPost() {
		const { ajouter, postAModifierId } = this.state;
		let ajouterYesOrNot = !ajouter;
		if (postAModifierId) ajouterYesOrNot = true;
		this.setState({
			ajouter: ajouterYesOrNot,
		});
		this.resetDataPost();
	}
	//change la checkbox invisible
	handleChangeHidden() {
		const { hidden } = this.state;
		this.setState({
			hidden: !hidden,
		});
	}
	//lorsqu'on selectionne un fichier
	handleChangeFile(event) {
		event.preventDefault();
		let file = { image: null, binary: null };
		file.image = this.fileInput.current.files[0];
		var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				file.binary = e.target.result;
			};
		})(this.fileInput.current.files[0]);
		reader.readAsDataURL(this.fileInput.current.files[0]);

		this.setState({
			fileSelected: file,
		});
	}
	//lorsqu'on selectionne un fichier 2
	handleChangeFile2(event) {
		event.preventDefault();
		let file = { image: null, binary: null };
		console.log("this.fileInput2", this.fileInput2.current);
		file.image = this.fileInput2.current.files[0];
		var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				file.binary = e.target.result;
			};
		})(this.fileInput2.current.files[0]);
		reader.readAsDataURL(this.fileInput2.current.files[0]);

		this.setState({
			fileSelected2: file,
		});
	}
	//losque qu'on change les champs du formulaire
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}
	handleChangeJodit(data) {
		this.setState({
			contenu: data,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { id, title, hidden, contenu, postAModifierId, fileSelected, fileSelected2, order, resume, date } = this.state;
		let newMessage = "";
		if (postAModifierId) {
			newMessage = "Le post à bien été modifié";
			axios
				.put(
					process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/edit/" + this.state.postAModifierId,
					{
						id: id,
						title: title,
						contenu: contenu,
						hidden: hidden,
						order: order,
						resume: resume,
						date: date,
					},
					{ headers: { Authorization: localStorage.getItem("token") } }
				)
				.then(async (response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					if (fileSelected.image) {
						await this.saveImage(response.data.id, fileSelected.image, 1);
					}
					if (fileSelected2 && fileSelected2.image) {
						await this.saveImage(response.data.id, fileSelected2.image, 2);
					}
					this.setState({ message: true, messageText: newMessage });
					this.resetDataPost();
					this.CancelForm();
				});
		} else {
			newMessage = "Le post à bien été ajouté";
			axios
				.post(
					process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/add/",
					{
						id: id,
						title: title,
						contenu: contenu,
						hidden: hidden,
						order: order,
						resume: resume,
						date: date,
					},
					{ headers: { Authorization: localStorage.getItem("token") } }
				)
				.then(async (response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					if (fileSelected.image) {
						await this.saveImage(response.data.id, fileSelected.image, 1);
					}

					if (fileSelected2.image) {
						await this.saveImage(response.data.id, fileSelected2.image, 2);
					}
					this.setState({ message: true, messageText: newMessage });
					this.resetDataPost();
					this.CancelForm();
				});
		}
	}
	async saveImage(id, file, numero) {
		console.log("file", file);
		let formData = new FormData();
		formData.append("image", file, file.name);
		console.log("formData", formData);
		let url =
			numero === 2
				? process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/" + id + "/image2"
				: process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/" + id + "/image";
		axios.post(url, formData, {
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
			},
		});
	}

	hiddenArticle(event, item) {
		event.preventDefault();
		axios
			.put(
				process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/hidden/" + item.id,
				{ hidden: !item.hidden },
				{ headers: { Authorization: localStorage.getItem("token") } }
			)
			.then(async (response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				this.getPostsList();
			});
	}
	CancelForm() {
		this.setState({ postAModifierId: null });
		this.setState({ ajouter: false });
		this.getPostsList();
	}
	showForm() {
		const { ajouter, postAModifierId } = this.state;
		if (ajouter) {
			return (
				<form className="formAdmin" onSubmit={this.handleSubmit}>
					<Row className="">
						<Col md={6}>
							<label htmlFor="titre">Titre</label>
							<input id="title" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" />
						</Col>
					</Row>
					<Row className="">
						<Col md={6}>
							<label htmlFor="image">Image</label>
							<input
								type="file"
								id="image"
								name="image"
								onChange={this.handleChangeFile}
								className="form-control"
								ref={this.fileInput}
							/>
						</Col>
						<Col md={6}>
							<label htmlFor="image2">Image pour la page du post (1200x500)</label>
							<input
								type="file"
								id="image2"
								name="image2"
								onChange={this.handleChangeFile2}
								className="form-control"
								ref={this.fileInput2}
							/>
						</Col>
					</Row>
					<Row className="">
						<Col md={6}>
							<label htmlFor="date">Date</label>
							<input type="date" id="date" name="date" value={this.state.date} onChange={this.handleChange} className="form-control" />
						</Col>
						<Col md={6}>
							<label htmlFor="order">Ordre</label>
							<input
								type="number"
								id="order"
								name="order"
								value={this.state.order}
								onChange={this.handleChange}
								className="form-control"
							/>
						</Col>
					</Row>
					<Row className="">
						<Col md={12}>
							<label htmlFor="resume">Résumé</label>
							<textarea
								name="resume"
								id="resume"
								rows="5"
								value={this.state.resume}
								onChange={this.handleChange}
								className="form-control"
							/>
						</Col>
					</Row>

					<Row className="">
						<Col md={12}>
							<label htmlFor="contenu">Contenu</label>
							<JoditEditor
								value={this.state.contenu}
								editorRef={this.setRef}
								config={this.config}
								tabIndex={1}
								onBlur={(jodit) => {
									const data = jodit.target.innerHTML;
									this.handleChangeJodit(data);
								}}
							/>
						</Col>
					</Row>
					<Row className="">
						<Col md={6}>
							<input type="checkbox" id="hidden" name="hidden" checked={this.state.hidden} onChange={this.handleChangeHidden} />
							<label htmlFor="hidden">Invisible</label>
						</Col>
					</Row>

					<Row className="">
						<Col md={6}>
							<button className="btn btn-rea btn-danger" onClick={(e) => this.deletePost(e)}>
								Supprimer
							</button>
						</Col>
						<Col md={6}>
							<button className="btn btn-rea">{postAModifierId ? "Modifier" : "Ajouter"}</button>
							<Link to={"/posts/" + this.state.articlaAModifier + "#top"}>
								<button className="btn btn-rea">Afficher</button>
							</Link>
						</Col>
					</Row>
				</form>
			);
		} else {
			return "";
		}
	}
	/**
	 * @property Jodit jodit instance of native Jodit
	 */
	jodit;
	setRef = (jodit) => (this.jodit = jodit);
	config = {
		readonly: false,
	};
	render() {
		const { posts, message, messageText } = this.state;

		const notificationMessage = message ? (
			<Col md={12}>
				<p className="AlertOK">{messageText}</p>
			</Col>
		) : (
			<div></div>
		);

		const postList = posts.map((object) => (
			<Row key={object.id}>
				<div className="margin itemListAdmin">
					<Col xs={12} sm={5} md={1} className="">
						<img
							className="uneRea imgReaAdmin img-fluid"
							src={process.env.REACT_APP_API_MARINAFRONT + "/posts/" + object.id + "/image"}
							alt="post"
						/>
					</Col>
					<Col xs={12} sm={7} md={7} className="admin-margin">
						<div className="texte titreRea titreReaAdmin">
							{object.title} -- ORDRE : {object.order}
						</div>
					</Col>
					<Col xs={12} sm={7} md={4} className="admin-margin">
						<button className="btn btn-rea btn-rea-suite" onClick={() => this.showDataPost(object)}>
							Modifier
						</button>
						<Link to={"/fantasia/admin" + object.id + "#top"}>
							<button className="btn btn-rea btn-warning" type="button" onClick={(e) => this.hiddenArticle(e, object)}>
								{object.hidden ? "Publier" : "Masquer"}
							</button>
						</Link>
					</Col>
					<Col xs={12} sm={12} md={12}>
						<hr />
					</Col>
				</div>
			</Row>
		));

		return (
			<Grid className=" ">
				<Row>{postList}</Row>
				<Row>{notificationMessage}</Row>
				<Row className="row-btnAjouter">
					<Col md={12} className="container-admin-btnAjouter">
						<div className="container-bordure">
							<button className=" btn btn-rea admin-btnAjouter" onClick={() => this.AddPost()}>
								Ajouter
							</button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>{this.showForm()}</Col>
				</Row>
			</Grid>
		);
	}
}
export default AdminProjetsForm;
