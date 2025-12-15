import Swal from "sweetalert2";

export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    customClass: {
      popup: "swal-bg",
      title: "swal-title-color",
    },
  });
};
export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    customClass: {
      popup: "swal-bg",
      title: "swal-title-color",
    },
  });
};

export const alertConfirm = async (message) => {
  const result = Swal.fire({
    icon: "question",
    title: "Are you sure?",
    text: message,
    showCancelButton: true,
    cancelButtonColor: "oklch(70.4% 0.191 22.216)",
    confirmButtonText: "Yes",
    customClass: {
      popup: "swal-bg",
      title: "swal-title-color",
      confirmButton: "swal-confirm-color",
    },
  });

  return (await result).isConfirmed;
};
