import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table, Tag, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../styles/EditBill.scss";
import moment from "moment";
import "moment/locale/vi";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

function StaffBill() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const result = async () =>{
    const ressponse =  await  axios
    .get("http://localhost:5000/api/staff//all-orders", token)
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));

    return ressponse?.data
  }
  useEffect(() => {
    result()
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "_id",
      render: (_id, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Người đặt",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH: mm"),
    },
    {
      title: "Tên món",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <>
          {product.map((p) => (
            <div key={p._id}>- {p.nameprod}</div>
          ))}
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => <span>{`${totalPrice.toLocaleString()}₫`}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Chưa xác nhận":
            color = "orange";
            break;
          case "Đã hoàn thành giao đơn hàng":
            color = "green";
            break;
          case "Đang giao":
            color = "blue";
            break;
          case "Đã xác nhận":
            color = "purple";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Lựa chọn",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`/Staff/manage-bill/edit/${record._id}`}>
            <EditOutlined /> Sửa
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="managebill">Danh sách các hóa đơn</h2>
     <Table columns={columns} dataSource={data.orders} rowKey="_id" />
    </div>
  );
}

export default StaffBill;
