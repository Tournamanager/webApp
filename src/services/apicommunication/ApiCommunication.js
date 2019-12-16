import axios from "axios";
import GraphQLRG from "../GraphQLQueryGenerator.js";

class ApiCommunication {
  static endpoint = "https://api-tournamanager.herokuapp.com/graphql";

  //body format: "query q(){users{id}}" or "mutation m($var1:String!, $var2:int){addThing(name: $var1, value: $var2){id}}
  //variables format: {} or {"var1": "value", "var2": 2}
  //target is under what name we want to save the requested data in the state of the view
  static graphQlCall(view, body, variables, target) {
    //console.log(`{"query": "${body}", "variables": ${variables}}`);
    axios
      .post(this.endpoint, `{"query": "${body}", "variables": ${variables}}`, {
        headers: { "Content-type": "application/json" }
      })
      .then(response => {
        view.setState({ [target]: response.data.data }, () =>
          console.log(response)
        );
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }

  /**
   * @author lfb0801
   * @description a function to make a graphql request that should be superior to all others
   * @param {String} _method Choose between query or mutation
   * @param {String} _function The function from the backend you want to use
   * @param {String} _queryData The data you want to retrieve from the request, or null if not used
   * @param {[{name: String, type: any, value: value}]} _variables Type can only be String or Int, or null if not used
   */
  static graphQLRequest(_method, _function, _queryData, _variables) {
    return axios.post(
      this.endpoint,
      GraphQLRG.generateBody(_method, _function, _queryData, _variables),
      { headers: { "Content-type": "application/json" } }
    );
  }
}

export default ApiCommunication;
