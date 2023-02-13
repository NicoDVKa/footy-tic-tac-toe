
let ApiKey = 'bc332ae23b5d52f8a6eb76930e59040de29959044488b2f2e45989397596f832';
let url = 'https://apiv2.allsportsapi.com/football/?&met=Teams&teamName='
let urlApiKey = '&APIkey='+ ApiKey;

export const searchTeam = async(team) =>{
  let response = "";
  const options = {
    method: 'GET'
  };
  await fetch(url + team + urlApiKey, options)
	  .then(res => res.json())
	  .then(json => response  = json.result)
	  .catch(err => console.error('error:' + err));
  return response;
}
