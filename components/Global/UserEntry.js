import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleDialog } from "../../reducers/DialogReducer";
import { setTempUserData, setUser } from "../../reducers/GlobalReducer";

function InputRow(props) {
  const dispatch = useDispatch();
  const InputValue = useSelector((state) => state.global.tempUser[props.field]);
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
            setTempUserData({ type: props.field, value: evt.target.value })
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
  const userData = useSelector((state) => state.global.tempUser);
  return (
    <div className="w-full  rounded-b-xl h-12 px-5 bg-gray-300 text-black  flex flex-row justify-center items-center">
      <div
        onClick={() => {
          localStorage.setItem("Username", userData.Username);
          localStorage.setItem("Name", userData.Name);
          localStorage.setItem("Email", userData.Email);
          dispatch(setUser(userData));
          dispatch(toggleDialog("UserLoginDialog"));
        }}
        className="w-24 select-none hover:bg-blue-400 active:bg-blue-600 h-10 border-2 text-xl flex flex-row justify-center items-center border-black bg-blue-200 rounded-xl"
      >
        Submit
      </div>
    </div>
  );
}
export default function UserEntryDialog() {
  const dispatch = useDispatch();
  return (
    <div className=" w-full flex flex-col justify-start items-start text-white">
      <div className="w-full h-24 rounded-t-lg  text-3xl bg-blue-300 flex flex-col justify-center items-center">
        Login
      </div>

      <InputRow field={"Username"} />
      <InputRow field={"Name"} />
      <InputRow field={"Email"} />
      <SubmitBtn />
    </div>
  );
}
