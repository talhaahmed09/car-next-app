"use client";
import "../styles/globals.css";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <head>
        <title>Car Registry System Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to Car Registry System</h1>
        <a href="/vehicles">
          <span className="mt-8 px-6 py-3 rounded-full bg-blue-500 text-white flex items-center">
            <span>Let's Go</span>
            <svg
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M14.707 10l-5.146-5.146a.5.5 0 11.708-.708l5.5 5.5a.5.5 0 010 .708l-5.5 5.5a.5.5 0 01-.708-.708L14.707 10z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </a>
      </main>
    </div>
  );
}
