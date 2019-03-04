import React from "react";
import  { AmplifyTheme, Authenticator }  from 'aws-amplify-react';
import { Auth, Hub }  from 'aws-amplify';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import  Navbar from './components/Navbar';
import "./App.css";

export const UserContext = React.createContext()

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount(){
    console.dir(AmplifyTheme);
    this.getUserData();
    Hub.listen('auth', this, 'onHubCapsule') // channel /withintheComponent /specific function name
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user ? this.setState({ user }) : this.setState({ user: null })
  }

  onHubCapsule = capsule  => {
    switch(capsule.payload.event){
      case "signIn":
        console.log ("SignIn")
        this.getUserData()
        break;

      case "signUp":
        console.log("SignedUp");
        break;

      case "signOut":
        console.log("signOut")
        this.setState({user:null})
        break;

      default: 
        return;
    }
  }

  handleSignout = async () => {
    try {
      await Auth.signOut()
    } catch(err) {
      console.error('Error singing out user', err);
    }
  }

  render() {
    const { user } = this.state;
    return !user ? ( 
      <Authenticator theme={theme} /> ) : ( 
        <UserContext.Provider value={{ user }}>
          <Router>
            <React.Fragment>
              <Navbar user={user} handleSignout={this.handleSignout} />
              <div className="app-container">
                <Route exact path='/' component={HomePage}/>
                <Route path='/profile' component={ProfilePage}/>
                <Route path='/markets/:marketId' component={
                  ({ match }) => <MarketPage marketId={match.params.marketId}/>}/>
              </div>
            </React.Fragment>
          </Router>
        </UserContext.Provider>
    );
  }
}

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: '#223973'
  },
  button: {
    ...AmplifyTheme.button,
    background: '#223973',
    color: '#fffff'
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: '5px'
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    background: '#223973'
  }
}

// export default Authenticator(App, true, [], null, theme);
export default App;