import { useEffect, useState } from "react";
import type { Product } from "../api/model";
import { getOpenAPIDefinition } from "../api/client";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const client = getOpenAPIDefinition();
      const response = await client.getProducts();

      setProducts(response?.data);
    } catch {
      setError(true);
      alert("取得処理に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラーが発生しました。</div>;
  }

  const handleClick = async (e) => {
    const productId = Number(e.target.value);
    try {
      const client = getOpenAPIDefinition();
      const response = await client.deleteProduct(productId);
      if (response.status === 204) {
        setProducts(products.filter((p) => p.id !== productId));
      }
    } catch {
      alert("削除処理に失敗しました。");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">商品一覧</h1>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    商品名
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    説明
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:pr-6"
                  >
                    価格
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:pr-6"
                  >
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {p.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-indigo-600">
                      {p.name}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {p.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-mono tabular-nums text-gray-900 sm:pr-6">
                      ¥{Number(p.price).toLocaleString()}
                    </td>
                    <td>
                      <button
                        type="button"
                        value={p.id}
                        onClick={handleClick}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
