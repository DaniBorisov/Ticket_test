import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    if (user.role === "USER") {
      navigate("/dashboard");
    } else {
      navigate("/handler");
    }
  }, [user, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.role === "USER") {
        navigate("/dashboard");
      } else {
        navigate("/handler");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <form className="flex justify-center h-dvh" onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm self-center">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          {error && <p style={styles.error}>{error}</p>}
          <div>
            <Button type="button" variant={"link"} onClick={() => { setEmail("user@test.com"); setPassword("user123") }}> User: user@test.com / user123 </Button>
            <Button type="button" variant={"link"} onClick={() => { setEmail("handler@test.com"); setPassword("handler123") }}> Handler: handler@test.com / handler123</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  error: {
    color: "crimson",
  },
};

export default LoginPage;