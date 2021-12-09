import { useDispatch } from "react-redux";
import { toggleDialog } from "../../reducers/DialogReducer";
import TemplateRow from "./TemplateRow";

export default function SelectTemplate() {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 rounded-xl flex-1 w-full flex flex-col justify-start items-start text-white">
      <div className="w-full text-3xl h-24 border-b-2 border-black rounded-t-xl bg-blue-200 flex flex-row justify-center items-center text-black">
        Select Template
      </div>
      <TemplateRow templateName="AIMS" />
      <TemplateRow templateName="ESOC" />
      <TemplateRow templateName="SMS" />
      <TemplateRow templateName="Shopfloor Monitoring" />
      <TemplateRow templateName="Liferay" />
    </div>
  );
}
