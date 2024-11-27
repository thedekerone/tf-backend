import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function userHasProjectInCourse(userId, courseId) {
  const existingProjectMember = await prisma.projectMember.findFirst({
    where: {
      userId: userId,
      Project: {
        courseId: courseId,
      },
    },
  });
  return existingProjectMember !== null;
}

async function main() {
  // Create Courses
  const course1 = await prisma.course.create({
    data: {
      name: 'Fullstack Web Development Bootcamp',
      description: 'An intensive bootcamp to learn fullstack web development using modern technologies.',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-06-01'),
      tags: {
        create: [{ name: 'Fullstack Development' }, { name: 'JavaScript' }],
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'Comprehensive Data Science Bootcamp',
      description: 'A comprehensive bootcamp to master data science and machine learning techniques.',
      startDate: new Date('2023-02-01'),
      endDate: new Date('2023-07-01'),
      tags: {
        create: [{ name: 'Machine Learning' }, { name: 'Python' }],
      },
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson 123',
      email: 'alice2.johnson@example.com',
      phone: '555-123-4567',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      userType: 'STUDENT',
      courses: {
        connect: [{ id: course1.id }],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Robert Smith 123',
      email: 'robert.smith@example.com',
      phone: '555-987-6543',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      userType: 'TEACHER',
      courses: {
        connect: [{ id: course2.id }],
      },
    },
  });

  // Create Projects
  if (!(await userHasProjectInCourse(user1.id, course1.id))) {
    const project1 = await prisma.project.create({
      data: {
        name: 'Alpha Project Management System',
        description: 'Developing an alpha version of a project management system for small teams.',
        maxMembers: 5,
        courseId: course1.id,
        status: 'Active',
        creatorId: user1.id,
        tags: {
          connectOrCreate: {
            where: { name: 'Backend Development' },
            create: { name: 'Backend Development' },
          },
        },
      },
    });
  }

  if (!(await userHasProjectInCourse(user1.id, course1.id))) {
    const project2 = await prisma.project.create({
      data: {
        name: 'Gamma Social Media App',
        description: 'Building a social media application with real-time features.',
        maxMembers: 4,
        courseId: course1.id,
        status: 'Active',
        creatorId: user1.id,
        tags: {
          connectOrCreate: {
            where: { name: 'Frontend Development' },
            create: { name: 'Frontend Development' },
          },
        },
      },
    });
  }

  if (!(await userHasProjectInCourse(user1.id, course1.id))) {
    const project3 = await prisma.project.create({
      data: {
        name: 'Delta Mobile App',
        description: 'Creating a mobile application for task management.',
        maxMembers: 6,
        courseId: course1.id,
        status: 'Active',
        creatorId: user1.id,
        tags: {
          connectOrCreate: {
            where: { name: 'Mobile Development' },
            create: { name: 'Mobile Development' },
          },
        },
      },
    });
  }

  if (!(await userHasProjectInCourse(user2.id, course2.id))) {
    const project4 = await prisma.project.create({
      data: {
        name: 'Epsilon AI Chatbot',
        description: 'Developing an AI-powered chatbot for customer support.',
        maxMembers: 5,
        courseId: course2.id,
        status: 'Active',
        creatorId: user2.id,
        tags: {
          connectOrCreate: {
            where: { name: 'AI Development' },
            create: { name: 'AI Development' },
          },
        },
      },
    });
  }

  if (!(await userHasProjectInCourse(user2.id, course2.id))) {
    const project5 = await prisma.project.create({
      data: {
        name: 'Beta E-commerce Platform',
        description: 'Creating a beta version of an e-commerce platform with advanced features.',
        maxMembers: 3,
        courseId: course2.id,
        status: 'Active',
        creatorId: user2.id,
        tags: {
          connectOrCreate: {
            where: { name: 'Backend Development' },
            create: { name: 'Backend Development' },
          },
        },
      },
    });
  }

  if (!(await userHasProjectInCourse(user2.id, course2.id))) {
    const project6 = await prisma.project.create({
      data: {
        name: 'Zeta Data Visualization Tool',
        description: 'Building a tool for visualizing complex data sets.',
        maxMembers: 4,
        courseId: course2.id,
        status: 'Active',
        creatorId: user2.id,
        tags: {
          connectOrCreate: {
            where: { name: 'Data Visualization' },
            create: { name: 'Data Visualization' },
          },
        },
      },
    });
  }


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

