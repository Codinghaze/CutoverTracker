import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleDialog } from "../reducers/DialogReducer";

export default function Dialog(props) {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogs[props.dialog]);
  if (dialogOpen) {
    return (
      <div className="w-full z-10 h-screen left-0 flex flex-row items-center justify-center top-0 absolute">
        <div
          onClick={() => {
            if (props.handlesClick == undefined) {
              dispatch(toggleDialog(props.dialog));
            }
          }}
          className="flex flex-row justify-center items-center absolute left-0 top-0 w-full h-screen bg-white opacity-50"
        ></div>
        <div className="z-20 flex shadow-2xl rounded-xl flex-row justify-start items-start w-1/2 border-4 bg-gray-200 border-black">
          {props.children}
        </div>
      </div>
    );
  }
  return <div></div>;
}
