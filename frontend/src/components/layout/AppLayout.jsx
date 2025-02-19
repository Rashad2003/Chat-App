import { Outlet } from "react-router";
import { Header } from "./header";
// import { Footer } from "./footer";
// import { Loading } from "./Loading";

const AppLayout = () => {
  //   const navigation = useNavigation();

  // if (navigation.state === "loading") return <Loading />;
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
