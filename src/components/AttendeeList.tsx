import { AttendeeListProps } from "@/interfaces";
import React from "react";

function AttendeeList({ attendees }: AttendeeListProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {attendees.length > 0 ? (
        <table className="min-w-full text-sm text-left text-gray-50">
          <thead className="text-xs text-white uppercase  ">
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
            {attendees?.map((attendee) => (
              <tr key={attendee?.id} className=" border-b hover:bg-slate-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
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
        <div className="text-center py-6 text-gray-500">
          No attendees to display.
        </div>
      )}
    </div>
  );
}

export default AttendeeList;
