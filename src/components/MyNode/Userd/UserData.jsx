import React from "react";

function UserData() {
  return (
    <>
      <div class="container mx-auto mt-7 flex justify-center items-center px-10">
        <table class="rwd-table  md:w-full w-max mx-auto text-center  text-[#19287D] ">
          <tbody className="">
            <tr>
              <th>Name</th>
              <th>Warrior</th>
              <th>Date/Time</th>
              <th>Rewards</th>
              <th>Status</th>
              <th>Tax</th>
              <th>RPC</th>
            </tr>
            <tr>
              <td data-th="Supplier Code ">UPS5005</td>
              <td data-th="Supplier Name">UPS</td>
              <td data-th="Invoice Number">ASDF19218</td>
              <td data-th="Invoice Date">06/25/2022</td>
              <td data-th="Due Date">12/25/2022</td>
              <td data-th="Net Amount">$8,322.12</td>
              <td data-th="Net Amount">$8,322.12</td>
            </tr>

            <tr>
              <td data-th="Supplier Code">UPS3449</td>
              <td data-th="Supplier Name">UPS South Inc.</td>
              <td data-th="Invoice Number">ASDF29301</td>
              <td data-th="Invoice Date">6/24/2022</td>
              <td data-th="Due Date">12/25/2022</td>
              <td data-th="Net Amount">$3,255.49</td>
              <td data-th="Net Amount">$8,322.12</td>
            </tr>
            <tr>
              <td data-th="Supplier Code">BOX5599</td>
              <td data-th="Supplier Name">BOX Pro West</td>
              <td data-th="Invoice Number">ASDF43000</td>
              <td data-th="Invoice Date">6/27/2022</td>
              <td data-th="Due Date">12/25/2022</td>
              <td data-th="Net Amount">$45,255.49</td>
              <td data-th="Net Amount">$8,322.12</td>
            </tr>
            <tr>
              <td data-th="Supplier Code">PAN9999</td>
              <td data-th="Supplier Name">Pan Providers and Co.</td>
              <td data-th="Invoice Number">ASDF33433</td>
              <td data-th="Invoice Date">6/29/2022</td>
              <td data-th="Due Date">12/25/2022</td>
              <td data-th="Net Amount">$12,335.69</td>
              <td data-th="Net Amount">$8,322.12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserData;
