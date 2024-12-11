import React from "react";
import { request } from "../../api";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/slices/token-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let user = Object.fromEntries(formData);

    request.post("/auth/signup-admin", user).then((res) => {
      dispatch(signIn(res.data.access_token));
      navigate("/admin");
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form
        onSubmit={handleSignUp}
        action=""
        className="flex flex-col gap-3 max-w-[500px] mx-auto my-[50px]"
      >
        <input
          className="border py-2 px-4"
          type="text"
          name="name"
          placeholder="Enter name"
        />
        <input
          className="border py-2 px-4"
          type="email"
          name="email"
          placeholder="Enter email"
        />
        <input
          className="border py-2 px-4"
          type="password"
          name="password"
          placeholder="Enter password"
        />
        <input
          className="border py-2 px-4"
          type="password"
          name="confirm_password"
          placeholder="Enter confirm password"
        />
        <button className="border bg-blue-600 text-white py-2 px-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
