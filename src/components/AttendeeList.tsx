import { AttendeeListProps } from "@/interfaces/propsInterfaces";
import React from "react";

function AttendeeList({ attendees }: AttendeeListProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {attendees.length > 0 ? (
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr
                key={attendee?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {attendee?.name}
                </th>
                <td className="px-6 py-4">{attendee?.email}</td>
                <td className="px-6 py-4">{attendee?.phone}</td>
                <td className="px-6 py-4">{attendee?.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No attendees to display.
        </div>
      )}
    </div>
  );
}

export default AttendeeList;
