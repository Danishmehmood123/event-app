"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToFav } from "../../redux/globalStates";
export default function Home() {
  const dispath = useDispatch();
  const ACCESS_TOKEN = "Zgp9WYsIVC4a748NsfhjH3lTv3VEjBqsKtm0R-gk";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getEvents = async () => {
    try {
      setLoading(true);
      let result = await fetch("https://api.predicthq.com/v1/events", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: "application/json",
        },
      });
      result = await result.json();
      setEvents(result?.results);
      setLoading(false);
    } catch (error) {
     console.log(error)
    }
  };
  const applyFilters = () => {
    let filtered = events;

    if (selectedCountry) {
      filtered = filtered.filter((event) => event.country === selectedCountry);
    }

    if (selectedEvent) {
      filtered = filtered.filter((event) => event.category === selectedEvent);
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCountry, selectedEvent, events]);

  return (
    <main className="">
      <div className="flex flex-col md:flex-row gap-3 items center justify-center md:justify-between px-5 py-2">
        <h2 className="text-center kanit text-2xl font-bold">Events List</h2>
        <div className="flex gap-5 items-center justify-center ">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Filter By Country</option>
            <option value="US">US</option>
            <option value="AU">AU</option>
          </select>

          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Filter By Event</option>
            <option value="sports">SPORTS</option>
            <option value="concerts">CONCERTS</option>
          </select>
        </div>
      </div>

      <div className="">
        <table className="min-w-full">
          <thead className="text-[#4925E9]">
            <tr>
              <th className="px-6 py-3  border-b border-gray-200 kanitt text-left text-lg leading-4 font-bold text-[#4925E9] uppercase">
                Category
              </th>
              <th className="px-6 py-3  border-b border-gray-200 kanit text-left text-lg leading-4 font-bold text-[#4925E9] uppercase">
                Country
              </th>
              <th className="px-6 py-3  border-b border-gray-200 kanit text-left text-lg leading-4 font-bold text-[#4925E9] uppercase">
                Labels
              </th>
            </tr>
          </thead>
         

          <tbody className="bg-white">
            {filteredEvents.map((event, ind) => (
              <tr key={ind} className=" border-t border-gray-200">
                <td className="knit px-6 py-4 ">{event?.category}</td>
                <td className="px-6 py-4 ">{event?.country}</td>
                <td className="px-6 py-4 ">{event?.labels[0]}</td>
                <td className="px-6 py-4 ">
                  <button
                    className="bg text-white p-2 rounded-md transform hover:scale-105 transition-transform"
                    onClick={() => dispath(addToFav(event))}
                  >
                    Add Favourite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[calc(100vh-98px)] flex justify-center items-center">
              <span className="loader"></span>
            </div>
          )}
      </div>
    </main>
  );
}
