import { apiSlice } from "../api/apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    addToFavorites: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/favorites`,
        method: "POST",
        body: data,
      }),
    }),

    getUserFavorites: builder.query({
      query: () => ({
        url: `${USERS_URL}/favorites`,
      }),
    }),

    removeFavorites: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/favorites`,
        method: "DELETE",
        body: data,
      }),
    }),

    addAndUpdateProductToCart: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/cart`,
        method: "POST",
        body: data,
      }),
    }),

    getUserCart: builder.query({
      query: () => ({
        url: `${USERS_URL}/cart`,
        method: "GET",
      }),
    }),

    removeProductFromCart: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/cart`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useAddToFavoritesMutation,
  useGetUserFavoritesQuery,
  useRemoveFavoritesMutation,
  useAddAndUpdateProductToCartMutation,
  useGetUserCartQuery,
  useRemoveProductFromCartMutation,
} = usersApiSlice;
