import { RiFolderOpenLine as OpenProject } from "react-icons/ri";
import HeaderBtn from "./HeaderBtn";
import { LoadTemplates } from "../Functions/TemplateFunctions";
import { loadedTemplates } from "../reducers/TemplateReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTab } from "../reducers/GlobalReducer";
import { ImInsertTemplate as Templates } from "react-icons/im";
import { toggleDialog } from "../reducers/DialogReducer";

export default function Header() {
  const dispatch = useDispatch();

  return (
    <div className="bg-blue-300 h-12  px-10 w-full flex flex-row justify-start items-center">
      <div className="h-12 w-12 mr-10">
        <img src="/CutoverPlanner.svg"></img>
      </div>
      <div className=" flex-1 h-12 text-4xl text-white font-bold mr-10">
        Cutover Planner
      </div>
      <div className="flex-1 flex flex-row justify-end items-start h-12 text-4xl text-white font-bold">
        <HeaderBtn
          icon={OpenProject}
          tab="Cutover"
          action={async () => {
            dispatch(changeTab("Cutover"));
            // let templates = await LoadTemplates();
            // dispatch(loadedTemplates(templates));
          }}
        />
        <HeaderBtn
          icon={Templates}
          tab="Template"
          action={async () => {
            dispatch(toggleDialog("Template"));
            // let templates = await LoadTemplates();
            // dispatch(loadedTemplates(templates));
          }}
        />
      </div>
    </div>
  );
}
