import React from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from "../components/ErrorBoundary"
import './App.css'
import { connect } from 'react-redux'
import { requestRobots, setSearchField } from '../actions'


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        err: state.requestRobots.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends React.Component {
   
    componentDidMount() {
        this.props.onRequestRobots()
        }  

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props
        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return isPending ? <h1>Loading</h1> : (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>  
                </Scroll>
                
            </div>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)