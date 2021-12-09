import Head from "next/head";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DialogFactory from "../components/Global/DialogFactory";
import { useEffect } from "react";
import { toggleDialog } from "../reducers/DialogReducer";
import { setUser } from "../reducers/GlobalReducer";

export default function page() {
  const templateList = useSelector((state) => state.template.templates);
  const dispatch = useDispatch();
  useEffect(() => {
    let user = {
      Username: localStorage.getItem("Username"),
      Name: localStorage.getItem("Name"),
      Email: localStorage.getItem("Email"),
    };

    if (user.Username != null) {
      dispatch(setUser(user));
    } else {
      dispatch(toggleDialog("UserLoginDialog"));
    }
  });
  const selTab = useSelector((state) => state.global.tab);
  return (
    <div className="bg-gray-200 h-screen w-screen flex flex-col items-center justify-start">
      <Head>
        <title>Dev Ops Cutover Planner</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header></Header>
      <DialogFactory />
      <TabContent tab={selTab}></TabContent>
      {/* {templateList &&
        templateList.map((temp, idx) => {
          return (
            <div className="w-full px-10 text-2xl text-black" key={idx}>
              {temp.cutoverName}
            </div>
          );
        })} */}
    </div>
  );
}

function TabContent(props) {
  switch (props.tab) {
    case "Template":
      return <TemplateView></TemplateView>;
      break;

    default:
      return <div></div>;
      break;
  }
}
