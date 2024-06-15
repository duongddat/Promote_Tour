//=====================Forgot Password =================================
import { json } from "react-router-dom";

//1. Forgot Password
export async function forgotPassword(data) {
  const response = await fetch("http://localhost:8080/auth/forgotPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (resData.status === "success") {
    localStorage.setItem("emailResetOTP", data.email);
  }

  return resData;
}

//2. Verify OTP
export async function verifyOTP(data) {
  const response = await fetch("http://localhost:8080/auth/verifyOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  const resetToken = resData.data?.resetToken || null;

  if (resetToken) {
    localStorage.setItem("resetToken", resetToken);
  }

  return resData;
}

//3. Reset Password
export async function resetPassword(data) {
  const resetToken = localStorage.getItem("resetToken");
  if (!resetToken) {
    throw json(
      { message: "Can not get reset token." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    "http://localhost:8080/auth/resetPassword/" + resetToken,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const resData = await response.json();

  if (resData.status === "success") {
    localStorage.setItem("token", resData.token);
    localStorage.removeItem("emailResetOTP");
    localStorage.removeItem("resetToken");
  }

  return resData;
}

//===============Tour Detail Review======================
//1. Create Review
export async function createReview(data) {
  const { review, rating, tourId } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/tours/${tourId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review,
        rating,
      }),
    }
  );

  const resData = await response.json();

  return resData;
}
//2. Edit Review
export async function editReview(data) {
  const { review, rating, tourId, reviewId } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/tours/${tourId}/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review,
        rating,
      }),
    }
  );

  const resData = await response.json();

  return resData;
}

//3.Delete Review
export async function deleteReview(data) {
  const { tourId, reviewId } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to delete review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/tours/${tourId}/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}
//=========================User detail (current)======================
//1.Update user info
export async function updateUserInfo(data) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to update info." },
      {
        status: 400,
      }
    );
  }
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await fetch(`http://localhost:8080/users/updateMe`, {
    method: "PATCH",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();
  return resData;
}

//2.Change Password
export async function changePassword(data) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to update password." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/auth/updateMyPassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  return resData;
}

//================= Blog Page==========================
//1.Like Blog
export async function likeBlog(data) {
  const { blogId } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to delete review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/posts/${blogId}/like`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const resData = await response.json();

  return resData;
}
//2. Create Blog
export async function createBlog(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to create blog." },
      {
        status: 400,
      }
    );
  }
  const { formData } = data;

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
//3. Edit Blog
export async function editBlog(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to create blog." },
      {
        status: 400,
      }
    );
  }
  const { formData, idBlog } = data;

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
//4. Delete Blog
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

export async function cancelBooking(bookingId) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to cancle booking." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/booking/cancel-booking/${bookingId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const resData = await response.json();

  return resData;
}
