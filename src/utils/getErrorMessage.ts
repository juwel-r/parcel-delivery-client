export const getErrorMessage = (error: any) => {
  const errorMessage =
    error?.data?.message?.errorSources?.[0]?.message ||
    error?.data?.message ||
    "Something went wrong!";
    return errorMessage
};
