import { useSelector } from "react-redux";
import Dialog from "../Dialog";
import CreateTemplate from "../Template/CreateTemplate";
import SelectTemplate from "../Template/SelectTemplateDialog";
import TemplateDialog from "../Template/TemplateDialog";

export default function DialogFactory() {
  var ExceptionHandler = useSelector((state) => state.dialog.exception);
  console.log(ExceptionHandler);
  return (
    <div>
      <Dialog dialog="Template">
        <TemplateDialog />
      </Dialog>
      <Dialog handlesClick dialog="CreateTemplate">
        <CreateTemplate />
      </Dialog>
      <Dialog dialog="SelectTemplate">
        <SelectTemplate />
      </Dialog>
      <Dialog dialog="exception">
        <div className="w-full h-36 flex flex-row items-center px-5 rounded text-xl text-white bg-gray-400">
          {ExceptionHandler}
        </div>
      </Dialog>
    </div>
  );
}
