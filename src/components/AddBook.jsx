import { MdOutlineAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      judul: "",
      catatan: "",
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleSubmitForm = (data) => {
    const existingCatatan = JSON.parse(localStorage.getItem("catatan")) || [];
    const newBook = {
      id: existingCatatan.length + 1,
      title: data?.judul,
      body: data?.catatan,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    existingCatatan.push(newBook);
    localStorage.setItem("catatan", JSON.stringify(existingCatatan));
    setOpen(!open);
  };
  return (
    <>
      <div
        className="toogle  px-2 py-2 rounded-full ring-1 ring-green-500 bg-green-500 hover:bg-green-400 hover:cursor-pointer"
        onClick={handleOpen}
      >
        <MdOutlineAdd className="text-2xl text-white" />
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Tambah Catatan</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="judul flex flex-col gap-1">
              <label
                htmlFor="judul"
                className="font-sans font-semibold text-blue-gray-900"
              >
                Judul
              </label>
              <input
                type="text"
                placeholder="Masukkan Judul Catatan"
                className="ring-1 placeholder:font-sans ring-gray-400 py-1 rounded-md outline-none border-none focus:ring-2 px-3 text-gray-700"
                {...register("judul", {
                  min: 5,
                  required: "Judul wajib diisi",
                })}
              />
              <span className="text-red-500 font-sans text-sm mt-1">
                {errors?.judul?.message}
              </span>
            </div>
            <div className="judul flex flex-col gap-1 mt-4">
              <label
                htmlFor="judul"
                className="font-sans font-semibold text-blue-gray-900"
              >
                Catatan
              </label>
              <textarea
                placeholder="Masukkan Isi Catatan"
                className="ring-1 resize-none ring-gray-400 py-1 rounded-md outline-none border-none focus:ring-2 px-3 text-gray-700"
                {...register("catatan", {
                  min: 5,
                  required: "Catatan wajib diisi",
                })}
              ></textarea>
              <span className="text-red-500 font-sans text-sm mt-1">
                {errors?.catatan?.message}
              </span>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 bg-red-500 text-white hover:bg-red-400"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="text"
            onClick={handleSubmit(handleSubmitForm)}
            className="mr-1 bg-green-500 text-white hover:bg-green-400"
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddBook;
