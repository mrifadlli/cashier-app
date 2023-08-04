import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

function Transaksi(props) {
  const [rekaps, setRekap] = useState([]);

  const getRekap = async () => {
    try {
      let response = await axios.get(API_URL + "transaksi");
      setRekap(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getRekap();
  }, []);

  return (
    <div className="py5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Total Bayar</th>
                </tr>
              </thead>
              <tbody>
                {rekaps &&
                  rekaps.map((rekap, index) => {
                    return (
                      <tr key={index}>
                        <td>{rekap.id}</td>
                        <td>Rp. {numberWithCommas(rekap.totalHarga)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaksi;
