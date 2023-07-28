import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export const revalidate = 0; //revalidate api every 1 second
export const dynamic = "force-dynamic";
async function listProjects() {
  // Creating a new record
  // await prisma.project.create({
  //   data: {
  //     name: "Site B29F",
  //     location: "US",
  //     progress: "49",
  //   },
  // });

  const projects = await prisma.project.findMany();

  return projects;
}
export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
export async function GET() {
  //   const user = await request.json();

  const res = await listProjects()
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
