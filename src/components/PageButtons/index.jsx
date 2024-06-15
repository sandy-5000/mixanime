import { PropTypes } from "prop-types"
import Button from "/src/components/Button"
import { GrFormPrevious, GrFormNext } from "react-icons/gr"


const PageButtons = ({ page, prevPage, nextPage }) => {
  return (
    <div className="flex justify-center">
      <Button
        style={{
          height: 30,
          color: '#cbd5e1',
          backgroundColor: '#11182788',
        }}
        hoverStyle={{
          color: '#111827',
          backgroundColor: '#e5e7ebee',
        }}
        onClick={() => prevPage()}
      >
        <div className="flex justify-center">
          <div className="a-center">
            <GrFormPrevious className="text-[17px]" />
          </div>
          <div className="a-center">
            <span className="ml-1 text-xs inline-flex">prev</span>
          </div>
        </div>
      </Button>
      <div className="w-16 a-center px-1">
        <div className="w-8 a-center h-full rounded-md"
          style={{
            backgroundColor: '#f3f4f6ff'
          }}
        >
          <p
            className="text-gray-900 text-gap-2"
            style={{
              fontSize: 14
            }}
          >{page}</p>
        </div>
      </div>
      <Button
        style={{
          height: 30,
          color: '#cbd5e1',
          backgroundColor: '#11182788',
        }}
        hoverStyle={{
          color: '#111827',
          backgroundColor: '#e5e7ebee',
        }}
        onClick={() => nextPage()}
      >
        <div className="flex justify-center">
          <div className="a-center">
            <span className="mr-1 text-xs inline-flex">Next</span>
          </div>
          <div className="a-center">
            <GrFormNext className="text-[17px]" />
          </div>
        </div>
      </Button>
    </div>
  )
}

PageButtons.propTypes = {
  page: PropTypes.number,
  prevPage: PropTypes.any,
  nextPage: PropTypes.any,
}

export default PageButtons
