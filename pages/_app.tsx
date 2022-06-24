import wrapper from "../store/configureStore";
import "../styles/globals.css";

const App = ({ Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
