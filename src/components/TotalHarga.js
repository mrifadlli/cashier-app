import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class TotalHarga extends Component {
  submitTotalPesanan = (totalBayar) => {
    const transaksi = {
      totalHarga: totalBayar,
      menu: this.props.keranjang,
    };
    axios
      .post(API_URL + "transaksi", transaksi)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const totalBayar = this.props.keranjang.reduce(function (result, item) {
      return result + item.totalHarga;
    }, 0);
    return (
      <div>
        <Row>
          <hr />
          <hr />
          <Col className="display-totalBayar">
            <h5>
              <strong>Total Bayar: </strong>
            </h5>
          </Col>
          <Col className="display-harga">
            <h5>
              <strong>Rp. {numberWithCommas(totalBayar)}</strong>
            </h5>
          </Col>
          <hr />
          <hr />
          <Button
            variant="outline-success"
            className="btn-byr"
            as={Link}
            to="/success"
            onClick={() => this.submitTotalPesanan(totalBayar)}
          >
            Bayar
          </Button>
        </Row>
      </div>
    );
  }
}
