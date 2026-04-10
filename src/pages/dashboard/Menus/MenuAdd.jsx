import React, { useState } from "react";
import { FormButton } from "../../../components/common/FormButton";
import { useLocalStorage } from "react-use";
import { menuAdd } from "../../../lib/api/MenuApi";
import { alertError, alertSuccess } from "../../../lib/alert";
import { useNavigate } from "react-router";
import { CircleX } from "lucide-react";
import MenuForm from "../../../components/common/MenuForm";
import BackButton from "../../../components/common/BackButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MenuAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    calories: 0,
    price: 0,
    stock: 0,
    isFeatured: 0,
  });
  const [accessToken, _] = useLocalStorage("access-token", "");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await menuAdd(
        {
          name: formData.name,
          description: formData.description,
          image: formData.image,
          price: formData.price,
          calories: formData.calories,
          stock: formData.stock,
          isFeatured: formData.isFeatured,
        },
        accessToken,
      );
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 201) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("menus");
      await alertSuccess("Menu added successfully.");
      navigate("/dashboard/menus");
    },
    onError: (error) => {
      alertError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex flex-col gap-y-4">
      <BackButton
        className={"self-start hover:text-primary transition duration-200"}
      />
      <h2 className="font-poppins text-5xl font-bold pb-4">ADD MENU</h2>
      <MenuForm
        className="bg-surface rounded-2xl shadow-text-muted shadow-md/20 p-4"
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        btnTitle={"Add Menu"}
      />
    </div>
  );
};

export default MenuAdd;
