import { RiFolderOpenLine as OpenFolder } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function HeaderBtn(props) {
  const tabSel = useSelector((state) => state.global.tab);
  let textcolor = " text-white ";
  if (tabSel == props.tab) textcolor = " text-yellow-400 ";

  return (
    <div
      onClick={props.action}
      className={`hover:text-yellow-200 w-12 h-12 flex flex-row justify-center items-center ${textcolor}`}
    >
      <props.icon className="rounded-lg"></props.icon>
    </div>
  );
}
