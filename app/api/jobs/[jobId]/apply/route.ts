// "jobs/jobID/apply"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { jobId: string } },
) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    // 1. Verifico si existe el trabajo
    const { jobId } = params;
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }
    // 2. Verifico si tiene una aplicacion previa creada en ese trabajo
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: session.user.id,
      },
    });

    if (existingApplication) {
      return new NextResponse("You have already applied to this job", {
        status: 400,
      });
    }
    // 3. Creo la aplicacion
    const application = await prisma.application.create({
      data: {
        jobId,
        userId: session.user.id,
        status: "PENDING",
      },
    });
    return NextResponse.json(application);
  } catch (error) {
    console.error("Error applying to job:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const jobs = await prisma.job.findMany({ orderBy: { postedAt: "desc" } });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error creating job: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
