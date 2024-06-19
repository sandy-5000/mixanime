import { PropTypes } from "prop-types"
import PageButtons from "/src/components/PageButtons"
import { HiColorSwatch } from "react-icons/hi"
import Card from "/src/components/Card/Season"
import { RiFilter2Fill } from "react-icons/ri"


const Container = ({ page, setPage, list, setShow }) => {
  return (
    <div className="px-4 xl:container mx-auto">
      <div className="h-8"></div>
      <div className="md:flex justify-between px-4 mb-4">
        <div className="flex">
          <div className="a-center">
            <HiColorSwatch className="text-sgreen text-[22px] mr-2" />
          </div>
          <div className="a-center font-semibold">
            <h1 className="text-slate-200 text-sm side-heading">Search <span className="text-sgreen">Results</span></h1>
          </div>
          <div className="a-center">
            <RiFilter2Fill className="text-sgreen text-[22px] ml-2" onClick={() => setShow(true)} />
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <PageButtons
            page={page}
            prevPage={() => setPage(page - 1)}
            nextPage={() => setPage(page + 1)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {
          list.map((data, index) => {
            return <Card
              index={index}
              key={'rcard-' + index}
              data={data}
            />
          })
        }
      </div>
      <div className="mt-8">
        <PageButtons
          page={page}
          prevPage={() => setPage(page - 1)}
          nextPage={() => setPage(page + 1)}
        />
      </div>
      <div className="h-[150px]"></div>
    </div>
  )
}

Container.propTypes = {
  page: PropTypes.any,
  setPage: PropTypes.any,
  list: PropTypes.any,
  setShow: PropTypes.any,
}

export default Container
