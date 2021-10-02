import React, { Component } from "react";

class Movies extends Component {
    render() {

        return (

            <>
            <h2>{this.props.movies.title} </h2>
            <img src={this.props.movies.poster_path} alt="movie" />
           </>




        )

    }



}









export default Movies;