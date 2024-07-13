import './index.css'

import {Component} from 'react'

class Pagination extends Component {
  state = {pageNo: 1}

  onPrevBtnClk = () => {
    const {paginationClk, totalPages} = this.props
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prev => ({
          pageNo: prev.pageNo - 1,
        }),
        () => {
          const {pageNo} = this.state
          paginationClk(pageNo)
        },
      )
    }
  }

  onNextBtnClk = () => {
    const {paginationClk, totalPages} = this.props
    this.setState(
      prev => {
        if (prev.pageNo < totalPages) {
          return {
            pageNo: prev.pageNo + 1,
          }
        }
        return prev
      },
      () => {
        const {pageNo} = this.state
        paginationClk(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="btn_container">
        <button onClick={this.onPrevBtnClk} className="btn" type="button">
          Prev
        </button>
        <p className="text">{pageNo}</p>
        <button className="btn" onClick={this.onNextBtnClk} type="button">
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
