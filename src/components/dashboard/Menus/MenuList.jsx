import React, { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";

const MenuList = () => {
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
  const [accessToken, _] = useLocalStorage("access-token", "");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // const getMenus = async () => {
  //   const response = await menuList(filter, { page });
  //   const responseBody = await response.json();
  //   console.log(responseBody);

  //   if (response.status === 200) {
  //     console.log("Menus fetched successfully");
  //     setMenus(responseBody.data);
  //     setTotalPage(responseBody.meta.last_page);
  //   } else {
  //     console.log(responseBody.errors);
  //     await alertError(Object.values(responseBody.errors).flat().join("\n"));
  //   }
  // };

  const {
    data: menus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menus", filter, page],
    queryFn: async () => {
      const response = await menuList(filter, { page });
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        console.log(responseBody.errors);
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      } else {
        setTotalPage(responseBody.meta.last_page);
        console.log("Menus fetched successfully.");
      }

      return responseBody;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await menuDelete(id, accessToken);
      const responseBody = response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        console.log(responseBody.errors);
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["menus", filter, page] });
      const prevMenu = queryClient.getQueryData(["menus", filter, page]);
      queryClient.setQueryData(["menus", filter, page], (old) => {
        if (!old) return old;

        return { ...old, data: old.data.filter((menu) => menu.id !== data) };
      });
      return { prevMenu };
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      alertSuccess("Menu deleted Successfully!");
    },
    onError: (error, _, context) => {
      alertError(error.message);
      queryClient.setQueryData(["menus", filter, page], context.prevMenu);
    },
  });

  const handleDelete = async (id) => {
    const confirmed = await alertConfirm(
      "Are you sure want to delete this menu?",
    );

    if (confirmed) {
      mutation.mutate(id);
    }
    return;
  };

  // useEffect(() => {
  //   console.log("test");
  //   getMenus();
  // }, [page, filter]);

  const RenderContent = () => {
    if (isLoading)
      return (
        <PuffLoader color="var(--primary)" className="self-center my-10" />
      );
    if (isError) return console.error(error.message);

    return (
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
          {menus.data.map((menu) => {
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
    );
  };

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

      <RenderContent />

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
