import { useDispatch } from "react-redux";
import { throwException, toggleDialog } from "../../reducers/DialogReducer";

export default function TemplateRow(props) {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 rounded-xl flex-1 w-full flex flex-col justify-start items-start text-white">
      <div
        onClick={() => {
          if (props.created) {
          } else {
            dispatch(
              throwException(
                `Template ${props.templateName} has no template created.`
              )
            );
          }
        }}
        className="hover:bg-blue-200 rounded-t-lg active:bg-yellow-400 h-12 select-none w-full flex flex-row justify-center text-2xl items-center text-black"
      >
        {props.templateName}
      </div>
    </div>
  );
}
