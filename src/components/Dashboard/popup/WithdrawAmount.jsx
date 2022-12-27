const WithdrawAmount = ({ value, show }) => {
  return (
    <>
      <div className="text-white text-center relative py-8 px-5 md:px-10 nodetype-bg border-[#14206A] border-2 rounded-3xl -3xl">
        <p>Withdrawl of {value} TRON is Successful</p>
        <div
          className=" cursor-pointer outline-none border-none absolute top-0 right-0 mt-4 mr-5 text-[#CFD6FE] transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          onClick={() => {
            show();
          }}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </div>
      </div>
    </>
  );
};
export default WithdrawAmount;
