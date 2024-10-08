const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      bio: 'Software Developer',
      avatar: 'https://example.com/avatar1.png',
      skills: {
        create: [
          { name: 'JavaScript', category: 'Programming' },
          { name: 'React', category: 'Frontend' },
        ],
      },
      courses: {
        create: [
          {
            name: 'Fullstack Development',
            description: 'Learn fullstack development',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-06-01'),
            tags: {
              create: [{ name: 'Web Development' }],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      bio: 'Data Scientist',
      avatar: 'https://example.com/avatar2.png',
      skills: {
        create: [
          { name: 'Python', category: 'Programming' },
          { name: 'Machine Learning', category: 'Data Science' },
        ],
      },
      courses: {
        create: [
          {
            name: 'Data Science Bootcamp',
            description: 'Learn data science',
            startDate: new Date('2023-02-01'),
            endDate: new Date('2023-07-01'),
            tags: {
              create: [{ name: 'Data Science' }],
            },
          },
        ],
      },
    },
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Project Alpha',
      description: 'A project to develop an alpha version',
      maxMembers: 5,
      courseId: 1,
      status: 'Active',
      creatorId: user1.id,
      skills: {
        create: [{ name: 'Node.js', category: 'Backend' }],
      },
      tags: {
        create: [{ name: 'Backend Development' }],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Project Beta',
      description: 'A project to develop a beta version',
      maxMembers: 3,
      courseId: 2,
      status: 'Active',
      creatorId: user2.id,
      skills: {
        create: [{ name: 'Django', category: 'Backend' }],
      },
      tags: {
        create: [{ name: 'Backend Development' }],
      },
    },
  });

  // Create Project Members
  await prisma.projectMember.create({
    data: {
      userId: user1.id,
      projectId: project1.id,
      role: 'Developer',
      status: 'Active',
    },
  });

  await prisma.projectMember.create({
    data: {
      userId: user2.id,
      projectId: project2.id,
      role: 'Developer',
      status: 'Active',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

