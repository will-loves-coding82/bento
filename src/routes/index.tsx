import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <section className="polka font-[chelsea] flex flex-col justify-center h-screen w-screen ">
      <header className="w-full h-full justify-center items-center flex flex-col gap-4">
        <h1 className="text-7xl text-chelsea text-black">bento</h1>
        <p className="text-gray-400">The task app for families</p>
      </header>
      {/* <ReactFlow 
        nodes={initialNodes}
        nodeTypes={nodeTypes}
        panOnDrag={false} 
        zoomOnScroll={false} 
        zoomOnPinch={false}
        minZoom={25}
      >
        <Background size={2}/>
      </ReactFlow> */}


    </section>
  )
}
