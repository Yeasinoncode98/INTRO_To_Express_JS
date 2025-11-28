import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiMotorbikeLine } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import { RiUserSearchFill } from "react-icons/ri";
import useRole from "../Hooks/useRole";
import { RiMotorbikeFill } from "react-icons/ri";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import LogoImg from "../assets/logo.png";
const DashBoardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Zap Shift Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <Link to="/">
                <img src={LogoImg} alt="" />
              </Link>
            </li>

            {/* List item */}
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Our Dashboard Links */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="MyParcels"
                to="/dashboard/my-parcels"
              >
                <CiDeliveryTruck />
                <span className="is-drawer-close:hidden">MyParcels</span>
              </NavLink>
            </li>
            {/* Payment history */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
                to="/dashboard/payment-history"
              >
                <FaCreditCard />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>

            {role === "rider" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Deliveries"
                    to="/dashboard/assigned-deliveries"
                  >
                    <MdOutlineTaskAlt />
                    <span className="is-drawer-close:hidden">
                      Assigned Deliveries
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Copmpleted Deliveries"
                    to="/dashboard/completed-deliveries"
                  >
                    <FaTasks />
                    <span className="is-drawer-close:hidden">
                      Copmpleted Deliveries
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Only Links*/}

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                    to="/dashboard/approve-riders"
                  >
                    <RiMotorbikeLine />
                    <span className="is-drawer-close:hidden">
                      Approve Riders
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Riders"
                    to="/dashboard/assign-riders"
                  >
                    <RiMotorbikeFill />
                    <span className="is-drawer-close:hidden">
                      Assign Riders
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                    to="/dashboard/users-management"
                  >
                    <RiUserSearchFill />
                    <span className="is-drawer-close:hidden">
                      Users Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
