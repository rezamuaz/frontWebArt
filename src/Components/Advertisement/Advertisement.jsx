const Advertisement = () => {
  return (
    <div className="fixed z-50 h-screen w-screen">
      <div className="relative top-32 float-left h-fit w-2/12 bg-slate-500 ">
        <div className="sticky top-0 z-30 h-64 w-full bg-violet-500">
          Advertisement
        </div>
      </div>
      <div className="relative top-32 float-right h-56 w-2/12 bg-slate-500 ">
        <div className="sticky top-0 z-30 h-64 w-full bg-violet-500">
          Advertisement
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
