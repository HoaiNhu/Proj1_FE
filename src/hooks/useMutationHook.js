import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (funCallback) => {
  const mutation = useMutation({
    mutationFn: funCallback,
  });
  return mutation;
};
