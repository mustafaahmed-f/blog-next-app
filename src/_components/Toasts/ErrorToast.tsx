"use client";

import { showErrorToast } from "@/_utils/helperMethods/showToasts";
import { useEffect } from "react";

interface ErrorToastProps {
  error: null | string | undefined;
}

function ErrorToast({ error }: ErrorToastProps) {
  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);
  return null;
}

export default ErrorToast;
