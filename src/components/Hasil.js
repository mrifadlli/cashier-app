import React, { Component } from "react";
import { Col, Row, ListGroup, Badge, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalHarga from "./TotalHarga";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Hasil extends Component {
  tambah = (values) => {
    axios
      .get(API_URL + "keranjang?products.id=" + values.products.id)
      .then((res) => {
        const keranjangs = {
          jumlah: res.data[0].jumlah + 1,
          totalHarga: res.data[0].totalHarga + values.products.harga,
          products: values.products,
        };
        axios
          .put(API_URL + "keranjang/" + res.data[0].id, keranjangs)
          .then((res) => {
            this.props.getListKeranjang();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  kurang = (values) => {
    axios
      .get(API_URL + "keranjang?products.id=" + values.products.id)
      .then((res) => {
        const keranjangs = {
          jumlah: res.data[0].jumlah - 1,
          totalHarga: res.data[0].totalHarga - values.products.harga,
          products: values.products,
        };
        if (keranjangs.jumlah === 0) {
          axios.delete(API_URL + "keranjang/" + res.data[0].id).then((res) => {
            this.props.getListKeranjang();
          });
        } else {
          axios
            .put(API_URL + "keranjang/" + res.data[0].id, keranjangs)
            .then((res) => {
              this.props.getListKeranjang();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { keranjang } = this.props;

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Pesanan</strong>
        </h4>
        <hr />
        {keranjang.length !== 0 && (
          <ListGroup variant="flush">
            {keranjang.map((menuKeranjang) => (
              <ListGroup.Item key={menuKeranjang.id}>
                <Row>
                  <Col xs={2}>
                    <h6>
                      <Badge bg="success">{menuKeranjang.jumlah}</Badge>
                    </h6>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.products.nama}</h5>
                    <p>Rp. {numberWithCommas(menuKeranjang.products.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="ttl">
                      Rp. {numberWithCommas(menuKeranjang.totalHarga)}
                    </strong>
                    <br />
                    <br />

                    <Button
                      variant="outline-success"
                      className="jarak"
                      size="sm"
                      onClick={() => this.tambah(menuKeranjang)}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => this.kurang(menuKeranjang)}
                    >
                      -
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        <TotalHarga keranjang={keranjang} />
      </Col>
    );
  }
}
