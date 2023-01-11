import React, { useEffect, useState } from "react";
import "../investment.css";
import useEncryption from "../../EncryptData/EncryptData";
import instance from "../../BaseUrl/BaseUrl";
import toast from "react-hot-toast";

function Trading() {
  const [isReward, setIsReward] = useState([]);
  console.log("🚀 ~ Trading ~ isReward", isReward);
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
        <table className="responsive-table border1">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Rewards</th>
            </tr>
          </thead>
          {isReward?.length === 0 || isReward === undefined ? (
            <tbody>
              <>
                <tr>
                  <td data-title="Date">_</td>
                  <td data-title="Rewards">_</td>
                </tr>
              </>
            </tbody>
          ) : (
            <tbody>
              {isReward?.map((items) => (
                <>
                  <tr>
                    <td data-title="Date">
                      {new Date(items?.createdAt)?.toDateString().slice(4)}
                    </td>
                    <td data-title="Rewards">{items?.rewards}</td>
                  </tr>
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default Trading;
