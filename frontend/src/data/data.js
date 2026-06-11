export const students = [
  { id: 1, name: "Aria Sharma", age: 16, course: "Ballet", batch: "Morning", fee: 3500, status: "Active", joined: "Jan 2024", avatar: "#7c3aed" },
  { id: 2, name: "Zara Patel", age: 14, course: "Hip-Hop", batch: "Evening", fee: 3000, status: "Active", joined: "Feb 2024", avatar: "#f472b6" },
  { id: 3, name: "Meera Iyer", age: 19, course: "Kathak", batch: "Morning", fee: 3200, status: "Active", joined: "Jan 2024", avatar: "#0d9488" },
  { id: 4, name: "Lily Chen", age: 12, course: "Contemporary", batch: "Weekend", fee: 2800, status: "Inactive", joined: "Mar 2024", avatar: "#f59e0b" },
  { id: 5, name: "Riya Nair", age: 17, course: "Salsa", batch: "Evening", fee: 3100, status: "Active", joined: "Feb 2024", avatar: "#6366f1" },
  { id: 6, name: "Anika Verma", age: 15, course: "Ballet", batch: "Morning", fee: 3500, status: "Active", joined: "Apr 2024", avatar: "#ec4899" },
  { id: 7, name: "Sara Khan", age: 13, course: "Hip-Hop", batch: "Weekend", fee: 3000, status: "Active", joined: "Mar 2024", avatar: "#14b8a6" },
  { id: 8, name: "Priya Gupta", age: 20, course: "Bharatanatyam", batch: "Evening", fee: 3300, status: "Inactive", joined: "Jan 2024", avatar: "#a855f7" },
];

export const instructors = [
  { id: 1, name: "Ms. Kavya Reddy", specialization: "Ballet & Contemporary", experience: "8 yrs", students: 24, rating: 4.9, status: "Active", avatar: "#7c3aed", image: "https://plus.unsplash.com/premium_photo-1661297414288-8ed17eb1b3f1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhZmZ8ZW58MHx8MHx8fDA%3D" },
  { id: 2, name: "Mr. Arjun Singh", specialization: "Hip-Hop & Street Dance", experience: "6 yrs", students: 31, rating: 4.8, status: "Active", avatar: "#0d9488", image: "https://images.insurancecanopy.com/u/2024/11/26190316/hoodie-dance-teacher-posing-studio-1024x683.webp?strip=all" },
  { id: 3, name: "Ms. Sunita Rao", specialization: "Kathak & Bharatanatyam", experience: "12 yrs", students: 18, rating: 5.0, status: "Active", avatar: "#f472b6", image: "https://c.superprof.com/i/m/14229604/600/20260113093657/14229604.webp" },
  { id: 4, name: "Ms. Elena", specialization: "Salsa & Latin", experience: "7 yrs", students: 22, rating: 4.7, status: "Active", avatar: "#f59e0b", image: "https://static.vecteezy.com/system/resources/thumbnails/060/608/687/small/active-young-woman-portrait-female-ballet-or-contemporary-dance-teacher-class-in-studio-copy-space-and-empty-place-for-text-photo.jpg" },
  { id: 5, name: "Mr. Dev Kumar", specialization: "Contemporary & Jazz", experience: "5 yrs", students: 19, rating: 4.6, status: "On Leave", avatar: "#6366f1", image: "https://aaoa.in/wp-content/uploads/2024/10/Dance-Teacher.jpg" },
];

