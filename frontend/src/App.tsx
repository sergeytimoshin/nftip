import { Header } from "./components/Header/Header";
import { store } from "./modules/store";
import { Provider } from "react-redux";
import styles from "./App.module.scss";

function App() {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Header />
      </div>
    </Provider>
  );
}

export default App;
