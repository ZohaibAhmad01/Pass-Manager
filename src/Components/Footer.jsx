import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-linear-gradient-to-r from-violet-900 via-violet-800 to-purple-800 text-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold">
                                PM
                            </div>
                            <span className="text-xl font-bold">PassManager</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">
                            Secure password management solution for all your digital accounts.
                            Keep your credentials safe and accessible.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex flex-col gap-4">
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors w-fit"
                            >
                                <img
                                    src="/icons/github white.svg"
                                    alt="GitHub"
                                    className="w-5 h-5"
                                />
                                <span>GitHub</span>
                            </a>

                            <a
                                href="mailto:contact@passmanager.com"
                                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors w-fit"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>Contact Us</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-8" />

                {/* Bottom footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
                    <div>
                        &copy; {currentYear} PassManager. All rights reserved.
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
