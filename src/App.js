import React from "react";
import  { AmplifyTheme, withAuthenticator }  from 'aws-amplify-react';
import "./App.css";

class App extends React.Component {
  state = {};

  render() {
    return <div>App</div>;
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

export default withAuthenticator(App, true, [], null, theme);
