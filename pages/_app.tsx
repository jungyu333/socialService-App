import wrapper from "../store/configureStore";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import axios from "axios";

const App = ({ Component }) => {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            axios
              .get(url, { withCredentials: true })
              .then((result) => result.data),
        }}
      >
        <Component />
      </SWRConfig>
    </>
  );
};
//app
export default wrapper.withRedux(App);
