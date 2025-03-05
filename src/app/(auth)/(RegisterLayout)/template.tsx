'use client'
import {motion} from 'framer-motion'

const AdesaoTemplate = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            {children}
        </div>
    </motion.div>
  )
}

export default AdesaoTemplate;
