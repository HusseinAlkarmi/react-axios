import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./App.css";
import Weather from "./components/Weather";
import Movies from "./components/Movies";




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      weather: [],
      movies:[],
      locationResult: {},
      searchQuery: "",
      showLocInfo: false,
      showError: false,
     weatherData: false,
     movieData: false,

     

    };
  }

  getLocFun = async (event) => {
    event.preventDefault();
    await this.setState({
      searchQuery: event.target.city.value,
    });
    console.log(this.state.searchQuery);

    try {

      let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

      console.log(URL);
      let locResult = await axios.get(URL);
      console.log("locResult", locResult);
      console.log("result", locResult.data);

    


      this.setState({
        locationResult: locResult.data[0],
        showLocInfo: true,
        showError: false,
      });
      this.getWeather();
      this.getMovie();

      console.log(this.state.locationResult);
    } catch {
      console.log("something went wrong");
      this.setState({
        showError: true,
        showLocInfo: false,
      });
    }
  };

  getWeather = async (event) => {




    let URLw = `${process.env.REACT_APP_SERVER_LINK}/weather?searchQuery=${this.state.searchQuery}`;
    // let URLw = `https://city-explorer-api301d33.herokuapp.com/weather?searchQuery=${this.state.searchQuery}`;
    console.log(URLw);
    let weather = await axios.get(URLw);


    console.log("result", weather.data);

    this.setState({
      weather: weather.data,
     weatherData: true,
    });
  };


  getMovie = async (event) => {
  
    let URL = `${process.env.REACT_APP_SERVER_LINK}/movie?searchQuery=${this.state.searchQuery}`;
    // let URL = `https://city-explorer-api301d33.herokuapp.com/movie?searchQuery=${this.state.searchQuery}`;
    console.log(URL);
    let movies = await axios.get(URL);
    console.log("result", movies.data);
    this.setState({
      movies: movies.data,
    movieData: true,
    });
  };

  render() {
    return (
      <div>
        <h2

        >
          City Explorer App
        </h2>
        <Form
      
          onSubmit={this.getLocFun}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold", color: "white" }}>
              City Explorer
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Enter city name"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Button type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.showLocInfo && (
          <>
            <h3
              style={{
                textAlign: "center",
                marginTop: "3px",
              }}
            >
              City name: {this.state.searchQuery}
            </h3>
             
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
              }}
            >
              latitude: {this.state.locationResult.lat}
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
              }}
            >
              longitude: {this.state.locationResult.lon}{' '}
            </p>

            <img
        
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`}
              alt='city'
            />

            <Row
              xs={1}
              md={3}
              className="g-4"
              style={{
                position: "relative",
                margin: "90px",
                marginTop: "10px",
              }}
            >
              <Card
                border="primary"
                style={{ width: "25rem", position: "relative", left: "450px" }}
              >
                <Card.Header
                  
                >
                  City
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {this.state.weather.map((data) => {
                      return <Weather weather={data} />;
                    })}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          
                
            {this.state.movies.map((data) => {
              return <Movies movies={data} />;
            })}



          </>
        )}
        {this.state.showError && (
          <p> something wrong in getting the data</p>
        )}
      </div>
    );
  }
}

export default App;