import React, { Component } from 'react'
import { connect } from 'react-redux'

export class NavBar extends Component {
  static propTypes = {
    // second: third
  }

  render() {
    return (
        <div className='nav-bar'>
            <div className='nav-bar-row-1'>
                
            </div>
            <div className='nav-bar-row-2'>

            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)