// app/producto/[slug]/product-loading.tsx
export default function ProductLoading() {
    return (
      <div className="min-h-screen bg-zinc-950">
        {/* Breadcrumbs skeleton */}
        <div className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="h-4 bg-zinc-800 rounded w-16 animate-pulse" />
              <div className="h-4 bg-zinc-800 rounded w-4 animate-pulse" />
              <div className="h-4 bg-zinc-800 rounded w-20 animate-pulse" />
              <div className="h-4 bg-zinc-800 rounded w-4 animate-pulse" />
              <div className="h-4 bg-zinc-800 rounded w-32 animate-pulse" />
            </div>
          </div>
        </div>
  
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image skeleton */}
            <div className="animate-pulse">
              <div className="aspect-square bg-zinc-900 rounded-3xl mb-4" />
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-zinc-900 rounded-xl" />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-zinc-900 rounded-xl" />
                ))}
              </div>
            </div>
  
            {/* Info skeleton */}
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-zinc-900 rounded w-3/4" />
              <div className="h-6 bg-zinc-900 rounded w-1/2" />
              <div className="h-4 bg-zinc-900 rounded w-1/3" />
              
              <div className="h-48 bg-zinc-900 rounded-3xl" />
              <div className="h-24 bg-zinc-900 rounded-2xl" />
              <div className="h-32 bg-zinc-900 rounded-xl" />
              
              <div className="flex gap-4">
                <div className="h-14 bg-zinc-900 rounded-xl flex-1" />
                <div className="h-14 bg-zinc-900 rounded-xl w-32" />
              </div>
            </div>
          </div>
  
          {/* Related products skeleton */}
          <div className="animate-pulse">
            <div className="h-10 bg-zinc-900 rounded w-64 mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-zinc-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-zinc-800 rounded w-3/4" />
                    <div className="h-4 bg-zinc-800 rounded w-1/2" />
                    <div className="h-6 bg-zinc-800 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }