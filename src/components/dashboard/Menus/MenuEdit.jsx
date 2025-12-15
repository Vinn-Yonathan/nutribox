import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { menuDetail, menuUpdate } from "../../../lib/api/MenuApi";
import { alertConfirm, alertError, alertSuccess } from "../../../lib/alert";
import MenuForm from "../../common/MenuForm";
import BackButton from "../../common/BackButton";

const MenuEdit = () => {
  const [menu, setMenu] = useState({});
  const [formData, setFormData] = useState({
    name: menu.name || "",
    description: menu.description || "",
    image: null,
    calories: menu.calories || 0,
    price: menu.price || 0,
    stock: menu.stock || 0,
    isFeatured: (menu.isFeatured ? 1 : 0) || 0,
  });
  const [accessToken, _] = useLocalStorage("access-token", "");
  const navigate = useNavigate();
  const menuId = useParams();

  const getMenu = async () => {
    const response = await menuDetail(menuId.menuId);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setMenu(responseBody.data);
      console.log("Menu fetched successfully");
    } else {
      console.log(responseBody.errors);
      await alertError(Object.values(responseBody.errors).flat().join("\n"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedField = {};
    const confirmed = await alertConfirm(
      "Are you sure want to edit this menu?"
    );

    const menuIsFeatured = menu.isFeatured ? 1 : 0;
    if (confirmed) {
      if (menu.name !== formData.name) updatedField.name = formData.name;
      if (menu.description !== formData.description)
        updatedField.description = formData.description;
      if (menu.image !== formData.image && formData.image !== null)
        updatedField.image = formData.image;
      if (menu.price !== formData.price) updatedField.price = formData.price;
      if (menu.calories !== formData.calories)
        updatedField.calories = formData.calories;
      if (menu.stock !== formData.stock) updatedField.stock = formData.stock;
      if (menuIsFeatured !== formData.isFeatured)
        updatedField.isFeatured = formData.isFeatured;

      updatedField.id = menuId.menuId;
      const response = await menuUpdate(updatedField, accessToken);

      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status === 200) {
        await alertSuccess("Menu edited successfully");
        navigate("/dashboard/menus");
      } else {
        console.log(responseBody.errors);
        await alertError(Object.values(responseBody.errors).flat().join("\n"));
      }
    }
    return;
  };

  useEffectOnce(() => {
    getMenu();
  });

  useEffect(() => {
    setFormData({
      name: menu.name || "",
      description: menu.description || "",
      image: null,
      calories: menu.calories || 0,
      price: menu.price || 0,
      stock: menu.stock || 0,
      isFeatured: (menu.isFeatured ? 1 : 0) || 0,
    });
  }, [menu]);

  return (
    <div className="flex flex-col gap-y-4">
      <BackButton
        className={"self-start hover:text-primary transition duration-200"}
      />
      <h2 className="font-poppins text-5xl font-bold pb-4">EDIT MENU</h2>
      <MenuForm
        className="bg-surface rounded-2xl shadow-text-muted shadow-md/20 p-4"
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        btnTitle={"Edit Menu"}
      />
    </div>
  );
};

export default MenuEdit;
