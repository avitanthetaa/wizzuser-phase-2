import React, { useEffect, useState } from "react";
import "../investment.css";
import useEncryption from "../../EncryptData/EncryptData";
import instance from "../../BaseUrl/BaseUrl";
import toast from "react-hot-toast";

function Trading() {
  const [isReward, setIsReward] = useState([]);
  const { encryptData, decryptData } = useEncryption();

  const Rewards = async () => {
    try {
      const result = await instance.get("/rewardsHistory");
      // const localData = localStorage.getItem("details", result.data.data)

      const results = decryptData(result.data.data);

      setIsReward(results.history);

      if (results.status) {
        toast.success(results.message);
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };

  useEffect(() => {
    Rewards();
  }, []);

  return (
    <>
      <p className="text-white text-2xl font-bold text-center mt-10 ">
         Rewards Received
      </p>
      <div className="container mx-auto px-10 ">
        <table class="responsive-table rounded-2xl">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Rewards</th>
            </tr>
          </thead>

          <tbody>
            {isReward?.map((item, index) => (
              <tr key={index}>
                <td data-title="Rewards">
                  {new Date(item?.createdAt)?.toDateString().slice(4)}
                </td>
                <td data-title="Date">
                  {item.rewards}{" "}
                  {console.log(new Date(item?.createdAt)?.toDateString())}
                </td>
              </tr>
            ))}
            {/* <tr>
              <td data-title="Date">_</td>
              <td data-title="Smart NODE">_</td>
              <td data-title="Power NODE">_</td>
              <td data-title="Master NODE">_</td>
              <td data-title="Total NODES">_</td>
              <td data-title="Rewards Received">_</td>
            </tr>
            <tr>
              <td data-title="Date">_</td>
              <td data-title="Smart NODE">_</td>
              <td data-title="Power NODE">_</td>
              <td data-title="Master NODE">_</td>
              <td data-title="Total NODES">_</td>
              <td data-title="Rewards Received">_</td>
            </tr>
            <tr>
              <td data-title="Date">_</td>
              <td data-title="Smart NODE">_</td>
              <td data-title="Power NODE">_</td>
              <td data-title="Master NODE">_</td>
              <td data-title="Total NODES">_</td>
              <td data-title="Rewards Received">_</td>
            </tr>
            <tr>
              <td data-title="Date">_</td>
              <td data-title="Smart NODE">_</td>
              <td data-title="Power NODE">_</td>
              <td data-title="Master NODE">_</td>
              <td data-title="Total NODES">_</td>
              <td data-title="Rewards Received">_</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Trading;
