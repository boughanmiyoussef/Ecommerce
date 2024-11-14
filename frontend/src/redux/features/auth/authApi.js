import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from "../../../utils/baseURL";

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: 'include',
  }),
  tagTypes:["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: 'POST',
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: 'GET',
      }),
      refetchOnMount: true,
      invalidTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: { role },
      }),
      refetchOnMount: true,
      invalidTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: `/edit-profile`,
        method: 'PATCH',
        body: profileData,
      }),
      refetchOnMount: true,
      invalidTags: ["user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useUpdateProfileMutation,
} = authApi;

export default authApi;