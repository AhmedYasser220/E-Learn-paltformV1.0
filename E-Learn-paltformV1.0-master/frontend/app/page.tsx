export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          E-Learning Platform
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <a
            href="/forums"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">Course Forums</h2>
            <p className="text-gray-600">
              Engage in course discussions and collaborate with peers
            </p>
          </a>
          <a
            href="/backup"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">System Backup</h2>
            <p className="text-gray-600">
              Manage and monitor system backups
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}