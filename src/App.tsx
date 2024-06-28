import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";

import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { Dashboard, DeviceHub, Person3, Yard } from "@mui/icons-material";
import { PlanList } from "./pages/plans";
import { UserList } from "./pages/users";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { DashboardPage } from "./dashboard";
import { RoleList } from "./pages/roles";
import { IUser } from "./interfaces";
const theme = createTheme({
  ...RefineThemes.Purple,
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});

const aprovider={
  can: async ({ resource, action, params }:any) => {
    if(authProvider){
        let role=(await authProvider?.getIdentity()! as Promise<IUser>)?.role

       let perm=role.permissions
       console.log(perm)
        return Promise.resolve({
          can: perm[resource]!==undefined && perm[resource][action]!==undefined?perm[resource][action]:false,
          reason: "Unauthorized",
      });
  }

      return Promise.resolve({
        can: false,
        reason: "Unautorized",
    });
  }
}
function App() {
  return (
    <BrowserRouter>
     
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
          <ThemeProvider theme={theme}>
           
              <Refine
                 accessControlProvider={aprovider}
                dataProvider={dataProvider("http://localhost:8000/api")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "plans",
                    list: "/plans",
                    meta: {
                      icon: <Yard />,
                    },
                   
                   
                  },
                  {
                    name: "users",
                    list: "/users",
                    meta: {
                      icon: <Person3 />,
                    },
                   
                  },
                  {
                    name: "roles",
                    list: "/roles",
                    meta: {
                      icon: <Person3 />,
                    },
                   
                  },
                 
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  title: {
                    icon: <DeviceHub />,
                    text: "IOT Manager",
                  },
                
                  projectId: "uBJ2jC-GVK30x-vriGp7",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={Header}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route path="/"
                      
                      element={<DashboardPage />}
                    />
                    <Route path="/plans" element={<PlanList />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/roles" element={<RoleList />} />
                   
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              </ThemeProvider>
             
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
