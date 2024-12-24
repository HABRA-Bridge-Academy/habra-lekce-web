import { defineStore } from "pinia";
import User from "@/class/user";
import axios from "@/plugins/axios";


export const useAuthStore = defineStore("auth", {
  state: () => {
    let user = null;
    let sessionExpired = false;

    const userData = localStorage.getItem("user");
    const exp = localStorage.getItem("expires") as number | null;
    if (userData && exp) {
      if (exp <= Date.now()) sessionExpired = true;
      else {
        const { id, firstName, lastName, email, role } = JSON.parse(userData);
        user = new User(id, firstName, lastName, email, role);
      }
    }
    return {
      user: user as User | null,
      expires: exp, // Date of session expiration as timestamp
    };
  },
  getters: {
    isSessionExpired(state) {
      return state.expires && state.expires <= Date.now();
    },
    isAuthenticated(state): boolean {
      return state.user !== null && !this.isSessionExpired;
    },
    isAdmin(state): boolean {
      return this.isAuthenticated && state.user?.role === "admin";
    },
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post("/users/login", { email, password });
        this.user = User.make(response.data.user);
        this.expires = response.data.exp as number;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("expires", this.expires?.toString()); ;
        console.debug("Login successful:", this.user);
      } catch (error: any) {
        console.error("Login error:", error.message);
        throw error;
      }
    },
    async logout() {
      try {
        await axios.post("/users/logout");
        this._clearSession();
      } catch (error: any) {
        console.error("Logout error:", error.message);
      }
    },
    async register(
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) {
      try {
        const response = await axios.post("/users/register", {
          email: email,
          password,
          firstName,
          lastName,
        });
        console.debug("Register successful:", response.data.user);
      } catch (error: any) {
        console.error("Register error:", error.message);
        throw error;
      }
    },
    // _ sign means that this method is internal and should not be called from outside
    _clearSession() {
      this.user = null;
      this.expires = null;
      localStorage.removeItem("user");
      localStorage.removeItem("expires");
    }
  },
});
