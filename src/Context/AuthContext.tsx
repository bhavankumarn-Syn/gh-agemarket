// import { createContext, useContext, useState } from "react";

// // Define user type
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// // Define context type
// interface AuthContextType {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
// }

// // Create context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (userData: User) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to use authentication context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };



import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { getDigitalAssetTypes } from "../api/api";

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  protectedPriKey?: string;
  protectedAccToken?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isTokenExpired: (token: string) => boolean;
  environment: string;
}


// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [environment, setEnvironment] = useState<string>('stg');

  const fetchAssetTypes = async () => {
    
    try{
      
      const token = user?.protectedAccToken || '';
      
      
      const rep = await getDigitalAssetTypes(token)
      console.log('))))))) ---- '); 
    }catch(error:any){
    }
  }

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setEnvironment(import.meta.env.VITE_ENV && import.meta.env.VITE_ENV)  
      // fetchAssetTypes()
      // console.log('User logged in:', user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  const isTokenExpired = (token: string) => {
    let tokenToDecode = atob(token);
    // let tokenGone = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InYxIn0.eyJpc3MiOiJodHRwczovL2FwaS5zeW5lcmdldGljcy5haS9pYW0iLCJzdWIiOiIxZTllZDZmMC0wYTY4LTQzZTktYjNjYi04N2E3NGQ1OGVmZWMiLCJlbWFpbCI6ImJoYXZhbmt1bWFyLm5Ad2VidGlnYS5jb20iLCJuYW1lIjoiQmhhdmFuIEt1bWFyIiwiaWF0IjoxNzY5MDc2NjYwLCJleHAiOjE3NjkxMDU0NjAsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MiLCJvcmdfaWQiOiJvcmdfYjJjIiwiYjJjIjp0cnVlLCJ0ZW5hbnRfaWQiOiIifQ.IMkWJhStokImoXvdVWFtZrjvAvoaYdDHr0Ap2w-uYSDM0VHb9skNloNFdWJnNoqvhmzmKjKpDBlA2mUoXtdEJqGbSeG2OxywwfBiaXAvLIIUHs3g_kpCdmIZtyraunSkOr1qhmPuJotsf1kOjZBmjyvcHcEm0ct_i7KoYYi4pPMMxtTWYZ4A-qCHzDCFfPJfjhpOQEzR-cWw2kLyb5zsMONQknL89I5zRRdvOjmNj86f89UP5I8h2idvuRMBRBvTuiOdpoiz5X1LXLq_astIPdZfMDlMe85Sxz_6sUqiy-5vtN1tmuWNkZms0-b1aGAGt0ntb98GvrXiHTRvaiaoMw"
    
    try {
      const { exp } = jwtDecode<{ exp: number }>(tokenToDecode);
      return !exp || exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isTokenExpired, environment }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
