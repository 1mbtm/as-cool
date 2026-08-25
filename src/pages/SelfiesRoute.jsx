import { AuthProvider } from "../lib/auth";
import Selfies from "./Selfies";

// Firebase (bada) sirf isi route ke lazy chunk me aaye — isliye AuthProvider
// yahan wrap kiya hai, poore app me nahi.
export default function SelfiesRoute() {
  return (
    <AuthProvider>
      <Selfies />
    </AuthProvider>
  );
}
