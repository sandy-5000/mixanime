import { useState } from "react"
import Filter from "./Filter"
import MainLayout from "/src/layouts/MainLayout"

const Explore = () => {
  const [filter, setFilter] = useState(false)

  return (
    <MainLayout>
      {
        filter && <div className="z-[5] w-[90vw] mx-[5vw] flex justify-end"
          style={{
            position: 'fixed'
          }}
        >
          <Filter close={() => setFilter(false)} />
        </div>
      }
      <div className="h-screen a-center"
        style={{
          filter: filter ? 'blur(10px)' : 'blur(0)',
        }}
      >
        <h3 className="text-slate-200" onClick={() => setFilter(true)}>Explore Page!</h3>
      </div>
    </MainLayout>
  )
}

export default Explore
