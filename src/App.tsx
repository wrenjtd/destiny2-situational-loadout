import { useState } from 'react'
import './App.css'
import ClientOAuth2 from 'client-oauth2'


function App() {
  const [count, setCount] = useState(0);
  const apiKey = import.meta.env.VITE_API_KEY;
  const clientSecret = import.meta.env.VITE_API_SECRET;
  const clientID = import.meta.env.VITE_API_CLIENT_ID;
  const base_auth_url = "https://www.bungie.net/en/OAuth/Authorize";
  const redirect_uri = "https://github.com/wrenjtd/destiny2-siuational-loadout";
  const token_url = "https://www.bungie.net/Platform/App/OAuth/token/";
  const get_user_details_endpoint = "https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/";

 
  const session = new ClientOAuth2({
    clientId: clientID,
    clientSecret: clientSecret,
    redirectUri: redirect_uri, 
    authorizationUri: base_auth_url,
    accessTokenUri: token_url,
    scopes: ['ReadUserData']
  }); 

  //console.log("Authorization Link" + {session});

  const token = session.createToken({
    clientID : clientID,
    clientSecret : clientSecret,
    token_url : token_url
  });

  const additionalHeaders = {'X-API-Key': apiKey};
  
  token.sign({
    method: 'GET',
    url: get_user_details_endpoint,
    headers: additionalHeaders
  });


  return (
    <>
      
      <div className="card">
        <p>Click Me!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
    </>
  )
  
}

export default App
