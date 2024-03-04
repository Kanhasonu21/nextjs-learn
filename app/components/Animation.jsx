"use client"
import { motion } from 'framer-motion'

const Animation = ({data=""}) =>{
    const text= data.split(" ")
  return (
    <div className="home-page">
        {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.10,
            delay: i / 5,
            repeat:Infinity,
            repeatDelay:3,
            repeatType: 'reverse'
          }}
          key={i}
        >
          {el} &nbsp;
        </motion.span>
      ))}
    </div>
  )
}

export default Animation