import { useGetProducts } from "../api/api";

const HomePage = () => {
  const { data: products, isLoading, isError } = useGetProducts();

  if (isLoading) {
    return <div style={loadingErrorStyle}>読み込み中...</div>;
  }

  if (isError || !products?.data) {
    return <div style={loadingErrorStyle}>エラーが発生しました。</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>商品一覧</h1>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>商品名</th>
              <th style={thStyle}>説明</th>
              <th style={thStyle}>価格</th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((p) => (
              <tr key={p.id} style={trStyle}>
                <td style={tdStyle}>{p.id}</td>
                <td style={{ ...tdStyle, ...boldStyle }}>{p.name}</td>
                <td style={{ ...tdStyle, ...descriptionStyle }}>
                  {p.description}
                </td>
                <td style={{ ...tdStyle, ...priceStyle }}>
                  ¥{Number(p.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "0 20px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#333",
};

const titleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  fontWeight: "600",
};

const tableContainerStyle = {
  width: "100%",
  overflowX: "auto", // 横スクロール対応（レスポンシブ）
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  borderRadius: "8px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff",
  textAlign: "left",
};

const thStyle = {
  backgroundColor: "#f8f9fa",
  color: "#4a5568",
  fontWeight: "600",
  padding: "16px",
  borderBottom: "2px solid #e2e8f0",
  fontSize: "14px",
};

const trStyle = {
  borderBottom: "1px solid #edf2f7",
  transition: "background-color 0.2s ease",
};

// 注意: 疑似クラス (:hover等) はインラインCSSでは表現できないため、
// より高度なインタラクションが必要な場合は CSS Modules や Tailwind CSS 等への移行をおすすめします。

const tdStyle = {
  padding: "16px",
  fontSize: "14px",
  color: "#4a5568",
  verticalAlign: "middle",
};

const boldStyle = {
  fontWeight: "500",
  color: "#1a202c",
};

const descriptionStyle = {
  color: "#718096",
  maxWidth: "400px",
  lineHeight: "1.5",
};

const priceStyle = {
  fontWeight: "600",
  color: "#2b6cb0", // アクセントのブルー
  textAlign: "right",
};

const loadingErrorStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  fontSize: "16px",
  color: "#4a5568",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
};

export default HomePage;
