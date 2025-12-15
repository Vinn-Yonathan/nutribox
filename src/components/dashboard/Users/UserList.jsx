import React, { useEffect, useState } from "react";
import { userDelete, userList } from "../../../lib/api/UserApi";
import { useLocalStorage, useSearchParam } from "react-use";
import { Link } from "react-router";
import {
  ChevronDown,
  ChevronLeftCircle,
  ChevronRightCircle,
  ChevronUp,
  Pencil,
  Trash,
} from "lucide-react";
import { alertConfirm, alertError, alertSuccess } from "../../../lib/alert";

const UserList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ name: "" });
  const [page, setPage] = useState(Number(useSearchParam("page")) || 1);
  const [totalPage, setTotalPage] = useState(1);
  const [accessToken, _] = useLocalStorage("access-token", "");

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getUsers = async () => {
    const response = await userList(filter, page, accessToken);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setUsers(responseBody.data);
      setTotalPage(responseBody.meta.last_page);
      console.log("Users fetched successfully.");
    } else {
      console.log(responseBody.errors);
      await alertError(Object.values(responseBody.errors).flat().join("\n"));
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await alertConfirm(
      "Are you sure want to delete this user?"
    );
    if (confirmed) {
      const response = await userDelete(id, accessToken);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status === 200) {
        alertSuccess("User deleted successfully.");
        getUsers();
      } else {
        console.log(responseBody.errors);
        await alertError(Object.values(responseBody.errors).flat().join("\n"));
      }
    }

    return;
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getUsers();
  }, [filter, page]);

 

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="font-poppins text-5xl font-bold pb-4">USERS</h2>

      <section>
        <h3 className="font-poppins text-xl font-bold" onClick={handleOpen}>
          SEARCH
        </h3>
        <div className="flex flex-col gap-y-4">
          <label
            htmlFor="name"
            className="w-full flex flex-col font-poppins font-light"
          >
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              className="border-1 rounded-xl border-text-muted mt-2 focus:outline-none p-[.5em]"
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
          </label>
        </div>
      </section>

      <table className="mt-4 font-poppins">
        <caption className="sr-only">List user table</caption>
        <thead className="bg-secondary/30 text-text-muted">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id} className="text-center">
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <div className="flex-center gap-x-4">
                    <Link
                      to={`/dashboard/users/${user.id}/edit`}
                      className="hover:text-primary transition duration-100"
                    >
                      <Pencil />
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
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
            to={`/dashboard/users?page=${page - 1}`}
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
              to={`/dashboard/users?page=${value}`}
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
            to={`/dashboard/users?page=${page + 1}`}
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

export default UserList;
