import { FiSearch } from "react-icons/fi";
import AddBook from "../components/AddBook";
import { useEffect, useState } from "react";
import moment from "moment";
const Homepage = () => {
  const [catatan, setCatatan] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCatatan, setFilteredCatatan] = useState([]);
  useEffect(() => {
    const existingCatatan = JSON.parse(localStorage.getItem("catatan")) || [];
    setCatatan(existingCatatan);
  }, []);
  const handleDelete = (id) => {
    const updatedCatatan = catatan.filter((book) => book.id !== id);
    setCatatan(updatedCatatan);
    localStorage.setItem("catatan", JSON.stringify(updatedCatatan));
  };
  const handleArsip = (id) => {
    const updatedArsipCatatan = catatan.map((arsip) =>
      arsip.id === id ? { ...arsip, archived: true } : arsip
    );
    setCatatan(updatedArsipCatatan);
    localStorage.setItem("catatan", JSON.stringify(updatedArsipCatatan));
  };
  const handleUnArsip = (id) => {
    const updatedArsipCatatan = catatan.map((arsip) =>
      arsip.id === id ? { ...arsip, archived: false } : arsip
    );
    setCatatan(updatedArsipCatatan);
    localStorage.setItem("catatan", JSON.stringify(updatedArsipCatatan));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchCatatan = catatan.filter((book) =>
      book?.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCatatan(searchCatatan);
  };
  return (
    <>
      <div className="bg-[#eff6ff] py-3">
        <nav className="w-[90%] m-auto  flex justify-between items-center">
          <div className="logo">
            <h1 className="text-xl font-sans md:text-2xl uppercase text-blue-500 font-bold">
              Notes Book
            </h1>
          </div>
          <div className="menu">
            <div className="search">
              <form onSubmit={handleSearch}>
                <div className="formSearch relative">
                  <input
                    type="text"
                    placeholder="Cari Buku"
                    className="px-10 ring-1 py-[6px] focus:outline-gray-500 outline-none border-none font-sans placeholder:font-sans rounded-md ring-slate-400"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <FiSearch className="absolute top-[10px] left-3" />
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>

      <div className="w-[90%] m-auto mt-14">
        <div className="list-book">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-sans font-bold uppercase text-gray-800">
              List Buku
            </h1>
            <AddBook />
          </div>

          <div className="notes-list mt-10">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCatatan.length !== 0 ? (
                filteredCatatan?.map((item, i) => (
                  <li
                    className="note-card px-5 py-4 bg-[#f3f2f2] rounded-md"
                    key={i}
                  >
                    <h1 className="font-sans text-lg font-bold uppercase text-gray-800 ">
                      {item?.title}
                    </h1>
                    <h5 className="text-sm text-gray-600 mt-1">
                      {moment(item?.createdAt).format("LL")}
                    </h5>
                    <p className="mt-5 font-sans text-gray-700">{item?.body}</p>
                    <div className="feature mt-5 flex items-center gap-4">
                      <button
                        className="px-4 py-2 bg-red-400 rounded-lg font-medium text-white"
                        onClick={() => handleDelete(item?.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-4 py-2 bg-green-500 rounded-lg font-medium text-white"
                        onClick={() => handleArsip(item?.id)}
                      >
                        Arsip
                      </button>
                    </div>
                  </li>
                ))
              ) : catatan?.length !== 0 ? (
                catatan
                  ?.filter((item) => !item?.archived)
                  .map((item, i) => (
                    <li
                      className="note-card px-5 py-4 bg-[#f3f2f2] rounded-md"
                      key={i}
                    >
                      <h1 className="font-sans text-lg font-bold uppercase text-gray-800 ">
                        {item?.title}
                      </h1>
                      <h5 className="text-sm text-gray-600 mt-1">
                        {moment(item?.createdAt).format("LL")}
                      </h5>

                      <p className="mt-5 font-sans text-gray-700">
                        {item?.body}
                      </p>
                      <div className="feature mt-5 flex items-center gap-4">
                        <button
                          className="px-4 py-2 bg-red-400 rounded-lg font-medium text-white"
                          onClick={() => handleDelete(item?.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 rounded-lg font-medium text-white"
                          onClick={() => handleArsip(item?.id)}
                        >
                          Arsip
                        </button>
                      </div>
                    </li>
                  ))
              ) : (
                <h1 className="font-sans text-gray-600 font-semibold text-lg uppercase italic">
                  Tidak ada Catatan
                </h1>
              )}
            </ul>
          </div>
        </div>

        <div className="arsip-book mt-16">
          <h1 className="text-2xl font-sans font-bold uppercase text-gray-800">
            Arsip Buku
          </h1>
          <div className="notes-list mt-10">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {catatan?.length !== 0 ? (
                catatan
                  ?.filter((item) => item?.archived)
                  .map((item, i) => (
                    <li
                      className="note-card px-5 py-4 bg-[#f3f2f2] rounded-md"
                      key={i}
                    >
                      <h1 className="font-sans text-lg font-bold uppercase text-gray-800 ">
                        {item?.title}
                      </h1>
                      <h5 className="text-sm text-gray-600 mt-1">
                        {moment(item?.createdAt).format("LL")}
                      </h5>
                      <p className="mt-5 font-sans text-gray-700">
                        {item?.body}
                      </p>
                      <div className="feature mt-5 flex items-center gap-4">
                        <button
                          className="px-4 py-2 bg-red-400 rounded-lg font-medium text-white"
                          onClick={() => handleDelete(item?.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 rounded-lg font-medium text-white"
                          onClick={() => handleUnArsip(item?.id)}
                        >
                          UnArsip
                        </button>
                      </div>
                    </li>
                  ))
              ) : (
                <h1 className="font-sans text-gray-600 font-semibold text-lg uppercase italic">
                  Tidak ada Arsip
                </h1>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
