import clientID from "./API_keys.js";
const redirectURI = "http://localhost:3000/";

let accessToken;
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const experationMatch = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenMatch && experationMatch) {
        accessToken = accessTokenMatch[1]; //why [1]?
        const expiresIn = Number(experationMatch[1]); //cuz returns str

        // Clear parameters from URL, so app doesn’t try grabbing
        // access token after it has expired, can grab a new one.
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
        return accessToken;
      } else {
        //accessUrl
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    //fetch args: spotify endpoint & headers obj wt authorization prop
    // .then for once response is returned, convert to JSON
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    })
      .then((response) => {
        console.log(response);
        return response.json;
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          //no tracks returned
          return [];
        } else {
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
      });
  },
  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      return; //no results
    }
    const accessToken = Spotify.getAccessToken();
    //something about implicit grant flow
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID;
    // fetch takes endpoint and headers obj
    return fetch("https://api.spotify.com/v1/me", {headers: headers})
      .then((response) => response.json())
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({name: name}),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(
              `https://api.spotify.com//v1/users/${userID}/playlists/${playlistID}}/tracks`,
              {
                headers: headers,
                method: "POST",
                //uris? or uri?
                body: JSON.stringify({uris: trackURIs}),
              }
            );
          });
      });
  },
};
export default Spotify;
