import axios from "axios";
import { headers } from "../../next.config";
import { useRouter } from "next/navigation";

const instance = axios.create();

const useAxiosSecure = () => {
  const router = useRouter();
  // req interceptors
  instance.interceptors.request.use(
    function (config) {
      config.headers.token = localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // res interceptors
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        router.push("/signup-or-signin");
      }
    }
  );
  return instance;
};

export default useAxiosSecure;
