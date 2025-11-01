// Shared data for members and tasks

// Initialize with default members and merge with localStorage
const defaultMembers = [
  {
    id: "1",
    name: "Chukrit Da",
    rollNumber: "69",
    section: "A",
    semester: 6,
    team: "Convenor",
    bio: "Convenor of the task management system",
    profileImage: "https://picsum.photos/200",
    joinedDate: "2024-01-15",
    email: "abc@aot.edu.in"
  },
  {
    id: "2",
    name: "Elon Musk",
    rollNumber: "TECH002",
    section: "A",
    semester: 6,
    team: "Tech",
    bio: "Tech team member",
    profileImage: "",
    joinedDate: "2024-01-16",
    email: "c@company.com"
  },
  {
    id: "3",
    name: "Arjun Sharma",
    rollNumber: "21CS001",
    section: "A",
    semester: 6,
    team: "Tech",
    bio: "Full-stack developer passionate about React and Node.js",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    joinedDate: "2024-01-15",
    email: "arjun@example.com"
  },
  {
    id: "4",
    name: "Priya Singh",
    rollNumber: "21CS012",
    section: "A",
    semester: 6,
    team: "Design",
    bio: "UI/UX enthusiast creating beautiful digital experiences",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    joinedDate: "2024-01-16",
    email: "priya@example.com"
  },
  {
    id: "5",
    name: "Rahul Verma",
    rollNumber: "21CS023",
    section: "B",
    semester: 5,
    team: "Marketing",
    bio: "Growth hacker with focus on social media campaigns",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    joinedDate: "2024-02-01",
    email: "rahul@example.com"
  },
  {
    id: "6",
    name: "Sneha Patel",
    rollNumber: "21CS034",
    section: "B",
    semester: 6,
    team: "PR",
    bio: "Event coordinator and communications specialist",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    joinedDate: "2024-02-05",
    email: "sneha@example.com"
  }
];

// Get members from localStorage or use defaults
export const getMembers = () => {
  const stored = JSON.parse(localStorage.getItem('members') || '[]');
  // Merge defaults with stored members (avoid duplicates)
  const defaultIds = new Set(defaultMembers.map(m => m.id));
  const newStored = stored.filter(m => !defaultIds.has(m.id));
  return [...defaultMembers, ...newStored];
};

export const members = getMembers();

export const getMemberById = (id) => {
  const allMembers = getMembers();
  return allMembers.find((m) => m.id === String(id));
};

export const getTasksByMember = (memberId) => {
  // Get tasks from localStorage or return empty array
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  return tasks.filter((task) => {
    if (Array.isArray(task.assignedTo)) {
      // Check if member name is in assignedTo array
      const member = getMemberById(memberId);
      return member && task.assignedTo.includes(member.name);
    }
    return false;
  });
};

export const calculateMemberStats = (memberId) => {
  const memberTasks = getTasksByMember(memberId);
  const total = memberTasks.length;
  const completed = memberTasks.filter((t) => t.status === "Completed").length;
  const overdue = memberTasks.filter((t) => {
    if (t.deadline) {
      const deadline = new Date(t.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return deadline < today && t.status !== "Completed";
    }
    return false;
  }).length;
  const winRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, overdue, winRate };
};

