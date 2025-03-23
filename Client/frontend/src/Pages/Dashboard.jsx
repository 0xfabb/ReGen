import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Trash2,
  Recycle,
  TrendingUp,
  Award,
  UserCircle,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user")
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Fallback/default data to use when API data is loading
  const defaultUserData = {
    name: "User",
    points: 0,
    rank: "Beginner",
    nextRank: "Eco Enthusiast",
    pointsToNextRank: 100,
    wasteStats: {
      recycled: 0,
      composted: 0,
      reduced: 0
    }
  };

  // Use actual userData if loaded, otherwise use default data
  const displayData = loading ? defaultUserData : userData || defaultUserData;

  // Function to get user initials
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const recentActivities = [
    {
      id: 1,
      type: "Recycled",
      item: "Plastic bottles",
      amount: "2.5 kg",
      date: "Today",
      points: 15,
    },
    {
      id: 2,
      type: "Composted",
      item: "Food waste",
      amount: "1.8 kg",
      date: "Yesterday",
      points: 12,
    },
    {
      id: 3,
      type: "Recycled",
      item: "Paper",
      amount: "3.0 kg",
      date: "2 days ago",
      points: 18,
    },
    {
      id: 4,
      type: "Reduced",
      item: "Plastic bags",
      amount: "0.5 kg",
      date: "3 days ago",
      points: 10,
    },
  ];

  const upcomingPickups = [
    { id: 1, type: "Recyclables", date: "Tomorrow, 10:00 AM" },
    { id: 2, type: "Compost", date: "Friday, 9:00 AM" },
  ];

  const ecoTips = [
    "Use reusable bags when shopping to reduce plastic waste.",
    "Compost food scraps to create nutrient-rich soil for plants.",
    "Recycle paper, plastic, glass, and metal to conserve resources.",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed z-20 bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-10
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="h-full flex flex-col">
          {/* Logo and Brand */}
          <div className="p-4 border-b flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-800">ReGen</span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <button className="flex items-center space-x-3 w-full p-3 rounded-lg bg-green-50 text-green-700">
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Recycle className="w-5 h-5" />
              <span>My Recycling</span>
            </button>

            <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Calendar className="w-5 h-5" />
              <span>Schedule Pickup</span>
            </button>

            <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Award className="w-5 h-5" />
              <span>Rewards</span>
            </button>

            <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <TrendingUp className="w-5 h-5" />
              <span>Impact</span>
            </button>

            <hr className="my-2 border-gray-200" />

            <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <UserCircle className="w-5 h-5" />
              <span>Profile</span>
            </button>

            <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            {loading ? (
              <p className="mt-1 text-gray-600">Loading user data...</p>
            ) : (
              <p className="mt-1 text-gray-600">
                Welcome back, {displayData.name}
              </p>
            )}
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                {getUserInitials(displayData.name)}
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">My Points</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {displayData.rank}
                  </span>
                </div>
                <div className="mt-2 text-2xl font-bold text-gray-800">
                  {displayData.points} pts
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <div className="flex-1">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                        style={{
                          width: `${
                            (displayData.points /
                              (displayData.points + displayData.pointsToNextRank)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-500">
                    {displayData.pointsToNextRank} pts to {displayData.nextRank}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="text-gray-500 text-sm">Total Recycled</div>
                <div className="mt-2 text-2xl font-bold text-gray-800">
                  {displayData.wasteStats.recycled} kg
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>12% more than last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="text-gray-500 text-sm">Total Composted</div>
                <div className="mt-2 text-2xl font-bold text-gray-800">
                  {displayData.wasteStats.composted} kg
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>8% more than last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="text-gray-500 text-sm">Waste Reduced</div>
                <div className="mt-2 text-2xl font-bold text-gray-800">
                  {displayData.wasteStats.reduced} kg
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>5% more than last month</span>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Recent Activity
                  </h2>
                  <button className="text-sm text-green-600 hover:text-green-700">
                    View All
                  </button>
                </div>
                <div className="divide-y">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="px-6 py-4 flex items-center">
                      <div
                        className={`
                          p-3 rounded-lg mr-4
                          ${
                            activity.type === "Recycled"
                              ? "bg-blue-100 text-blue-700"
                              : activity.type === "Composted"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {activity.type === "Recycled" ? (
                          <Recycle className="w-5 h-5" />
                        ) : activity.type === "Composted" ? (
                          <Leaf className="w-5 h-5" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {activity.type} {activity.item}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activity.amount} • {activity.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-green-600">
                          +{activity.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-gray-50 text-center">
                  <button className="text-green-600 hover:text-green-700 font-medium">
                    Log New Activity
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Pickups */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-lg text-gray-800">
                      Upcoming Pickups
                    </h2>
                  </div>
                  {upcomingPickups.length > 0 ? (
                    <div className="divide-y">
                      {upcomingPickups.map((pickup) => (
                        <div key={pickup.id} className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg text-green-700 mr-3">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{pickup.type}</h3>
                              <p className="text-sm text-gray-500">{pickup.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No upcoming pickups scheduled
                    </div>
                  )}
                  <div className="px-6 py-4 bg-gray-50 text-center">
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      Schedule Pickup
                    </button>
                  </div>
                </div>

                {/* Eco Tips */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-lg text-gray-800">
                      Eco Tips
                    </h2>
                  </div>
                  <div className="px-6 py-4">
                    <div className="space-y-3">
                      {ecoTips.map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <Leaf className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="ml-2 text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 text-center">
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      More Tips
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
