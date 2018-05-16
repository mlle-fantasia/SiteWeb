import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './CvHeader.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class CvHeader extends Component {
	  render() {
		    return (
			    <div className="headerCv">
				    <Grid fluid>
						<Row>
						    <Grid>
								<Row className="texte">
									<Col xs={12} md={12}>
									    Mon CV est disponible au format PDF :  
									    <button className="btn">
									    	<a href={require('../../assets/pdf/CV2018.pdf')} target="_blank">Mon CV</a>
									    </button>
									</Col>
								</Row>
							</Grid>
						</Row>
					</Grid>
				</div>
		    );
	  }
}

export default CvHeader;