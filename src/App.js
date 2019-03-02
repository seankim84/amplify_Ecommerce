import React from "react";
import  { AmplifyTheme, Authenticator }  from 'aws-amplify-react';
import { Auth, Hub }  from 'aws-amplify';
import "./App.css";

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

  render() {
    const { user } = this.state;
    return !user ? (
      <Authenticator theme={theme} />
    ): <div>App</div>
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