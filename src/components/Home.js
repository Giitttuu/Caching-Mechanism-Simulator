import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Interactive Cache Simulator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Visualize and understand cache replacement algorithms with real-time
            analytics
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              🎯 What is Cache Memory?
            </h2>
            <p className="text-blue-700 text-lg leading-relaxed">
              Cache memory is a small, fast storage component that stores
              frequently accessed data to reduce the time it takes to access
              that data from the main memory. It acts as a buffer between the
              CPU and main memory, significantly improving system performance.
            </p>
          </div>
        </div>

        {/* Theory Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Cache Basics */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              📚 Cache Memory Fundamentals
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-lg mb-2">What is Cache?</h4>
                <p>
                  Cache memory is a high-speed data storage layer that stores a
                  subset of data from a larger, slower storage system. It's
                  designed to speed up data access by keeping frequently used
                  data close to the processor.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Why is Cache Important?
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Speed:</strong> Cache is 10-100x faster than main
                    memory
                  </li>
                  <li>
                    <strong>Efficiency:</strong> Reduces memory access time
                  </li>
                  <li>
                    <strong>Performance:</strong> Improves overall system
                    performance
                  </li>
                  <li>
                    <strong>Cost-effective:</strong> Small amount of fast memory
                    vs large slow memory
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Cache Hierarchy</h4>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">CPU</div>
                    <div className="text-xs">↓</div>
                    <div className="bg-red-100 p-2 rounded">
                      L1 Cache (Fastest, Smallest)
                    </div>
                    <div className="text-xs">↓</div>
                    <div className="bg-orange-100 p-2 rounded">L2 Cache</div>
                    <div className="text-xs">↓</div>
                    <div className="bg-yellow-100 p-2 rounded">L3 Cache</div>
                    <div className="text-xs">↓</div>
                    <div className="bg-green-100 p-2 rounded">
                      Main Memory (Slowest, Largest)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cache Operations */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ⚙️ Cache Operations
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Cache Hit vs Miss
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <span>
                      <strong>Cache Hit:</strong> Data found in cache (fast
                      access)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    <span>
                      <strong>Cache Miss:</strong> Data not in cache (slow
                      access)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Hit Rate Calculation
                </h4>
                <div className="bg-gray-100 p-3 rounded-md">
                  <code className="text-sm">
                    Hit Rate = (Number of Hits) / (Total Access Attempts) × 100%
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Cache Performance Metrics
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Hit Rate:</strong> Percentage of successful cache
                    accesses
                  </li>
                  <li>
                    <strong>Miss Rate:</strong> Percentage of failed cache
                    accesses
                  </li>
                  <li>
                    <strong>Access Time:</strong> Time to retrieve data from
                    cache
                  </li>
                  <li>
                    <strong>Eviction Rate:</strong> How often data is removed
                    from cache
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Explanations */}
        <div className="card mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            🔄 Cache Replacement Algorithms
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FIFO */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-xl font-bold text-blue-600 mb-3">FIFO</h4>
              <p className="text-sm text-gray-600 mb-2">First In, First Out</p>
              <p className="text-gray-700 mb-3">
                Evicts the oldest item in the cache when space is needed. Simple
                but not always optimal.
              </p>
              <div className="bg-blue-50 p-3 rounded text-sm">
                <strong>Example:</strong> If cache has [1,2,3] and we add 4,
                remove 1 (oldest) to get [2,3,4]
              </div>
            </div>

            {/* LRU */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-xl font-bold text-green-600 mb-3">LRU</h4>
              <p className="text-sm text-gray-600 mb-2">Least Recently Used</p>
              <p className="text-gray-700 mb-3">
                Evicts the item that hasn't been accessed for the longest time.
                Generally performs better than FIFO.
              </p>
              <div className="bg-green-50 p-3 rounded text-sm">
                <strong>Example:</strong> If cache has [1,2,3] and we access 1,
                then add 4, remove 2 (least recently used) to get [1,3,4]
              </div>
            </div>

            {/* LFU */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-xl font-bold text-purple-600 mb-3">LFU</h4>
              <p className="text-sm text-gray-600 mb-2">
                Least Frequently Used
              </p>
              <p className="text-gray-700 mb-3">
                Evicts the item that has been accessed the least number of
                times. Good for workloads with clear access patterns.
              </p>
              <div className="bg-purple-50 p-3 rounded text-sm">
                <strong>Example:</strong> If 1 is accessed 3 times, 2 once, 3
                twice, and we add 4, remove 2 (least frequent) to get [1,3,4]
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="card mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            🚀 How to Use This Simulator - Complete Beginner's Guide
          </h3>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Step 1: Understanding Memory Traces
              </h4>
              <p className="text-gray-600 mb-4">
                A <strong>memory trace</strong> is like a shopping list that
                shows what data your computer needs to access. Each number
                represents a piece of data (like a file, webpage, or program
                instruction) that the CPU wants to use.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800">
                  <strong>Think of it like this:</strong> If you're cooking and
                  need ingredients from your pantry, your "memory trace" might
                  be: flour, eggs, milk, flour, sugar, eggs, butter, flour...
                </p>
              </div>

              <p className="text-gray-600 mb-3">
                Enter your memory trace in the text box. You can separate
                numbers with commas or spaces:
              </p>

              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <strong>Try these examples to see different patterns:</strong>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <strong>Sequential Pattern:</strong> 1,2,3,4,5,6,7,8
                    <br />
                    <span className="text-sm text-gray-600">
                      Like reading a book page by page
                    </span>
                  </div>
                  <div>
                    <strong>Repeated Pattern:</strong> 1,2,3,1,2,3,1,2,3
                    <br />
                    <span className="text-sm text-gray-600">
                      Like going back to favorite websites
                    </span>
                  </div>
                  <div>
                    <strong>Locality Pattern:</strong> 1,2,3,4,1,2,5,6,1,2,7,8
                    <br />
                    <span className="text-sm text-gray-600">
                      Like working on related files together
                    </span>
                  </div>
                  <div>
                    <strong>Random Pattern:</strong> 3,1,4,1,5,9,2,6,5,3
                    <br />
                    <span className="text-sm text-gray-600">
                      Like browsing the internet randomly
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600">
                <strong>Pro Tip:</strong> Start with the preset buttons -
                they're designed to show interesting behaviors!
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Step 2: Understanding Cache Configuration
              </h4>

              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold text-gray-600 mb-2">
                    Choose Your Algorithms
                  </h5>
                  <p className="text-gray-600 mb-3">
                    Think of each algorithm as a different "organizing strategy"
                    for your cache:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-red-50 p-3 rounded border">
                      <strong>FIFO:</strong> "First In, First Out" - Like a
                      queue at a store
                    </div>
                    <div className="bg-green-50 p-3 rounded border">
                      <strong>LRU:</strong> "Least Recently Used" - Keep
                      recently used items
                    </div>
                    <div className="bg-purple-50 p-3 rounded border">
                      <strong>LFU:</strong> "Least Frequently Used" - Keep most
                      popular items
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-600 mb-2">
                    Set Cache Size
                  </h5>
                  <p className="text-gray-600 mb-3">
                    This is like deciding how many items you can keep in your
                    "quick access drawer" before you need to put something back
                    in the main storage.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded border">
                    <strong>Rule of thumb:</strong>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      <li>
                        Small cache (2-4): Shows clear differences between
                        algorithms
                      </li>
                      <li>
                        Large cache (8-16): All algorithms perform better,
                        differences are smaller
                      </li>
                      <li>
                        Try different sizes to see how it affects performance!
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-600 mb-2">
                    Animation Speed
                  </h5>
                  <p className="text-gray-600">
                    Control how fast the simulation runs. Slower speeds help you
                    see each step clearly, while faster speeds let you see the
                    overall pattern quickly.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Step 3: Running the Simulation
              </h4>

              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h5 className="font-semibold text-green-800 mb-2">
                    🚀 Automatic Mode (Recommended for beginners)
                  </h5>
                  <ol className="list-decimal list-inside text-green-700 space-y-1">
                    <li>
                      Click <strong>"Initialize Caches"</strong> - This sets up
                      empty caches for each algorithm
                    </li>
                    <li>
                      Click <strong>"Start Simulation"</strong> - Watch the
                      magic happen automatically!
                    </li>
                    <li>
                      Observe how each algorithm fills its cache and makes
                      decisions
                    </li>
                    <li>
                      Use <strong>"Stop Simulation"</strong> to pause anytime
                    </li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">
                    🔍 Manual Mode (For detailed learning)
                  </h5>
                  <ol className="list-decimal list-inside text-blue-700 space-y-1">
                    <li>
                      Click <strong>"Initialize Caches"</strong> first
                    </li>
                    <li>
                      Use <strong>"Step Forward →"</strong> to process one
                      memory reference at a time
                    </li>
                    <li>
                      Use <strong>"← Step Back"</strong> to go back and see what
                      happened
                    </li>
                    <li>
                      This lets you understand each decision the algorithm makes
                    </li>
                  </ol>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h5 className="font-semibold text-orange-800 mb-2">
                    📊 What You'll See
                  </h5>
                  <ul className="list-disc list-inside text-orange-700 space-y-1">
                    <li>
                      <strong>Cache Visualization:</strong> See each algorithm's
                      cache state in real-time
                    </li>
                    <li>
                      <strong>Color Coding:</strong> Green for hits, red for
                      misses, orange for evictions
                    </li>
                    <li>
                      <strong>Memory Trace:</strong> Shows which reference is
                      currently being processed
                    </li>
                    <li>
                      <strong>Statistics:</strong> Live hit/miss counts and
                      percentages
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Step 4: Understanding the Results
              </h4>

              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold text-gray-600 mb-2">
                    Key Metrics to Watch
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-100 p-3 rounded">
                      <strong>Hit Rate:</strong> Percentage of times data was
                      found in cache
                      <br />
                      <span className="text-sm text-gray-600">
                        Higher is better! 80%+ is excellent
                      </span>
                    </div>
                    <div className="bg-red-100 p-3 rounded">
                      <strong>Miss Rate:</strong> Percentage of times data
                      wasn't in cache
                      <br />
                      <span className="text-sm text-gray-600">
                        Lower is better! 20% or less is good
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-600 mb-2">
                    What to Look For
                  </h5>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>
                      <strong>Which algorithm performs best?</strong> Compare
                      hit rates
                    </li>
                    <li>
                      <strong>When do misses happen?</strong> Look for patterns
                      in the trace
                    </li>
                    <li>
                      <strong>What gets evicted?</strong> See which items each
                      algorithm removes
                    </li>
                    <li>
                      <strong>How does cache size matter?</strong> Try different
                      sizes and compare
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                  <h5 className="font-semibold text-purple-800 mb-2">
                    💡 Learning Tips
                  </h5>
                  <ul className="list-disc list-inside text-purple-700 space-y-1">
                    <li>
                      Start with simple traces (like 1,2,3,4,1,2,3,4) to see
                      clear patterns
                    </li>
                    <li>
                      Try the "worst case" traces to see when algorithms
                      struggle
                    </li>
                    <li>
                      Experiment with different cache sizes to see the impact
                    </li>
                    <li>Use step-by-step mode to understand each decision</li>
                    <li>Compare multiple algorithms side-by-side</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                🎯 Your First Experiment
              </h4>
              <p className="text-gray-600 mb-3">
                Ready to try? Here's a simple experiment to get you started:
              </p>
              <ol className="list-decimal list-inside text-gray-600 space-y-1">
                <li>Use the "Sequential" preset trace</li>
                <li>Select all three algorithms (FIFO, LRU, LFU)</li>
                <li>Set cache size to 4</li>
                <li>Click "Initialize Caches" then "Start Simulation"</li>
                <li>
                  Watch how each algorithm handles the same data differently!
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Explore Cache Algorithms?
            </h3>
            <p className="text-lg mb-6">
              Click on the "Simulator" tab to start experimenting with different
              cache replacement policies!
            </p>
            <div className="text-sm opacity-90">
              💡 <strong>Pro Tip:</strong> Try different memory traces to see
              how algorithms perform under various access patterns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
