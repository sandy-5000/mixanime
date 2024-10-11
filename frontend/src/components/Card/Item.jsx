import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import { ROUTES } from '/src/services/untils'

const Item = ({ data }) => {
  const id = data.id
  const background = data.coverImage
  const title = data.title

  return (
    <motion.div
      className="p-1 aspect-[2/3]"
      whileHover={{
        scale: 1.02,
        transition: {
          delay: 0,
          duration: 0.1,
        },
      }}
      whileTap={{
        scale: 0.97,
        transition: {
          delay: 0,
          duration: 0.1,
        },
      }}
    >
      <Link
        to={{
          pathname: ROUTES.DETAILS,
          search: getQueryParams({ id }),
        }}
      >
        <div
          className="glass glass-hard w-full"
          style={{
            padding: 5,
            paddingBottom: 3,
          }}
        >
          <div className="w-[120px] aspect-[2/3] p-[1px] md:p-1">
            <div
              className="background w-full h-full relative p-2 rounded-lg"
              style={{
                backgroundImage: `url(${background})`,
              }}
            ></div>
          </div>
          <div className="w-[120px] p-[1px] md:p-1">
            <p
              className="truncate text-gap-2 text-gray-200"
              style={{
                fontSize: 10,
              }}
            >
              {title}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

Item.propTypes = {
  data: PropTypes.any,
}

const MemoItem = memo(Item)

export default MemoItem
