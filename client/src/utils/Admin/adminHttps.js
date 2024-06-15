import { json } from "react-router-dom";

//=============== Tour Admin ========================
//1. Create Tour
export async function createTourAdmin(data) {
  const { formData } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/tours`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}

//2.Edit Tour
export async function editTourAdmin(data) {
  const { formData, idTour } = data;

  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/tours/${idTour}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}
//3. Delete Tour
export async function deleteTourAdmin(idTour) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/tours/${idTour}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let resData = response;
  if (response.status === 400) {
    resData = await response.json();
  }

  return resData;
}
//=========================Country Admin========================
//1.Create Country
export async function createCountryAdmin(data) {
  const { formData } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch("http://localhost:8080/countries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const resData = await response.json();

  return resData;
}

//2.Edit Country
export async function editCountryAdmin(data) {
  const { formData, idCountry } = data;

  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/countries/${idCountry}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const resData = await response.json();

  return resData;
}
//3. Delete Country
export async function deleteCountryAdmin(idCountry) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/countries/${idCountry}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let resData = response;
  if (response.status === 400) {
    resData = await response.json();
  }

  return resData;
}
//=======================Blog Admin======================
//1.Create Post
export async function createBlogAdmin(data) {
  const { formData } = data;
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to create blog." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch("http://localhost:8080/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}
//2. Edit Blog
export async function editBlog(data) {
  const { formData, idBlog } = data;
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to create blog." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/posts/${idBlog}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}
//3. Delete Blog
export async function deleteBlog(blogId) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to delete review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/posts/${blogId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
}

//===========================Review Page==============================
//1. Create Review
export async function createReview(data) {
  const { formData } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const resData = await response.json();

  return resData;
}
//2. Edit Review
export async function editReview(data) {
  const { formData, idReview } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/reviews/${idReview}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const resData = await response.json();

  return resData;
}

//3.Delete Review
export async function deleteReview(reviewId) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to delete review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
}
//========================User Page=========================
//1.Create User
export async function createUserAdmin(data) {
  const { formData } = data;
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to user this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}
//2. Edit User
export async function editUserAdmin(data) {
  const { formData, idUser } = data;
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/users/${idUser}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}
//3. Delete User
export async function deleteUserAdmin(idUser) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/users/${idUser}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  let resData = response;
  if (response.status === 400) {
    resData = await response.json();
  }

  return resData;
}
//============================Discount Page============================
//1.Create Discount
export async function createDiscountAdmin(data) {
  const { formData } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch("http://localhost:8080/discounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const resData = await response.json();

  return resData;
}

//2.Edit Discount
export async function editDiscountAdmin(data) {
  const { formData, idDiscount } = data;

  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/discounts/${idDiscount}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  const resData = await response.json();

  return resData;
}
//3. Delete Discount
export async function deleteDiscountAdmin(idDiscount) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/discounts/${idDiscount}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}
//============================Booking Page=============================
export async function deleteBookingAdmin(idBooking) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/booking/${idBooking}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
}
