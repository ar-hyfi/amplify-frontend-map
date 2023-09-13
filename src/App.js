import React from "react"
import Map from './Map';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
} from "@aws-amplify/ui-react";

function App({ signOut }) {

  return (
    <div>
      <Map />
      <div style={{ position: 'absolute', top: 20, right: 75 }}>
        <Button onClick={signOut} style={{ backgroundColor: 'white', padding: '10px 20px', borderRadius: '5px' }}>Sign Out</Button>
      </div>
    </div>
  );
}

export default withAuthenticator(App);