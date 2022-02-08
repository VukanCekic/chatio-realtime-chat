import Chat from "../components/Chat/Chat";
import Join from "../components/Join/Join";
import IRoute from "../interfaces/route";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Join",
    component: Join,
    exact: true,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    exact: false,
  },
];

export default routes;
