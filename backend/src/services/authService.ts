import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

export const loginUser = async (email: string, password: string) => {
//   console.log("Login attempt for:", email);

  const user = await prisma.user.findUnique({
    where: { email },
  });

//   console.log("User found:", !!user);

  if (!user) {
    throw new Error("Invalid credentials - user not found");
  }

//   console.log("Stored hash:", user.password);

  const passwordMatch = await bcrypt.compare(password, user.password);

//   console.log("Password match:", passwordMatch);
//   console.log("JWT secret exists:", !!process.env.JWT_SECRET);

  if (!passwordMatch) {
    throw new Error("Invalid credentials - password mismatch");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};