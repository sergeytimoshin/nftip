import { Header } from "./components/Header/Header";
import { store } from "./modules/store";
import { Provider } from "react-redux";
import styles from "./App.module.scss";
import { UserNFTs } from "./components/UserNFTs/UserNFTs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NFTPage } from "./components/NFTPage/NFTPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.app}>
          <Header />
          <Routes>
            <Route path="/" element={<UserNFTs />} />
            <Route path="/:id" element={<NFTPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
