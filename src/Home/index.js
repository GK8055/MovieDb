import './index.css'
import {Component} from 'react'

import NavBar from '../NavBar'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {list: [], status: apiStatus.loading}

  componentDidMount() {
    this.getPopularMovies()
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

  getPopularMovies = async (page = 1) => {
    const API_KEY = '044a91987532dea4151a0022eeae663b'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      const updateData = this.getUpdateData(data)
      //console.log(updateData.results)
      this.setState({status: apiStatus.success, list: updateData})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderNavBar = () => {
    return <NavBar />
  }

  renderPagination = () => {
    const {list} = this.state
    console.log('li', list.totalPages)

    return (
      <Pagination
        totalPages={list.totalPages}
        paginationClk={this.getPopularMovies}
      />
    )
  }

  render() {
    const {list} = this.state
    const li = list.length === 0 ? [] : list.results
    return (
      <div className="app_container">
        {this.renderNavBar()}
        <ul className="list_container">
          {li.map(each => (
            <MovieCard data={each} key={each.id} />
          ))}
        </ul>
        {this.renderPagination()}
      </div>
    )
  }
}

export default Home
