"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User, Lock, ArrowRight } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  username: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        // 1. Firebase Login (assuming username is email)
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.username,
          values.password
        );
        const idToken = await userCredential.user.getIdToken();

        // 2. Call Backend to verify role and set cookie
        const response = await axiosInstance.post("/auth/login", { idToken });

        // 3. Update Redux
        dispatch(loginSuccess(response.data.user));

        // 4. Redirect to dashboard
        router.push("/");
      } catch (error: any) {
        console.error("Login failed:", error);
        const errorMessage = error.response?.data?.message || error.message || "Login failed";
        dispatch(loginFailure(errorMessage));
        formik.setStatus(errorMessage);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {formik.status && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
          {formik.status}
        </div>
      )}
      
      <div className="space-y-4">
        <Input
          label="Email Address"
          name="username"
          type="email"
          placeholder="admin@projecthive.com"
          icon={<User size={18} />}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username ? (formik.errors.username as string) : ""}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? (formik.errors.password as string) : ""}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-zinc-300 text-[#7c4a32] focus:ring-[#7c4a32]"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
            Remember me
          </span>
        </label>
        <button
          type="button"
          className="text-sm font-medium text-[#7c4a32] hover:text-[#6a3f2b] transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={formik.isSubmitting}
        rightIcon={<ArrowRight size={18} />}
      >
        Sign in to Dashboard
      </Button>
    </form>
  );
};

export default LoginForm;
