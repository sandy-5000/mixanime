import { useState } from "react"
import MainLayout from "/src/layouts/MainLayout"
import Anilist from "/src/services/anilist"


const Schedule = () => {

  const [scheduleData, setScheduleData] = useState(new Array(7).fill(null))

  return (
    <MainLayout>
      <div className="h-screen a-center">
        <h3 className="text-slate-200">Schedule Page!</h3>
      </div>
    </MainLayout>
  )
}

export default Schedule
