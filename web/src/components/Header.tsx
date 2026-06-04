import { Link } from "react-router";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>デモECサイト</div>

      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          商品一覧
        </Link>
        <Link to="/addProduct" style={linkStyle}>
          商品追加
        </Link>
      </nav>
    </header>
  );
};

// --- インラインスタイルの定義（シンプルなレイアウト用） ---
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
};

const logoStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const navStyle = {
  display: "flex",
  gap: "15px", // ボタン同士の間隔
};

const linkStyle = {
  padding: "8px 16px",
  backgroundColor: "#555",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Header;
