// this file is cjs because we need to run it with node
const { PrismaClient } = require("@prisma/client");
const data = require("./mock-data.json");

const prisma = new PrismaClient();

async function main() {
  const clerkId = "user_2woGMJ1NV10ruLYUItSu3tlbyBz";
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    };
  });

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
