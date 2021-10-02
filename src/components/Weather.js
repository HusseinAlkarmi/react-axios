import React, { Component } from "react";

class Weather extends Component {
    render() {

        return (
            <>
                <p>{this.props.weather.description}

                    {this.props.weather.date}
                </p>
            </>




        )

    }



}





export default Weather;