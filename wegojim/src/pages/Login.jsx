import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from '../stores/authStore';


const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const email = useAuthStore((state)=>state.email);
  const [password, setPassword] = React.useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const setEmail = useAuthStore((state) => state.setEmail);
  const userId = useAuthStore((state) => state.userId);
  const user = useAuthStore((state) => state.user);
  const setUserId = useAuthStore((state) => state.setUserId); // Access setUserId function
  const navigate = useNavigate();
  
  const onSubmit = async (event)=> {
    event.preventDefault();
    setIsLoading(true);
    let data = JSON.stringify({
      email: email,
      password: password,
      userId: userId
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status === "ok" && response.data.userLoggedIn) {
          console.log(JSON.stringify(response.data));
          setUser(response.data.userLoggedIn);
          setEmail(response.data.email);
          localStorage.setItem('userData', JSON.stringify(response.data.userLoggedIn));
          setUserId(response.data.userId); // Set userId in the store
          navigate("/");
          console.log(user);
          
        } else {
          console.log(JSON.stringify(response.data.status));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }


  return (
    <div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center text-white">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log In 
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to Log In
            </p>
          </div>
          <div className={cn("grid gap-6")}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Log In
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground text-gray-950">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
