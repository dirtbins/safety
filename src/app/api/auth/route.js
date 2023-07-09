import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkCredentials(email, password) {
  // Creating a new record
  await prisma.user.create({
    data: {
      name: "Rich Ricj",
      email: "test@oshportal.com",
      password: "Sweetnovember",
    },
  });
  const users = await prisma.user.findMany({
    where: {
      email,
      password,
    },
  });

  return users;
}
export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
export async function POST(request) {
  //   const user = await request.json();
  const user = await request.json();

  const res = await checkCredentials(user.email, user.password)
    .then((result) => {
      return NextResponse.json(result);
    })
    .catch((error) => {
      return NextResponse.json(error.message);
    });

  //   const res = await fetch(
  //     "https://api.github.com/search/users?q=richard&per_page=3"
  //   );

  const data = await res.json();

  return NextResponse.json(data);
}
