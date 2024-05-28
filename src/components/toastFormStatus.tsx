'use client'

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function ToastFormStatus() {
  const {data, pending} = useFormStatus();
  let refToast = useRef('')
  useEffect(() => {
    if (pending) {
      refToast.current = toast.loading("Loading...");
    }
    return () => {
      toast.dismiss(refToast.current);
    }
    // toast.dismiss(refToast.current);
   
  }, [pending]);
 
  return (
    <></>
  )
}
