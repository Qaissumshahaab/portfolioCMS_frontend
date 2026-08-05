// Every backend controller replies with { success:false, message } on failure,
// so this is the single place that wraps a  message for toast().
export const getErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again.",
) => {
  return error?.response?.data?.message || fallback;
};
