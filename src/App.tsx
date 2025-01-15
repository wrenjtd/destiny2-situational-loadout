import { useEffect, useState } from 'react'
import './App.css'
import ClientOAuth2 from 'client-oauth2'


function App() {
  const [count, setCount] = useState(0);
  const apiKey = import.meta.env.VITE_API_KEY;
  const clientSecret = import.meta.env.VITE_API_SECRET;
  const clientID = import.meta.env.VITE_API_CLIENT_ID;
  const base_auth_url = "https://www.bungie.net/en/OAuth/Authorize";
  const redirect_uri = "https://github.com/wrenjtd/destiny2-situational-loadout";
  const token_url = "https://www.bungie.net/Platform/App/OAuth/token/";


  const session = new ClientOAuth2({
    clientId: clientID,
    //clientSecret: clientSecret,
    redirectUri: redirect_uri,
    authorizationUri: base_auth_url,
    //accessTokenUri: token_url,
    scopes: ['ReadUserData', 'ReadBasicUserProfile']
  });


  const get_user_details_endpoint = "https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/";

  const token = session.credentials.getToken();
  console.log(token);

  const additionalHeaders = { 'X-API-Key': apiKey, 'Host': 'localhost:5173' };


  // token.expiresIn(3600);
  
  // token.sign({
  //   method: 'GET',
  //   url: get_user_details_endpoint,
  //   headers: additionalHeaders
  // });

  const [eData, setEData] = useState("");

  const getData = async () => {
    let data = await fetch("https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/", { headers: additionalHeaders });
    console.log(data.json())

  }


  useEffect(() => {
    let info = getData();
    setEData(String(info));

  }, [])

  return (
    <>

      <div className="card">
        <p>{eData}</p>
        <p>Click Me</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

    </>
  )

}

export default App
