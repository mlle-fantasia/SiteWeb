import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Footer.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class Footer extends Component {

  render() {
    return (
    	
			<div className="footer">
				<Grid>
					<Row>
						<Col xs={12} sm={4} md={4}>
								<h3>Mes Infos :</h3>
								<p>Marina Front<br/>
									Développeuse Web<br/>
									région toulonnaise<br/>
									<Link to = "/">
										<div>retour à l'accueil</div>
									</Link>
								</p>
						</Col>
						<Col xs={12} sm={4} md={4}>
							<h3>Me contacter :</h3>
				        	<p> marinafront@hotmail.fr<br/>
				        	 06 02 10 85 07<br/>
				        	</p>	      	
						</Col>
						<Col xs={12} sm={4} md={4}>
							<h3>Mon CV :</h3>
							<a href={require('../assets/pdf/CV2018.pdf')} target="_blank">
								<button className="btn">Mon CV</button>
							</a>	      	
						</Col>
					</Row>
					<Row className="ligneSeparation">
						<p>Ce site a été réalisé avec React-Bootstrap</p>
					</Row>
				</Grid>
			</div>
		
    );
  }
}

export default Footer;