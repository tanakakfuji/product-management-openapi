import { useState } from "react";
import type { ProductForm } from "../api/model";
import { getOpenAPIDefinition } from "../api/client";
import { useNavigate } from "react-router";

const AddProductPage = () => {
  const [formData, setFormData] = useState<ProductForm>();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.name || !formData.description || !formData.price) {
      alert("全ての項目を入力してください。");
      return;
    }
    try {
      const client = getOpenAPIDefinition();
      const response = await client.createProduct(formData);
      if (response.status === 201) {
        navigate("/");
      }
    } catch {
      alert("削除処理に失敗しました。");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
        商品の登録
      </h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg p-6 sm:p-8">
          <form method="post" onSubmit={handleSubmit} className="space-y-6">
            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-0"
              >
                名前
              </label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="商品名を入力してください"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-0"
              >
                説明
              </label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData?.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="商品の説明を入力してください"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-0"
              >
                価格
              </label>
              <div className="sm:col-span-2">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">¥</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData?.price}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2.5 pl-7 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 font-mono sm:text-sm sm:leading-6"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <div className="hidden sm:block"></div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                >
                  送信
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
