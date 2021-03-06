import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { shape, number } from 'prop-types';
import * as movieAPI from '../../services/movieAPI';
import Loading from '../../components/Loading/Loading';
import './movieDetails.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      movie: {},
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    movieAPI.getMovie(id).then(
      (film) => this.setState({ movie: film }),
    );
  }

  deleteMovie() {
    const { match: { params: { id } } } = this.props;
    movieAPI.deleteMovie(id).then(
      () => this.setState({ shouldRedirect: true }),
    );
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { movie, shouldRedirect } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;
    if (shouldRedirect) return <Redirect to="/" />;
    if (Object.keys(movie).length === 0) return <Loading />;
    return (
      <div className="movie-details-section" data-testid="movie-details">
          <img className="movie-details-image" alt="Movie Cover" src={ `../${imagePath}` } />
        <div className="movie-details">
          <p>{ `Title: ${title}` }</p>
          <p>{ `Subtitle: ${subtitle}` }</p>
          <p>{ `Storyline: ${storyline}` }</p>
          <p>{ `Genre: ${genre}` }</p>
          <p> Rating: <span className="movie-details-rating">{ rating }</span></p>
          <Link to="/"> VOLTAR </Link>
          <Link to={ `/movies/${id}/edit` }> EDITAR </Link>
          <Link to="/" onClick={ this.deleteMovie }> DELETAR </Link>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: shape({
    params: shape({
      id: number,
    }),
  }).isRequired,
};

export default MovieDetails;
