import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "token";
// const API_URL = "https://retired-marissa-vsdvd-386c762c.koyeb.app"
const API_URL = "http://localhost:8000"
export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    if (email && password) {
      try {
        let response = await fetch(API_URL + '/auth/login', {
          method: "POST",
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email, password
          }),


        })
        let data = await response.json();
        if (!response.ok)
          throw Error(data.message)
        let p=data.data;
        localStorage.setItem(TOKEN_KEY, p.access_token)
        localStorage.setItem('user', JSON.stringify(p.user))
        return {
          success: true,
         redirectTo:'/'
        };

      }
      catch (error:any) {
        
        throw Error(error.message)
      }

    }
    else {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid email or password",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user');
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user_string = localStorage.getItem('user');
   
    if (user_string != 'undefined') {
      let user = JSON.parse(user_string!);
      return user;
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
