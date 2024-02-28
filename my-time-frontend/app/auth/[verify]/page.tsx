"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import { notification } from "antd";

export default function Page() {
  const query = useSearchParams();
  const token = query.get("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .post(`${API_URL}/auth/validate-email`, { token })
        .then((res) => {
          console.log(res);
          notification.success({
            message: "Success",
            description: res.data.message,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      <div>hhhhhhhhhhhhhhhddd</div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            backgroundColor: "#9ca3af",
            opacity: "0.5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="w-16 h-16 border-4 border-r-0 border-t-0 border-blue-900 rounded-full animate-spin "></div>
        </div>
      )}
    </div>
  );
}
