// import './index.css'
import {Component} from 'react'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SearchMovies extends Component {
  state = {list: [], status: apiStatus.loading, movieName: ''}

  componentDidMount() {
    this.getSearchMoviesMovies()
  }

  getUpdateData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(each => ({
      title: each.title,
      id: each.id,
      releaseDate: each.release_date,
      overview: each.overview,
      voteAvg: each.vote_average,
      image: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      popularity: each.popularity,
      voteCount: each.vote_count,
    })),
  })

  getSearchMoviesMovies = async () => {
    const API_KEY = '044a91987532dea4151a0022eeae663b'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=1`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      const updateData = this.getUpdateData(data)
      // console.log(updateData)
      this.setState({status: apiStatus.success, list: updateData})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderNavBar = () => {
    return <NavBar />
  }

  render() {
    const {list} = this.state
    // console.log(list)
    return (
      <div className="app_container">
        {this.renderNavBar()}
        <ul className="list_container">
          {list.results.map(each => (
            <MovieCard data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default SearchMovies
