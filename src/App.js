import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Jumbotron,
  Container,
  CardHeader,
  Modal, ModalHeader, ModalBody, ModalFooter,
Button,
Card, CardTitle, CardText,CardImg, CardBody,Row, Col } from 'reactstrap';
import {LineChart, ToolTip, BarChart, PieChart} from 'react-easy-chart';

const movieByMonth = [];


class Example extends React.Component {

  constructor(props){
    super(props);
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = {
    movieByMonth: [
      {
        index: 1,
        title: "Title",
        director: "Director",
        released: 10,
        plot: "Plot",
        poster: "Poster",
        ratings: 97,
        boxoffice: 100

      }
    ],
    modal: false,
    test: "hi",
    fetchingData: true,
    windowWidth: initialWidth - 100,
    showToolTip: false,
    poster: "",
    title:"",
    x: "",
    y: "",
    boxoffice: "",
    datestring: "1",
    synopsis: "",
    ratings: "",
    };
  }

  toggle= () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  mouseOverHandler = (d, e) => {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x,
      poster: this.state.movieByMonth[d.x-1].poster,
      title: this.state.movieByMonth[d.x-1].title,
      price: d.price,
      datestring: this.state.movieByMonth[d.x-1].released,
      boxoffice: this.state.movieByMonth[d.x-1].boxoffice,
      synopsis: this.state.movieByMonth[d.x-1].plot,
      ratings: this.state.movieByMonth[d.x-1].ratings
    });
      
      console.log(this.state.x, this.state.y)
  }

  

  mouseMoveHandler = (e) => {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    }
  }






  // mouseOutHandler = () => this.setState({showToolTip: false});

  componentDidMount(){
  
    const getNewData = () =>{

      const promiseData = [];
      const sortedData = [];
      
      const movieMonth = ["Split",
      "Get+Out",
      "Beauty+and+the+beast",
      "The+Fate+of+the+Furious",
      "Guardians+of+the+Galaxy+Vol.+2",
      "Wonder+Woman",
      "Dunkirk",
      "The+Dark+Tower",
      "It",
      "Blade+Runner+2049",
      "Thor:+Ragnarok",
      "Pitch+Perfect+3"];
  
      let arrayLength = movieMonth.length;
      
      let urlFirst = 'http://www.omdbapi.com/?apikey=';
      const APIKey = '243607de&t=';
      let urlEnd = movieMonth[0];
      let fetchUrl = urlFirst.concat(APIKey, urlEnd);
      
      for(let i =0; i<arrayLength; i++){
        urlEnd = movieMonth[i]
        fetchUrl = urlFirst.concat(APIKey, urlEnd)
        promiseData.push(fetchUrl)
      }
     

      let testData = [];
  
    Promise.all(promiseData)
      .then(result => {
        console.log(result);
        result.map((file)=>{
          fetch(file)
          .then(response => {
            if(response.ok) return response.json()})
          .then(data => {
            sortedData.push({
              title: data["Title"],
              director: data["Director"],
              released: data["Released"],
              plot: data["Plot"],
              poster: data["Poster"],
              ratings: data["Ratings"][1]["Value"],
              boxoffice: data["BoxOffice"]
            })
            this.setState({
              movieByMonth: sortedData,
              fetchingData: true,
            })
          })
        });
        console.log(sortedData)
      })

      console.log(sortedData)
      

    
  }

  getNewData();
}

    




  render() {
    return (
      <div>
        
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Mobi Movie Visualizer</NavbarBrand>

          <Collapse navbar>
            <Nav className="ml-auto" navbar>

            </Nav>
          </Collapse>
        </Navbar>

        <div>

    </div>


    <Row>
        <Col sm="8">
        
          {this.state.movieByMonth.length > 11  &&
          <LineChart
          margin={{top: 50, right: 50, bottom: 30, left: 100}}
          axes
          yDomainRange={[0,550000000]}
          xDomainRange={[1,12]}
          grid
          dataPoints  
          grid
          verticalGrid
          lineColors={['darkcyan']}
          width={this.state.windowWidth / 1.33}
          height={this.state.windowWidth / 2.66}
          mouseOverHandler={this.mouseOverHandler}
          mouseOutHandler={this.mouseOutHandler}
          mouseMoveHandler={this.mouseMoveHandler}

    data={[
      [

        {x: 1, y: parseFloat(this.state.movieByMonth[0].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 2, y: parseFloat(this.state.movieByMonth[1].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 3, y: parseFloat(this.state.movieByMonth[2].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 4, y: parseFloat(this.state.movieByMonth[3].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 5, y: parseFloat(this.state.movieByMonth[4].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 6, y: parseFloat(this.state.movieByMonth[5].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 7, y: parseFloat(this.state.movieByMonth[6].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 8, y: parseFloat(this.state.movieByMonth[7].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 9, y: parseFloat(this.state.movieByMonth[8].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 10, y: parseFloat(this.state.movieByMonth[9].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 11, y: parseFloat(this.state.movieByMonth[10].boxoffice.replace(/[^0-9-.]/g, ''))},
        {x: 12, y: parseFloat(this.state.movieByMonth[11].boxoffice.replace(/[^0-9-.]/g, ''))},
        


      ]
    ]}
  />
  }
   
       
      </Col>
      <Col md ="3">
        <div>
        {this.state.showToolTip && 
          <Card>
           
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
            <CardTitle>Title goes here</CardTitle>
            </CardBody>
       
      </Card>}
      </div>
          </Col>
    </Row>

     <Container>
    <Row >
      <Col md='4'>
      {this.state.showToolTip  &&
      <Card>
      <CardHeader>Date Released</CardHeader>
        <CardBody>
          <CardTitle></CardTitle>
        </CardBody>
      </Card>}
      </Col>
      <Col md='4'>
      {this.state.showToolTip &&
      <Card>
        <CardHeader>Box Office</CardHeader>
        <CardBody>
          <CardTitle></CardTitle>
        </CardBody>
      </Card>}
      </Col>
      
      </Row>
      </Container>
      
<div>
      <Row>
      <Col sm="8">
      {this.state.movieByMonth.length > 11  &&
      <BarChart
      width={this.state.windowWidth / 1.33}
      height={this.state.windowWidth / 2.66}
      axesLabels = {{x: 'Movie', y: 'Box Office Sales'}}
      colorBars
      grid
      verticalGrid
      axes
      margin={{top: 50, right: 50, bottom: 30, left: 100}}
      mouseOverHandler={this.mouseOverHandler}
      mouseOutHandler={this.mouseOutHandler}
      mouseMoveHandler={this.mouseMoveHandler}
    data={[
      {x: 1, y: parseFloat(this.state.movieByMonth[0].ratings)},
      {x: 2, y:parseFloat(this.state.movieByMonth[1].ratings)},
      {x: 3, y: parseFloat(this.state.movieByMonth[2].ratings)},
      {x: 4, y: parseFloat(this.state.movieByMonth[3].ratings)},
      {x: 5, y:  parseFloat(this.state.movieByMonth[4].ratings)},
      {x: 6, y:  parseFloat(this.state.movieByMonth[5].ratings)},
      {x: 7, y:  parseFloat(this.state.movieByMonth[6].ratings)},
      {x: 8, y:  parseFloat(this.state.movieByMonth[7].ratings)},
      {x: 9, y: parseFloat(this.state.movieByMonth[8].ratings)},
      {x: 10, y: parseFloat(this.state.movieByMonth[9].ratings)},
      {x: 11, y: parseFloat(this.state.movieByMonth[10].ratings)},
      {x: 12, y: parseFloat(this.state.movieByMonth[11].ratings)}
    ]}
    clickHandler={(d) => this.setState({modal: !this.state.modal})}
  />}
  


  </Col>
        </Row>


        <Row>
          <Col sm ="4"></Col>
          
         
        </Row>
        </div>
    
      </div>
      
      

  
    );
  }
}

export default Example;