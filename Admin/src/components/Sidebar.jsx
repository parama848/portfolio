import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <h1 className="text-2xl font-bold p-5 border-b border-gray-700">
        Admin Panel
      </h1>

      <ul className="p-4 space-y-4">
        <li>
          <Link
            to="/"
            className="block p-2 rounded hover:bg-gray-700 transition"
          >
            ➕ Create Project
          </Link>
        </li>

        <li>
          <Link
            to="/projects"
            className="block p-2 rounded hover:bg-gray-700 transition"
          >
            📋 Project List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;