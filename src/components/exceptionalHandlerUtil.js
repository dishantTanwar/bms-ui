import React from "react";
import { Message } from "semantic-ui-react";

function getExceptionComponent(whatFailed, response) {
  if (response.status >= 400) {
    return (
      <Message negative>
        <Message.Header>{whatFailed}</Message.Header>
        {/* {console.log(loginErrors)} */}
        <Message.Item>{response.status}</Message.Item>
        <Message.Item>{response.data.message}</Message.Item>
      </Message>
    );
  }
}

export default getExceptionComponent;
