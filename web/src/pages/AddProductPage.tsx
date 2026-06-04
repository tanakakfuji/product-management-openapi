import React, { useState } from "react";
import { useCreateProduct } from "../api/api";

const AddProductPage = () => {
  const { mutate, isError, error } = useCreateProduct();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      setMessage("商品名と価格は必須入力です。");
      return;
    }

    mutate(
      {
        data: {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
        },
      },
      {
        onSuccess: () => {
          setMessage("商品を登録しました！");

          setFormData({ name: "", description: "", price: "" });
        },
        onError: (err) => {
          console.error(err);
          setMessage("登録に失敗しました。もう一度お試しください。");
        },
      },
    );
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>商品新規登録</h1>

      {message && <div style={messageStyle}>{message}</div>}
      {isError && (
        <div style={{ ...messageStyle, color: "red" }}>
          エラー: {(error as any)?.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>
            商品名 <span style={requiredStyle}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            placeholder="例: 高級コーヒー豆"
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>説明</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ ...inputStyle, height: "100px", resize: "vertical" }}
            placeholder="商品の詳細を入力してください"
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>
            価格 (円) <span style={requiredStyle}>*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={inputStyle}
            placeholder="例: 1500"
            min="0"
            required
          />
        </div>

        <button type="submit" style={buttonStyle}>
          商品を登録する
        </button>
      </form>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "0 20px",
  fontFamily: "sans-serif",
};

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
};

const formStyle: React.CSSProperties = {
  background: "#f9f9f9",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #eee",
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  color: "#555",
  fontSize: "14px",
};

const requiredStyle: React.CSSProperties = {
  color: "red",
  marginLeft: "4px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const messageStyle: React.CSSProperties = {
  marginBottom: "20px",
  padding: "12px",
  borderRadius: "4px",
  backgroundColor: "#eef6ff",
  color: "#0070f3",
  fontWeight: "bold",
  fontSize: "14px",
};

export default AddProductPage;
