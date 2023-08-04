import React, { Component } from "react";
import { ListCategories, Hasil, Menus } from "../components";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelected: "Makanan",
      keranjang: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categorySelected)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListKeranjang();
  }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categorySelected: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (values) => {
    axios
      .get(API_URL + "keranjang?products.id=" + values.id)
      .then((res) => {
        console.log(values);
        if (res.data.length === 0) {
          const keranjangs = {
            jumlah: 1,
            totalHarga: values.harga,
            products: values,
          };
          axios
            .post(API_URL + "keranjang", keranjangs)
            .then((res) => {
              this.getListKeranjang();
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: keranjangs.products.nama + " ditambah ke keranjang.",
                timer: 1500,
                showCancelButton: false,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjangs = {
            jumlah: res.data[0].jumlah + 1,
            totalHarga: res.data[0].totalHarga + values.harga,
            products: values,
          };
          axios
            .put(API_URL + "keranjang/" + res.data[0].id, keranjangs)
            .then((res) => {
              this.getListKeranjang();
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: keranjangs.products.nama + " ditambah ke keranjang.",
                timer: 1500,
                showCancelButton: false,
                showConfirmButton: false,
              });
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
    const { menus, categorySelected, keranjang } = this.state;
    return (
      <div className="App">
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categorySelected={categorySelected}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil
                keranjang={keranjang}
                masukKeranjang={this.masukKeranjang}
                getListKeranjang={this.getListKeranjang}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
