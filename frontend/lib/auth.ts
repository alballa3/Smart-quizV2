export const useSession = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/session`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  if (!response.ok) {
    return { error: json.message, isAuth: false };
  }
  return { session: json.session, isAuth: true };
};
