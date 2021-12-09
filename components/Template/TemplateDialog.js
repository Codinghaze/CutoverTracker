import { useDispatch } from "react-redux";
import { toggleDialog } from "../../reducers/DialogReducer";

export default function TemplateDialog() {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 rounded-xl flex-1 w-full flex flex-col justify-start items-start text-white">
      <div
        onClick={() => {
          dispatch(toggleDialog("Template"));
          dispatch(toggleDialog("CreateTemplate"));
        }}
        className="hover:bg-blue-200 rounded-t-lg active:bg-yellow-400 h-12 select-none w-full flex flex-row justify-center text-2xl items-center text-black"
      >
        New Template
      </div>
      <div
        onClick={() => {
          dispatch(toggleDialog("Template"));
          dispatch(toggleDialog("SelectTemplate"));
        }}
        className="hover:bg-blue-200 rounded-t-lg active:bg-yellow-400 h-12 select-none w-full flex flex-row justify-center text-2xl items-center text-black"
      >
        Create Cutover based on Template
      </div>

      <div className="hover:bg-blue-200 rounded-b-lg active:bg-yellow-400 h-12 select-none w-full flex flex-row justify-center text-2xl items-center text-black">
        Modify Template
      </div>
    </div>
  );
}
