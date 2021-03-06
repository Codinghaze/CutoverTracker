import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleDialog } from "../../reducers/DialogReducer";
import {
  resetTempTemplate,
  setTempTemplateData,
} from "../../reducers/TemplateReducer";
import TemplateRow from "./TemplateRow";

function InputRow(props) {
  const dispatch = useDispatch();
  const InputValue = useSelector(
    (state) => state.template.tempTemplate[props.field]
  );
  return (
    <div className="w-full h-12 px-5 bg-gray-300 text-black  flex flex-row justify-start items-center">
      <div className="w-1/4 h-10 text-xl flex flex-row justify-center items-center"></div>
      <div className="w-1/4 h-10 text-xl flex flex-row justify-center items-center">
        {props.field}
      </div>

      <input
        value={InputValue || ""}
        onChange={(evt) =>
          dispatch(
            setTempTemplateData({ type: props.field, value: evt.target.value })
          )
        }
        className="w-1/4 px-2 h-10 text-lg text-black  flex flex-row justify-center items-center"
      ></input>
      <div className="w-1/4 h-10 text-md flex flex-row justify-center items-center">
        {props.tips}
      </div>
    </div>
  );
}
function SubmitBtn(props) {
  const dispatch = useDispatch();
  const tempTemplate = useSelector((state) => state.template.tempptemplate);
  return (
    <div className="w-full  rounded-b-xl h-12 px-5 bg-gray-300 text-black  flex flex-row justify-center items-center">
      <div
        onClick={() => {
          alert(JSON.stringify());
          let CutoverResponse = fetch("http://localhost:5000/");
          dispatch(toggleDialog("CreateTemplate"));
        }}
        className="w-24 select-none hover:bg-blue-400 active:bg-blue-600 h-10 border-2 text-xl flex flex-row justify-center items-center border-black bg-blue-200 rounded-xl"
      >
        Submit
      </div>
    </div>
  );
}
function CloseBtn(props) {
  const dispatch = useDispatch();
  return (
    <div className="w-full  rounded-b-xl h-12 px-5 bg-gray-300 text-black  flex flex-row justify-center items-center">
      <div
        onClick={() => {
          dispatch(resetTempTemplate());
          dispatch(toggleDialog("CreateTemplate"));
        }}
        className="w-24 select-none hover:bg-blue-200 active:bg-blue-600 h-10 border-2 text-xl flex flex-row justify-center items-center border-black bg-gray-400 rounded-xl"
      >
        Exit
      </div>
    </div>
  );
}
export default function CreateTemplate() {
  const dispatch = useDispatch();
  return (
    <div className=" w-full flex flex-col justify-start items-start text-white">
      <div className="w-full h-24 rounded-t-lg  text-3xl bg-blue-300 flex flex-col justify-center items-center">
        Create Template
      </div>

      <InputRow field={"Name"} />
      <InputRow field={"App"} />
      <InputRow field={"Coordinator"} />
      <SubmitBtn />
      <CloseBtn />
    </div>
  );
}
