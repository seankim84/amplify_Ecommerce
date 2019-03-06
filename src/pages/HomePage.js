import React from "react";
import NewMarket from '../components/NewMarket';
import MarketList from '../components/MarketList';


class HomePage extends React.Component {
  state = {
    searchTerm: "",
    searchResult:[],
    isSearching: false
  };

  handleSearchChange = searchTerm => this.setState({ searchTerm })

  handleClearSearch = () => this.setState({ search: '', searchResult: [] })

  handleSearch = event => {
    event.preventDefault();
    console.log(this.state.searchTerm)

    
  }

  render() {
    return (
      <React.Fragment>
        <NewMarket 
          searchTerm={this.state.searchTerm}
          isSearching={this.state.isSearching}
          handleSearchChange={this.handleSearchChange}
          handleClearSearch={this.handleClearSearch}
          handleSearch={this.handleSearch}
          />
        <MarketList />
      </React.Fragment>
    )
  }
}

export default HomePage;
