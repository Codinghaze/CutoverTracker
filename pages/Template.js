function Header() {
  return (
    <div className="w-full h-12 flex flex-row justify-start items-center bg-gray-300 text-2xl px-20">
      <img src="./CutoverPlanner.svg" className="w-12 h-12 mr-20"></img>
      CUTOVER PLANNER CREATOR
    </div>
  );
}
function Toolbar(props) {
  return (
    <div className="w-full h-12 flex flex-row justify-start items-center bg-gray-300 text-2xl border-black px-20">
      {props.children}
    </div>
  );
}
function Toolbtn(props) {
  return (
    <div className="h-6 w-24 bg-blue-300 flex flex-row items-center justify-center text-lg hover:bg-blue-600 select-none active:bg-blue-100">
      {props.name}
    </div>
  );
}
export default function TemplateView() {
  return (
    <div className="w-screen h-screen border-2 border-black flex flex-col justify-start items-center">
      <Header></Header>
      <Toolbar>
        <Toolbtn name="Add"></Toolbtn>
      </Toolbar>
    </div>
  );
}
