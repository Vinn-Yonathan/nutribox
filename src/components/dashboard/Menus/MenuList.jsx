import React, { useEffect, useState } from "react";
import { menuDelete, menuList } from "../../../lib/api/MenuApi";
import { alertConfirm, alertError, alertSuccess } from "../../../lib/alert";
import { Button } from "../../common/Button";
import { Link, useNavigate } from "react-router";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  Pencil,
  Trash,
} from "lucide-react";
import MenuFilter from "../../common/MenuFilter";
import { useLocalStorage, useSearchParam } from "react-use";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    maxPrice: null,
    minPrice: null,
    maxCalories: null,
    minCalories: null,
    available: false,
    isFeatured: false,
  });
  const [page, setPage] = useState(Number(useSearchParam("page")) || 1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const [accessToken, _] = useLocalStorage("access-token", "");

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getMenus = async () => {
    const response = await menuList(filter, { page });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      console.log("Menus fetched successfully");
      setMenus(responseBody.data);
      setTotalPage(responseBody.meta.last_page);
    } else {
      console.log(responseBody.errors);
      await alertError(Object.values(responseBody.errors).flat().join("\n"));
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await alertConfirm(
      "Are you sure want to delete this menu?"
    );

    if (confirmed) {
      const response = await menuDelete(id, accessToken);
      const responseBody = response.json();
      console.log(responseBody);

      if (response.status === 200) {
        alertSuccess("Menu deleted successfully.");
        getMenus();
      }
    }
    return;
  };

  useEffect(() => {
    console.log("test");
    getMenus();
  }, [page, filter]);

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="font-poppins text-5xl font-bold pb-4">MENUS</h2>
      <MenuFilter filter={filter} setFilter={setFilter} />
      <Button
        onClick={() => {
          navigate("/dashboard/menus/add");
        }}
        title={"Add new menu"}
      />
      <table className="mt-4 font-poppins">
        <caption className="sr-only">List menu table</caption>
        <thead className="bg-secondary/30 text-text-muted">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image Src</th>
            <th>Stock</th>
            <th>Calories</th>
            <th>Price</th>
            <th>Is Featured</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {menus.map((menu) => {
            return (
              <tr key={menu.id}>
                <td>{menu.id}</td>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>{menu.image_src}</td>
                <td>{menu.stock}</td>
                <td>{menu.calories}</td>
                <td>{menu.price}</td>
                <td>{menu.is_featured ? "True" : "False"}</td>
                <td>
                  <div className="flex-center gap-x-4">
                    <Link
                      to={`/dashboard/menus/${menu.id}/edit`}
                      className="hover:text-primary transition duration-100"
                    >
                      <Pencil />
                    </Link>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="hover:text-red-400 transition duration-100"
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <nav className="flex-center gap-x-4 text-xl">
        {page !== 1 && (
          <Link
            to={`/dashboard/menus?page=${page - 1}`}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <ChevronLeftCircle size={30} />
          </Link>
        )}
        {getPages().map((value) => {
          return (
            <Link
              key={value}
              to={`/dashboard/menus?page=${value}`}
              className={
                value === page ? "text-primary font-bold" : "text-text"
              }
              onClick={() => {
                setPage(value);
              }}
            >
              {value}
            </Link>
          );
        })}
        {page !== totalPage && (
          <Link
            to={`/dashboard/menus?page=${page + 1}`}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <ChevronRightCircle size={30} />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MenuList;
