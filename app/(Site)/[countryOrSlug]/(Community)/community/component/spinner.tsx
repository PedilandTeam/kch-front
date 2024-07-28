function Spinner({ color = "warning" }: any) {
  return (
    <div className="w-full max-w-[72rem] min-h-[20rem] bg-white flex flex-col justify-center items-center">
      <span
        className={`loading loading-spinner text-${color} loading-lg`}
      ></span>
    </div>
  );
}

export default Spinner;
