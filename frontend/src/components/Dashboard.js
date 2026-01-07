import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({})

    const getUserData = async () => {

        const token = localStorage.getItem("token");

        if (!token) return null;

        try {
            const response = await fetch("http://localhost:5000/getUserDataByToken", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token
                }),
            });

            if (!response.ok) {
                const { error } = await response.json();

                alert(error || "Error loading dashboard. You'll be redirected to the login page")
                navigate("/login")
            }

            const data = await response.json();

            return data;
        } catch (err) {
            console.error("Error while loading the dashboard", err);
            alert("An error occured while loading the dashbaord. You'll be redirected to the login page.");
            navigate("/login");
        }
    };

    useEffect(() => {
        getUserData().then(data => {
            if (data) {
                setUserData(data);
                console.log(data)
            } else {
                alert("No access-token stored. Please login again.")
                navigate("/login");
            }
        });
    }, []);

    return (
        <div className="flex flex-col h-full justify-center">
            <h1 className="text-xl text-blue-700 font-bold mt-8">Hello {userData.name}, welcome back to your Splitly Account</h1>

            {userData.groups && userData.groups.length > 0 ? (
                 <>
                    {/* Grid view */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Your Groups</h2>
                        {/*<button 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={/* open create modal 
                        >
                            + Create Group
                        </button>*/}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userData.groups.map(group => (
                            <div key={group.group_id} className="border p-4 rounded shadow">
                                <h3 className="font-semibold">{group.description}</h3>
                                <p className="text-sm text-gray-500">Role: {group.role}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    <p>No groups yet :(</p>
                </div>
            )}
        </div>
    );
}