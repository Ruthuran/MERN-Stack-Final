// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    // Find all courses and sort by 'order' in ascending order (1)
    const courses = await Course.find().sort({ order: 1 });

    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found' });
    }

    res.json(courses); // Send the courses as a JSON response
  } catch (err) {
    console.error("Error fetching courses:", err); // Log error for debugging
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};
