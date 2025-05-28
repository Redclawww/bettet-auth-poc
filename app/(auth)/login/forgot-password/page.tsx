export default function page() {
  return (
    <form className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Forgot your Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 rounded mb-4 w-80"
      />
      <button className="bg-blue-500 text-white p-2 rounded w-80" type="submit">
        Send Reset Link
      </button>
      <p className="text-sm mt-4">
        Remembered your password?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Sign In
        </a>
      </p>
    </form>
  );
}
