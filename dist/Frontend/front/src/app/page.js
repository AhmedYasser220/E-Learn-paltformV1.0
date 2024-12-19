"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const link_1 = require("next/link");
const axios_1 = require("axios");
const HomePage = () => {
    const [courses, setCourses] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios_1.default.get('/api/courses');
                setCourses(response.data);
            }
            catch (error) {
                console.error('Error fetching courses:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    return (<div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-2xl font-bold">E-Learning Platform</h1>
        <nav className="flex space-x-4">
          <link_1.default href="/profile" className="px-4 py-2 text-blue-500 hover:text-blue-700">
            Profile
          </link_1.default>
          <link_1.default href="/login" className="px-4 py-2 text-blue-500 hover:text-blue-700">
            Login
          </link_1.default>
        </nav>
      </header>

      <main className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        {loading ? (<p>Loading courses...</p>) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (<div key={course._id} className="border rounded p-4 shadow-sm">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <link_1.default href={`/courses/${course._id}`} className="mt-2 inline-block text-blue-500 hover:text-blue-700">
                  View Details
                </link_1.default>
              </div>))}
          </div>)}
      </main>
    </div>);
};
exports.default = HomePage;
//# sourceMappingURL=page.js.map