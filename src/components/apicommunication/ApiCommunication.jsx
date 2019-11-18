import axios from "axios";

class ApiCommunication {
  static endpoint = "https://api-tournamanager.herokuapp.com/graphql";

  static endpoint = "https://api-tournamanager.herokuapp.com/graphql";

  //body format: "query q(){users{id}}" or "mutation m($var1:String!, $var2:int){addThing(name: $var1, value: $var2){id}}
  //variables format: {} or {"var1": "value", "var2": 2}
  //target is under what name we want to save the requested data in the state of the view
  static graphQlCall(view, body, variables, target) {
    console.log(`{"query": "${body}", "variables": ${variables}}`);
    axios
      .post(this.endpoint, `{"query": "${body}", "variables": ${variables}}`, {
        headers: { "Content-type": "application/json" }
      })
      .then(response => {
        view.setState({ [target]: response }, () => console.log(response));
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }

  static graphQlCallPost(body, variables) {
    console.log(`{"query": "${body}", "variables": ${variables}}`);
    return axios.post(
      this.endpoint,
      `{"query": "${body}", "variables": ${variables}}`,
      { headers: { "Content-type": "application/json" } }
    );
  }
}

export default ApiCommunication;
