import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ 
  component: () => (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to Common Good</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Blockchain-powered participatory governance
      </p>
      <a
        href="/projects"
        className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
      >
        Explore Projects
      </a>
    </div>
  )
})
