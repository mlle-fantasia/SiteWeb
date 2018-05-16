import React, { Component } from 'react';

import PropTypes from 'prop-types'
import './ContactPage.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class ContactPage extends Component {
  render() {
    return (
	    <Grid className="contact">
		    <Row>
		        <Col xs={12} md={6} className="infoPerso">
					<h2><span className="glyfTitre glyphicon glyphicon-comment"></span><div className="petitTitre">Me contacter :</div></h2>
				</Col>	
		    </Row>
		    <Row >
		        <Col xs={8} xsOffset={2} sm={12} md={6} >
					<h3 className="titreMeContacter">Me contacter :</h3>
		        		<p><span className="glyphicon glyphicon-envelope"></span> marinafront@hotmail.fr</p>
		        		<p><span className="glyphicon glyphicon-earphone"></span> 06 02 10 85 07</p>
		        		<p><span className="glyphicon glyphicon-home"></span> 195 chemin des chênes<br/> 83130 LA GARDE</p>

				</Col>
				<Col xs={8} xsOffset={2} sm={12} md={6} className="meSuivre">
					<h3>Me suivre :</h3>
		        		<a className="btn btn-block btn-social btn-linkedin">
		        			<span className="fa fa-linkedin"></span>
		        			 Suivez moi sur LinkedIn
		        		</a>
		        		<a className="btn btn-block btn-social btn-github">
		        			<span className="fa fa-github"></span>
		        			 Suivez moi sur GitHub
		        		</a>
				</Col>
		    </Row>
        </Grid>
      );
  }
}

export default ContactPage;

