import React, { Component } from 'react';
//route
import {Link, Route,BrowserRouter} from 'react-router-dom'
//css
import './App.css';
import './composants/MenuNavigation.css';
import './composants/pageAccueil/Liens.css';
import {Grid, Row,Col, Nav, Navbar, NavItem } from 'react-bootstrap';
//component
import Footer from './composants/Footer.js';
import AccueilPage from './composants/pageAccueil/AccueilPage.js';


const LIENVERSACCUEIL = [{route: "/", nom:"retour à l'accueil", component: AccueilPage, exact: true}];


class App extends Component {

state= {
  pageActive : 'Accueil',
}



getEtat(nom){
  const {pageActive} = this.state;
  return pageActive.nom === nom ? 'pageActive' : 'pageInactive' ;
}


  render() {
    const {} = this.state

    const listeLiens = this.props.tabLiens.map((element) =>(
                      <Link to={element.route}>
                          <Col xs={12} sm={4} md={4}>
                              <div className={`center-block ${Route.path == element.route ? 'pageActive' : 'pageInactive'}`} >
                                  <div className={element.icon}></div>
                                  <div className="text">{element.nom}</div>
                              </div>
                          </Col>
                      </Link>
                  ));


      const listeLiensNav = this.props.tabLiens.map((element) => (
                  <NavItem>
                      <Link to={element.route}>
                          {element.nom}
                      </Link>
                  </NavItem>

      ));

      const LienAccueil = LIENVERSACCUEIL.map((element) =>(
          <Link to={element.route}>
              <div>
                  <img src={require("./composants/images/logoInfo50px.png")} alt="logo Marina Front"/>
                  <div className="marque">Marina Front</div>
              </div>
          </Link>
      ));


    return (
        <BrowserRouter>
          <div>

            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                    {LienAccueil}
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  {listeLiensNav}
                </Nav>
              </Navbar.Collapse>
            </Navbar>

              <Route path="/" exact component={AccueilPage}/>
              {this.props.tabRoute}

             <div className="liens">
                <Grid fluid>
                   <Row>
                       <Grid>
                           {listeLiens}
                       </Grid>
                   </Row>
                </Grid>
             </div>

             <Footer/>

          </div>
        </BrowserRouter>
      );
  }
}

export default App;
