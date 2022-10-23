import Select, { components } from "react-select";

/* const msgStyles = {
    background: "skyblue",
    color: "white"
  }; */
  
 export const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Ingen flere muligheder</span>
      </components.NoOptionsMessage>
    );
  };

//https://stackblitz.com/edit/react-lejn8c?file=src%2FApp.js