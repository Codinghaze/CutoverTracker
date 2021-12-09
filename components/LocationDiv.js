function LocationRecord(props) {
  return (
    <div className="w-full  border bg-gray-100 mt-5 h-32 rounded-xl shadow-sm text-2xl flex flex-col items-center justify-center">
      <div className="w-full flex justify-center items-center text-lg underline">
        {props.Title}
      </div>
      <div className="w-full flex justify-center items-center text-lg text-purple-600 font-bold">
        {props.Location}
      </div>
      <div className="w-full flex justify-center items-center text-lg ">
        Targets : {props.Target}
      </div>
      <div className="w-full flex justify-center items-center text-lg ">
        Files : {props.Files}
      </div>
    </div>
  );
}

export default function LocationDiv(props) {
  console.log(props.Locs);
  return (
    <div className="w-full">
      {props.Locs?.map((ele, idx) => {
        return (
          <LocationRecord
            key={idx}
            Title={ele.Title}
            Location={ele.Locations}
            Target={ele.Target}
            Files={ele.Files}
          ></LocationRecord>
        );
      })}
    </div>
  );
}
