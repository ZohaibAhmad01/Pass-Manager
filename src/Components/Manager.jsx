import React, { useEffect, useRef, useState } from "react";
import { Bounce, Flip, ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  // ✅ Fetch all passwords
  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/passwords");
      let passwords = await req.json();
      setPasswordArray(passwords);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
      transition: Flip,
    });

    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";

    if (ref.current.src.includes("icons/eye password.png")) {
      ref.current.src = "icons/eye.png";
    } else {
      ref.current.src = "icons/eye password.png";
    }
  };

  // ✅ Save password (Create or Update)
  const savePassword = async () => {
    const { site, username, password, _id } = form;

    if (site.length < 3 || username.length < 3 || password.length < 3) {
      toast.error("Please fill in all fields correctly.", {
        position: "top-right",
        autoClose: false,
        transition: Flip,
      });
      return;
    }

    // ✅ Update existing password
    if (_id) {
      await fetch(`http://localhost:3000/passwords/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      toast.success("Password updated successfully!");
      getPasswords();
      setForm({ site: "", username: "", password: "" });
      return;
    }

    // ✅ Create new password
    const res = await fetch("http://localhost:3000/passwords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setPasswordArray([
      ...passwordArray,
      { ...form, _id: data.result.insertedId },
    ]);

    setForm({ site: "", username: "", password: "" });

    toast.success("Password saved successfully!", {
      position: "top-right",
      autoClose: false,
      transition: Flip,
    });
  };

  // ✅ Delete password
  const deletePassword = async (id) => {
    if (!confirm("Are you sure you want to delete this password?")) return;

    await fetch(`http://localhost:3000/passwords/${id}`, {
      method: "DELETE",
    });

    setPasswordArray(passwordArray.filter((item) => item._id !== id));

    toast.success("Password deleted successfully!", {
      position: "top-right",
      autoClose: false,
      transition: Flip,
    });
  };

  // ✅ Edit password
  const editPassword = (id) => {
    const pwd = passwordArray.find((i) => i._id === id);
    setForm(pwd);
    setPasswordArray(passwordArray.filter((item) => item._id !== id));
  };

  // ✅ Input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={false} theme="light" />

      {/* Decorative background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 opacity-90" />
        <div className="absolute -bottom-40 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600/20 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="min-h-screen py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                P
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">
                  Pass<span className="text-purple-300">Manager</span>
                </h1>
                <p className="text-sm text-purple-200/80">
                  Securely store and manage your passwords
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-1 bg-gradient-to-tr from-white to-purple-50 rounded-xl p-5 shadow-inner border border-purple-100">
                <h2 className="text-lg font-semibold text-purple-700 mb-4">
                  Add / Edit Password
                </h2>
                <div className="flex flex-col gap-3">
                  <input
                    value={form.site}
                    onChange={handleChange}
                    placeholder="Website URL"
                    className="rounded-md border border-purple-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                    type="text"
                    name="site"
                  />

                  <input
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="rounded-md border border-purple-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                    type="text"
                    name="username"
                  />

                  <div className="relative">
                    <input
                      ref={passwordRef}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="rounded-md border border-purple-200 px-3 py-2 bg-white w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                      type="password"
                      name="password"
                    />
                    <button
                      type="button"
                      onClick={showPassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-purple-100"
                    >
                      <img
                        ref={ref}
                        className="w-6 h-6"
                        src="icons/eye.png"
                        alt="eye"
                      />
                    </button>
                  </div>

                  <button
                    onClick={savePassword}
                    className="w-full mt-1 inline-flex justify-center gap-2 items-center bg-purple-600 rounded-md px-4 py-2 text-white font-medium hover:bg-purple-700 transform hover:scale-[1.01] transition"
                  >
                    <lord-icon
                      colors="primary:#ffffff"
                      src="https://cdn.lordicon.com/efxgwrkc.json"
                      trigger="hover"
                      className="w-5 h-5"
                    />
                    Save Password
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-800">
                    Your Saved Passwords
                  </h3>
                  <div className="text-sm text-gray-500">
                    {passwordArray.length} items
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  {passwordArray.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No passwords saved yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
                          <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium">
                              Site
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium">
                              Username
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium">
                              Password
                            </th>
                            <th className="py-3 px-4 text-center text-sm font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                          {passwordArray.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <a
                                    href={item.site}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-purple-700 hover:underline text-sm truncate max-w-[260px]"
                                  >
                                    {item.site}
                                  </a>
                                  <button
                                    onClick={() => copyText(item.site)}
                                    className="p-1 rounded-md hover:bg-gray-100"
                                  >
                                    <lord-icon
                                      src="https://cdn.lordicon.com/efxgwrkc.json"
                                      trigger="hover"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </td>

                              <td className="py-3 px-4 text-sm">
                                <div className="flex items-center gap-2">
                                  {item.username}
                                  <button
                                    onClick={() => copyText(item.username)}
                                    className="p-1 rounded-md hover:bg-gray-100"
                                  >
                                    <lord-icon
                                      src="https://cdn.lordicon.com/efxgwrkc.json"
                                      trigger="hover"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </td>

                              <td className="py-3 px-4 text-sm">
                                <div className="flex items-center gap-2">
                                  {"*".repeat(item.password.length)}
                                  <button
                                    onClick={() => copyText(item.password)}
                                    className="p-1 rounded-md hover:bg-gray-100"
                                  >
                                    <lord-icon
                                      src="https://cdn.lordicon.com/efxgwrkc.json"
                                      trigger="hover"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </td>

                              <td className="py-3 px-4 text-center">
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={() => editPassword(item._id)}
                                    className="p-2 rounded-md hover:bg-gray-100"
                                  >
                                    <lord-icon
                                      src="https://cdn.lordicon.com/cfkiwvcc.json"
                                      trigger="hover"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                  <button
                                    onClick={() => deletePassword(item._id)}
                                    className="p-2 rounded-md hover:bg-red-50"
                                  >
                                    <lord-icon
                                      src="https://cdn.lordicon.com/oqeixref.json"
                                      trigger="hover"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
