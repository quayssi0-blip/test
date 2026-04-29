export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-8 text-center text-neutral-200">
      <h1 className="text-4xl font-bold mb-6">Welcome to Next.js 16 Starter</h1>
      <p className="mb-8 max-w-xl">
        This template is ready for AI-assisted development. To get started:
      </p>
      <div className="space-y-4 text-left w-full max-w-xl">
        <p className="flex items-start"><span className="flex-shrink-0 text-blue-400">•</span><span className="ml-3">Define what type of application you want to build</span></p>
        <p className="flex items-start"><span className="flex-shrink-0 text-blue-400">•</span><span className="ml-3">Specify the features you need</span></p>
        <p className="flex items-start"><span className="flex-shrink-0 text-blue-400">•</span><span className="ml-3">Share design preferences or branding guidelines</span></p>
      </div>
      <p className="mt-8 text-sm text-neutral-400">
        Available recipes: <code className="bg-neutral-800 px-2 py-1 rounded">add-database</code>
      </p>
    </main>
  );
}