export const courses = [
  { id: 1, name: "Ballet", level: "Beginner–Advanced", duration: "60 min", fee: 3500, students: 24, instructor: "Ms. Kavya Reddy", image: "https://www.ballet.org.uk/wp-content/uploads/2025/11/Emma-Hawes-as-Aurora-in-Sir-Kenneth-MacMillans-The-Sleeping-Beauty-%C2%A9-Emily-Nuttall.jpg_1mb.jpg", color: "#ede9fe", accent: "#7c3aed", desc: "Classical ballet technique focusing on grace, posture, and fluid movement." },
  { id: 2, name: "Hip-Hop", level: "Beginner–Intermediate", duration: "60 min", fee: 3000, students: 31, instructor: "Mr. Arjun Singh", image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&q=80", color: "#fce7f3", accent: "#ec4899", desc: "Urban street dance with freestyle moves, breaking, and rhythm training." },
  { id: 3, name: "Kathak", level: "All Levels", duration: "75 min", fee: 3200, students: 18, instructor: "Ms. Sunita Rao", image: "https://www.kathadance.org/wp-content/uploads/40.3-Historical-Repertory-Kathak-Yatra.jpg", color: "#fef3c7", accent: "#f59e0b", desc: "North Indian classical dance emphasizing storytelling through expressions and footwork." },
  { id: 4, name: "Contemporary", level: "Intermediate–Advanced", duration: "60 min", fee: 2800, students: 22, instructor: "Mr. Dev Malhotra", image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&q=80", color: "#ccfbf1", accent: "#0d9488", desc: "Expressive movement blending ballet, jazz, and modern dance techniques." },
  { id: 5, name: "Salsa", level: "Beginner–Advanced", duration: "55 min", fee: 3100, students: 19, instructor: "Ms. Elena Cruz", image: "https://www.shutterstock.com/image-photo/teenage-girl-tight-black-costume-600nw-2399430495.jpg", color: "#fee2e2", accent: "#ef4444", desc: "Latin partner dance with vibrant music, rhythm, and energetic footwork." },
  { id: 6, name: "Bharatanatyam", level: "All Levels", duration: "90 min", fee: 3300, students: 16, instructor: "Ms. Sunita Rao", image: "https://i.pinimg.com/736x/de/c8/1e/dec81e1bba07e57e325a5ee963a4ed3f.jpg", color: "#e0e7ff", accent: "#6366f1", desc: "South Indian classical dance form with intricate mudras and nritta patterns." },
];

export const timetable = [
  { day: "Monday", slots: [{ time: "7:00 AM", course: "Ballet", instructor: "Ms. Kavya", batch: "Morning", room: "Studio A" }, { time: "6:00 PM", course: "Hip-Hop", instructor: "Mr. Arjun", batch: "Evening", room: "Studio B" }] },
  { day: "Tuesday", slots: [{ time: "7:00 AM", course: "Kathak", instructor: "Ms. Sunita", batch: "Morning", room: "Studio A" }, { time: "6:30 PM", course: "Salsa", instructor: "Ms. Elena", batch: "Evening", room: "Studio C" }] },
  { day: "Wednesday", slots: [{ time: "7:00 AM", course: "Contemporary", instructor: "Mr. Dev", batch: "Morning", room: "Studio B" }, { time: "6:00 PM", course: "Ballet", instructor: "Ms. Kavya", batch: "Evening", room: "Studio A" }] },
  { day: "Thursday", slots: [{ time: "7:00 AM", course: "Bharatanatyam", instructor: "Ms. Sunita", batch: "Morning", room: "Studio A" }, { time: "6:30 PM", course: "Hip-Hop", instructor: "Mr. Arjun", batch: "Evening", room: "Studio B" }] },
  { day: "Friday", slots: [{ time: "7:00 AM", course: "Salsa", instructor: "Ms. Elena", batch: "Morning", room: "Studio C" }, { time: "6:00 PM", course: "Kathak", instructor: "Ms. Sunita", batch: "Evening", room: "Studio A" }] },
  { day: "Saturday", slots: [{ time: "9:00 AM", course: "Ballet", instructor: "Ms. Kavya", batch: "Weekend", room: "Studio A" }, { time: "11:00 AM", course: "Hip-Hop", instructor: "Mr. Arjun", batch: "Weekend", room: "Studio B" }, { time: "2:00 PM", course: "Contemporary", instructor: "Mr. Dev", batch: "Weekend", room: "Studio C" }] },
  { day: "Sunday", slots: [{ time: "10:00 AM", course: "Bharatanatyam", instructor: "Ms. Sunita", batch: "Weekend", room: "Studio A" }, { time: "12:00 PM", course: "Kathak", instructor: "Ms. Sunita", batch: "Weekend", room: "Studio B" }] },
];

export const payments = [
  { id: "INV-001", student: "Aria Sharma", course: "Ballet", amount: 3500, date: "01 May 2024", status: "Paid", method: "UPI" },
  { id: "INV-002", student: "Zara Patel", course: "Hip-Hop", amount: 3000, date: "03 May 2024", status: "Paid", method: "Card" },
  { id: "INV-003", student: "Meera Iyer", course: "Kathak", amount: 3200, date: "05 May 2024", status: "Pending", method: "—" },
  { id: "INV-004", student: "Lily Chen", course: "Contemporary", amount: 2800, date: "07 May 2024", status: "Overdue", method: "—" },
  { id: "INV-005", student: "Riya Nair", course: "Salsa", amount: 3100, date: "10 May 2024", status: "Paid", method: "Cash" },
  { id: "INV-006", student: "Anika Verma", course: "Ballet", amount: 3500, date: "12 May 2024", status: "Paid", method: "UPI" },
  { id: "INV-007", student: "Sara Khan", course: "Hip-Hop", amount: 3000, date: "15 May 2024", status: "Pending", method: "—" },
];

export const attendance = [
  { student: "Aria Sharma", course: "Ballet", present: 18, absent: 2, total: 20, percent: 90 },
  { student: "Zara Patel", course: "Hip-Hop", present: 17, absent: 3, total: 20, percent: 85 },
  { student: "Meera Iyer", course: "Kathak", present: 20, absent: 0, total: 20, percent: 100 },
  { student: "Lily Chen", course: "Contemporary", present: 12, absent: 8, total: 20, percent: 60 },
  { student: "Riya Nair", course: "Salsa", present: 19, absent: 1, total: 20, percent: 95 },
  { student: "Anika Verma", course: "Ballet", present: 16, absent: 4, total: 20, percent: 80 },
  { student: "Sara Khan", course: "Hip-Hop", present: 18, absent: 2, total: 20, percent: 90 },
];

export const testimonials = [
  { name: "Mrs. Sharma", role: "Parent of Aria", text: "Rhythmique transformed my daughter's confidence. The instructors are world-class and truly passionate.", avatar: "#7c3aed", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLCpFKGtdwNH5nzgvN2qm3dyaVrnOjy0uF9Q&s" },
  { name: "Zara Patel", role: "Student, Hip-Hop", text: "I've been dancing here for 2 years. The environment is so positive and the choreography is amazing!", avatar: "#f472b6", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Mr. Iyer", role: "Parent of Meera", text: "Best classical dance academy in the city. Meera has won three competitions since joining!", avatar: "#0d9488", image: "https://static.vecteezy.com/system/resources/thumbnails/060/608/687/small/active-young-woman-portrait-female-ballet-or-contemporary-dance-teacher-class-in-studio-copy-space-and-empty-place-for-text-photo.jpg" },
];
