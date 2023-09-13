import { useState, useEffect } from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

//routing
import {
  BrowserRouter as Router,
  useNavigate,
  Routes, //replaces "Switch" used till v5
  Route,
  useParams,
} from "react-router-dom";

import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "./graphql/queries"; //may need to call in cli: amplify add codegen

let userEmail = "";

function Home() {
  const [sites, setSites] = useState([]);

  let siteQuery =
    'query MyQuery { \
    listUsers(filter: {Email: {eq: "' +
    userEmail +
    '"}}) { \
        items { \
          FirstName \
          LastName \
          teams { \
            items { \
              team { \
                Sites { \
                  items { \
                    site { \
                      SiteName \
                      SiteCode \
                    }\
                  }\
                }\
              }\
            }\
          }\
        }\
      }\
    }';

  useEffect(() => {
    fetchSites();
  }, []);

  //we need to query a user, and get all their sites
  async function fetchSites() {
    try {
    const siteData = await API.graphql(graphqlOperation(siteQuery));
    console.log(siteData)
    //const sites = siteData.data.liistUsers.items
    setSites(siteData);
    //console.log(sites)
    } catch (err) { console.log('error fetching users sites') }
  }

  let navigate = useNavigate();

  return (
    <p>
      Sites:
      {JSON.stringify(sites)}
    </p>
  );
}
  

export default Home;