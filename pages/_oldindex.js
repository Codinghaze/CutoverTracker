import Head from "next/head";
import yaml from "js-yaml";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AiFillFileAdd, AiTwotoneQuestionCircle } from "react-icons/ai";
import { MdLocationOn, MdNoDrinks } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import ExcelJS from "exceljs";
import LocationDiv from "../components/LocationDiv";

export default function Home() {
  let [planData, setPlanData] = useState();
  let [locShown, setLocShown] = useState(" hidden ");

  let [notesShown, setNotesShown] = useState(" hidden ");
  let [notes, setNotes] = useState(null);

  let [planList, setPlanList] = useState([]);
  let [selPlan, setSelPlan] = useState("");
  useEffect(async () => {
    let cutoverResponse = await fetch(
      "http://gd10appt0043:8152/CutOver/CutOver/getAllPlans"
    );
    let cutovers = await cutoverResponse.json();
    if (cutovers.length > 0) {
      setPlanList(cutovers);
      setSelPlan(cutovers[0]);
    }
  }, []);

  function generateTaskBoiler(plan) {
    let start = new Date("11/01/1994");
    let Parallel = false;
    let duration = 0;

    plan.Tasks.forEach((element) => {
      if (element.Start) {
        start = new Date(element.Start);
      }

      element.Start = start.toLocaleString();

      if (element.Duration) {
        if (!element.Parallel) {
          if (duration > element.Duration) {
            start = new Date(start.getTime() + duration * 60000);
          } else {
            start = new Date(start.getTime() + element.Duration * 60000);
          }
          Parallel = false;
          duration = 0;
        } else {
          Parallel = true;
          if (duration < element.Duration) {
            duration = element.Duration;
          }
        }
      }
      element.uuid = nanoid();
      element.checked = false;
    });

    return plan;
  }

  function triggerDownload(stringContent = "", filename = "cutover.csv") {
    const blob = new Blob([stringContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  function toggleTask(plan, taskUUID) {
    let tasks = [];
    let i = 0;
    for (i = 0; i < plan.Tasks.length; i++) {
      if (plan.Tasks[i].uuid === taskUUID) {
        let newTask = {
          ...plan.Tasks[i],
          checked: !plan.Tasks[i].checked,
          Completed: new Date(Date.now()).toLocaleString(),
        };

        tasks.push(newTask);
      } else {
        tasks.push({ ...plan.Tasks[i] });
      }
    }
    let newPlan = { ...plan, Tasks: tasks };

    return newPlan;
  }
  function returnTasks(data, idx) {
    let color = "bg-gray-100 odd:bg-gray-200";
    let textColor = "";

    if (data.Notes) {
      textColor = "text-red-400";
    }
    if (data.checked) {
      color = "bg-green-100";
    }
    if (data.Color) {
      switch (data.Color) {
        case "Yellow":
          color = "bg-yellow-300";
          break;

        default:
          break;
      }
    }
    if (data.Spacer) {
      return (
        <div
          className={`w-full mt-1 h-6  border bg-yellow-300 flex flex-row justify-start align-middle px-10`}
          key={idx}
        >
          {data.Title}
        </div>
      );
    }
    return (
      <div
        className={`w-full mt-1 h-6  border flex flex-row justify-start align-middle px-10 ${color}`}
        key={idx}
      >
        <div
          className="w-5 h-5 text-sm border border-black  hover:bg-yellow-100"
          onClick={() => {
            setPlanData(toggleTask(planData, data.uuid));
          }}
        >
          {data.checked == true ? "X" : ""}
        </div>

        <div
          onClick={() => {
            setNotes(data.Notes);
            if (data.Notes) {
              setNotesShown(" visible ");
            }
          }}
          className={`mx-6 h-6 flex flex-row justify-start ${textColor}  flex-1`}
        >
          {" "}
          {data.Title}{" "}
        </div>
        <div className="mx-6 h-6 flex-1">{data.Responsible}</div>
        <div className="mx-6 h-6 flex-1"> {data.Start} </div>
        <div className="mx-6 h-6 flex-1">{data.Completed}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden max-h-screen h-screen items-center justify-center min-h-screen py-2">
      <Head>
        <title>Dev Ops Cutover Planner</title>
      </Head>
      <div
        onClick={() => {
          setLocShown(" hidden ");
        }}
        className={`${locShown}  flex flex-row justify-center items-center absolute left-0 top-0 w-full h-full`}
      >
        <div className="bg-gray-400 opacity-40 absolute left-0 top-0 w-full h-full z-0" />
        <div className="border-4 px-5 py-5  border-gray-600 bg-yellow-400 rounded-xl w-3/4 z-10">
          <div className="w-full h-12 rounded-xl bg-white text-2xl flex flex-col items-center justify-center">
            Code Locations
          </div>
          {planData?.Locs && <LocationDiv Locs={planData.Locs}></LocationDiv>}
        </div>
      </div>

      <div
        className={`${notesShown}  flex flex-row justify-center items-center absolute left-0 top-0 w-full h-full`}
      >
        <div className="bg-gray-400 opacity-40 absolute left-0 top-0 w-full h-full z-0" />
        <div className="border-4 px-5 py-5 flex flex-col justify-center items-center   border-gray-600 bg-yellow-400 rounded-xl w-3/4 z-10">
          <div className="w-full h-12 rounded-xl bg-white text-2xl flex flex-col items-center justify-center">
            Notes
          </div>
          <div className="w-full min-h-36 mt-2 py-5  rounded-xl bg-white text-xl flex flex-col items-center justify-center">
            {notes &&
              notes.map((ele, idx) => (
                <div className="w-full px-10 mt-3" key={idx}>
                  {ele}
                </div>
              ))}
          </div>
          <div
            onClick={() => {
              setNotesShown(" hidden ");
            }}
            className="mt-4 w-full text-2xl h-12 hover:bg-blue-400 flex flex-row justify-center items-center rounded-xl border bg-blue-200"
          >
            Close
          </div>
        </div>
      </div>

      <main className="flex h-full flex-col  max-h-3/4  select-none  flex-wrap items-center justify-center w-full flex-1 text-center">
        <div className="flex border border-gray-500 flex-col select-none bg-gray-200 items-center justify-start w-full text-center self-start">
          <div className="h-14 w-full bg-gray-300 text-xl  font-bold flex flex-row justify-start items-center px-10 ">
            <div className=" w-64 h-full min-h-full text-lg flex flex-row items-center justify-start">
              <img className="w-12 h-12 mr-10" src="/CutoverPlanner.svg"></img>
              Cutover Planner
            </div>
            <div className="flex-1"> </div>
            <select
              onChange={(evt) => {
                console.log(evt.target.value);
                setSelPlan(evt.target.value);
              }}
              className="w-72"
              value={selPlan}
            >
              {" "}
              {planList?.map((el, idx) => (
                <option key={idx} value={el}>
                  {el}
                </option>
              ))}{" "}
            </select>
            <div
              title="Select Plan"
              onClick={async () => {
                let cutoverResponse = await fetch(
                  "http://gd10appt0043:8152/CutOver/CutOver/getPlanWithName/" +
                    selPlan
                );
                let cutovers = await cutoverResponse.text();
                console.log(cutovers);
                setPlanData(generateTaskBoiler(yaml.load(cutovers)));
              }}
              className="w-12 h-12 ml-10 border rounded-xl shadow-md bg-gray-50 flex flex-row justify-center items-center"
            >
              <BsDownload className="w-4/5 h-4/5 hover:text-yellow-300 active:text-yellow-500 select-none"></BsDownload>
            </div>
            <div
              title="New Plan"
              className="w-12 h-12 border ml-3 rounded-xl shadow-md bg-gray-50 flex flex-row justify-center items-center"
            >
              <label
                for="file"
                className="w-12 h-12 flex flex-row justify-center items-center"
              >
                <AiFillFileAdd
                  className="w-4/5 h-4/5 hover:text-yellow-300 active:text-yellow-500 select-none"
                  onClick={() => {}}
                  type="file"
                />
              </label>
              <input
                type="file"
                className="hidden"
                id="file"
                placeholder="Your name"
                onChange={async (evt) =>
                  setPlanData(
                    generateTaskBoiler(
                      yaml.load(await evt.target.files[0].text())
                    )
                  )
                }
              />
            </div>
            <div
              title="Show Code Locations"
              onClick={() => {
                setLocShown(" visibile ");
              }}
              className="w-12 h-12 border ml-3 rounded-xl shadow-md bg-gray-50 flex flex-row justify-center items-center"
            >
              <MdLocationOn className="w-4/5 h-4/5 hover:text-yellow-300 active:text-yellow-500 select-none"></MdLocationOn>
            </div>
          </div>
          <div className="h-6 w-1/2 text-xl font-bold">{planData?.Name}</div>
          <div className="h-6 w-full px-40 mt-2 flex flex-row justify-start items-start">
            <div className="h-6 flex-1   flex flex-row justify-end mx-10 items-start  ">
              Coordinator
            </div>
            <div className="h-6 flex-1  flex flex-row justify-start mx-10 items-start  ">
              {planData?.Coordinator}
            </div>
          </div>
          {planData && (
            <div className="h-6 w-full px-40   flex flex-row justify-start items-start">
              <div className="h-6 flex-1  flex flex-row justify-end mx-10 items-start ">
                Application
              </div>

              <div className="h-6 flex-1  flex flex-row justify-start mx-10 items-start  ">
                {planData?.AppName + "  " + planData?.Enviornment}
              </div>
            </div>
          )}

          <div className="h-6 w-full px-40   flex flex-row justify-start items-start">
            <div className="h-6 flex-1  flex flex-row justify-end mx-10 items-start ">
              Version
            </div>
            <div className="h-6 flex-1  flex flex-row justify-start mx-10 items-start  ">
              {planData?.AppVersion}
            </div>
          </div>
        </div>
        <div
          className={`w-full mt-1 h-8 text-lg  border bg-gray-100 flex flex-row justify-start align-middle px-10`}
        >
          <div className="w-5 h-6" />
          <div className="mx-6 h-6 flex flex-row justify-start  flex-1">
            Title
          </div>
          <div className="mx-6 h-6 flex-1">Party</div>
          <div className="mx-6 h-6 flex-1">Planned Start </div>
          <div className="mx-6 h-6 flex-1">Completed</div>
        </div>
        <div className="w-full flex-1 overflow-y-scroll">
          {planData?.Tasks?.map((element, idx) => returnTasks(element, idx))}
        </div>
      </main>

      <footer className="flex  select-none  items-center justify-center w-full h-24 border-t">
        <div
          onClick={() => {
            const workbook = new ExcelJS.Workbook();
            //create tasks sheet
            var sheet = workbook.addWorksheet(planData.Name);

            sheet.columns = [
              { header: "Task", key: "id", width: 85 },
              { header: "Party", key: "id", width: 30 },
              { header: "Start", key: "id", width: 30 },
              { header: "Completed", key: "id", width: 30 },
            ];

            sheet.getRow(1).height = 24;
            let i = 0;

            for (i = 0; i < planData.Tasks.length; i++) {
              if (planData.Tasks[i].Spacer) {
                sheet.getRow(i + 2).getCell(1).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(i + 2).getCell(2).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(i + 2).getCell(3).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(i + 2).getCell(4).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
              }
              sheet.getRow(i + 2).getCell(1).value = planData.Tasks[i].Title;

              sheet.getRow(i + 2).getCell(2).value =
                planData.Tasks[i].Responsible;

              sheet.getRow(i + 2).getCell(3).value = planData.Tasks[i].Start;

              sheet.getRow(i + 2).getCell(4).value =
                planData.Tasks[i].Completed;
              //create other data sheet
            }
            if (planData.Locs) {
              sheet = workbook.addWorksheet("Code Locations");
              sheet.columns = [{ width: 5 }, { width: 50 }, { width: 100 }];

              let loc = 2;
              for (i = 0; i < planData.Locs.length; i++) {
                sheet.getRow(loc).getCell(2).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(loc).getCell(3).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(loc).getCell(2).value = "Name";
                sheet.getRow(loc).getCell(3).value = planData.Locs[i].Title;
                sheet.getRow(loc).getCell(3).font = {
                  size: 14,
                  bold: true,
                };
                loc = loc + 1;
                sheet.getRow(loc).getCell(2).value = "Location";
                sheet.getRow(loc).getCell(3).value = {
                  text: "Location",
                  hyperlink: planData.Locs[i].Locations,
                };
                sheet.getRow(loc).getCell(3).font = {
                  color: { argb: "ffff00ff" },
                  size: 14,
                  bold: true,
                };
                loc = loc + 1;
                sheet.getRow(loc).getCell(2).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(loc).getCell(3).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(loc).getCell(2).value = "Target";
                sheet.getRow(loc).getCell(3).value = planData.Locs[i].Target;
                loc = loc + 1;
                sheet.getRow(loc).getCell(2).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(loc).getCell(3).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffc72c" },
                  bgColor: { argb: "ffffc72c" },
                };
                sheet.getRow(loc).getCell(2).value = "Files";
                sheet.getRow(loc).getCell(3).value = planData.Locs[i].Files;
                loc = loc + 1;

                loc = loc + 1;
              }
            }
            workbook.xlsx.writeBuffer().then(function (data) {
              var blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");

              a.href = url;
              a.download = planData.Name + ".xlsx";
              a.click();
              URL.revokeObjectURL(url);
            });
          }}
          className="select-none px-10 h-10 flex flex-row justify-center items-center rounded-lg border border-gray-700 bg-blue-400 hover:bg-blue-300 active:bg-blue-700"
        >
          Save Cutover as CSV
        </div>
      </footer>
    </div>
  );
}
