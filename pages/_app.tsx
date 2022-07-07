import wrapper from "../store/configureStore";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = ({ Component }) => {
  return (
    <>
      <Component />
    </>
  );
};
//app
export default wrapper.withRedux(App);
