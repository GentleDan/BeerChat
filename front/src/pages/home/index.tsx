import { Header } from "../../widgets/header";
import { Sidebar } from "./components/sidebar";
import { Chat } from "./components/chat";
import styles from "./styles.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
