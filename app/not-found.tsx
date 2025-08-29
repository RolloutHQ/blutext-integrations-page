export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold mb-2">Missing userId</h1>
        <p className="text-gray-600">
          This page expects a <code>userId</code> query parameter.
        </p>
        <p className="text-gray-600 mt-2">
          Append <code>?userId=&lt;your-id&gt;</code> to the URL and try again.
        </p>
      </div>
    </main>
  );
}

