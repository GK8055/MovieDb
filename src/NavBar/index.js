import './index.css'
import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
//import SearchMovies from '../SearchMovies'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class NavBar extends Component {
  state = {searchInput: '', list: [], status: apiStatus.loading}

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  searchBtnClk = () => {
    this.getSearchMovies()
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

  getSearchMovies = async (page = 1) => {
    console.log('call')
    const API_KEY = '044a91987532dea4151a0022eeae663b'
    const {searchInput} = this.state
    const MOVIE_NAME = searchInput
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      //console.log(data)
      const updateData = this.getUpdateData(data)
      // console.log(updateData)
      this.setState({status: apiStatus.success, list: updateData.results})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderPagination = () => {
    const {list} = this.state
    if (list.length !== 0) {
      return (
        <Pagination
          totalPages={list.totalPages}
          paginationClk={this.getSearchMovies}
        />
      )
    }
  }

  render() {
    const {searchInput, list} = this.state
    return (
      <>
        <nav className="nav_bar_container">
          <div className="title_container">
            <h1 className="movie_title">movieDB</h1>
            <div className="search_container">
              <input
                type="search"
                placeholder="Search"
                className="input_ele"
                value={searchInput}
                onChange={this.onChangeSearch}
              />
              <br />
              <button
                className="search_btn"
                type="button"
                onClick={this.searchBtnClk}
              >
                Search
              </button>
            </div>
          </div>
          <div className="navigation_container">
            <Link to="/">
              <button type="button" className="btn">
                Popular
              </button>
            </Link>
            <Link to="/top-rated">
              <button type="button" className="btn">
                Top
              </button>
            </Link>
            <Link to="/upcoming">
              <button type="button" className="btn">
                Upcoming
              </button>
            </Link>
          </div>
        </nav>
        <ul className="list_container">
          {list.map(each => (
            <MovieCard data={each} key={each.id} />
          ))}
        </ul>
        {this.renderPagination()}
      </>
    )
  }
}

export default withRouter(NavBar)
